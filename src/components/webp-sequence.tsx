'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { DrinkVariant } from '@/app/data';
import { cn } from '@/lib/utils';

interface WebpSequenceProps {
  variant: DrinkVariant;
  onInitialLoadComplete: () => void;
  onInitialLoadProgress: (progress: number) => void;
  onSwitchComplete: () => void;
  isSwitching: boolean;
  onAnimationComplete: (isComplete: boolean) => void;
}

const INITIAL_PRELOAD_COUNT = 30; // Number of frames to load initially
const SCROLL_SENSITIVITY = 1000; // Determines how much scroll animates, adjust for feel
const DAMPING = 0.9; // Smooths out the animation

export default function WebpSequence({
  variant,
  onInitialLoadComplete,
  onInitialLoadProgress,
  onSwitchComplete,
  isSwitching,
  onAnimationComplete,
}: WebpSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedImagesCount = useRef(0);
  const isInitialLoad = useRef(true);
  const isInitialBatchLoaded = useRef(false);

  const virtualScroll = useRef(0);
  const frameIndex = useRef(0);
  const animationFrameId = useRef<number>();

  const [isMounted, setIsMounted] = useState(false);

  // === IMAGE PRELOADING LOGIC ===
  const getFrameUrl = useCallback((frame: number) => {
    const paddedFrame = String(frame).padStart(3, '0');
    return variant.webpBaseUrl.replace('000', paddedFrame);
  }, [variant.webpBaseUrl]);

  const preloadImages = useCallback(async () => {
    const { frameCount } = variant;
    const promises: Promise<void>[] = [];
    loadedImagesCount.current = 0;
    imagesRef.current = Array(frameCount).fill(null).map(() => new Image());

    const onImageLoad = (isInitial: boolean) => {
      loadedImagesCount.current++;
      const total = isInitial ? INITIAL_PRELOAD_COUNT : frameCount;
      const progress = (loadedImagesCount.current / total) * 100;
      
      if (isInitialLoad.current) {
        onInitialLoadProgress(progress);
      }
    };
    
    // Initial batch for fast interaction
    for (let i = 0; i < INITIAL_PRELOAD_COUNT; i++) {
      const img = imagesRef.current[i];
      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          onImageLoad(true);
          resolve();
        };
        img.onerror = () => resolve(); // Don't block on error
      });
      img.src = getFrameUrl(i);
      promises.push(promise);
    }
    
    await Promise.all(promises);

    isInitialBatchLoaded.current = true;
    if (isInitialLoad.current) {
      onInitialLoadComplete();
      isInitialLoad.current = false;
    } else {
      onSwitchComplete();
    }
    drawFrame();

    // Lazy load the rest
    for (let i = INITIAL_PRELOAD_COUNT; i < frameCount; i++) {
        const img = imagesRef.current[i];
        img.onload = () => onImageLoad(false);
        img.src = getFrameUrl(i);
    }
  }, [variant, onInitialLoadComplete, onInitialLoadProgress, onSwitchComplete, getFrameUrl]);

  // === DRAWING LOGIC ===
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isMounted) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Find the closest loaded frame if the target isn't ready
    let frameToDraw = Math.round(frameIndex.current);
    while(!imagesRef.current[frameToDraw]?.complete && frameToDraw > 0) {
      frameToDraw--;
    }
    
    const img = imagesRef.current[frameToDraw];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  }, [isMounted]);

  // === ANIMATION LOOP ===
  const animate = useCallback(() => {
    const progress = virtualScroll.current;
    const newFrame = progress * (variant.frameCount - 1);
    
    // Apply damping
    const diff = newFrame - frameIndex.current;
    if (Math.abs(diff) > 0.01) {
      frameIndex.current += diff * (1 - DAMPING);
      drawFrame();
      animationFrameId.current = requestAnimationFrame(animate);
    } else if (frameIndex.current !== newFrame) {
      frameIndex.current = newFrame;
      drawFrame();
    }
  }, [variant.frameCount, drawFrame]);


  // === EVENT LISTENERS & LIFECYCLE ===
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Reset state for new variant
      isInitialBatchLoaded.current = false;
      virtualScroll.current = 0;
      frameIndex.current = 0;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      
      preloadImages();
    }
  }, [isMounted, preloadImages]);

  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted, drawFrame]);

  useEffect(() => {
    if (!isMounted || !isInitialBatchLoaded.current) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const newVirtualScroll = virtualScroll.current + e.deltaY / SCROLL_SENSITIVITY;
      virtualScroll.current = Math.max(0, Math.min(1, newVirtualScroll));

      // Start animation loop
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = requestAnimationFrame(animate);

      // Report animation completion
      const isComplete = virtualScroll.current >= 1;
      onAnimationComplete(isComplete);
    };

    const el = canvasRef.current?.parentElement;
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        el.removeEventListener('wheel', handleWheel);
        if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      };
    }
  }, [isMounted, isSwitching, onAnimationComplete, animate]);


  return (
    <div className={cn(
      "fixed top-0 left-0 h-screen w-full z-0 transition-opacity duration-500",
      isSwitching ? 'opacity-30' : 'opacity-100'
    )}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
}
