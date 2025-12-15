'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { DrinkVariant } from '@/app/data';
import { cn } from '@/lib/utils';

interface WebpSequenceProps {
  variant: DrinkVariant;
  progress: number;
  onInitialLoadComplete: () => void;
  onInitialLoadProgress: (progress: number) => void;
  onSwitchComplete: () => void;
  isSwitching: boolean;
}

const INITIAL_PRELOAD_COUNT = 30; // Number of frames to load initially for fast startup

export default function WebpSequence({
  variant,
  progress,
  onInitialLoadComplete,
  onInitialLoadProgress,
  onSwitchComplete,
  isSwitching,
}: WebpSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedImagesCount = useRef(0);
  const isInitialLoad = useRef(true);
  const [isMounted, setIsMounted] = useState(false);

  // === IMAGE PRELOADING LOGIC ===
  const getFrameUrl = useCallback((frame: number) => {
    const paddedFrame = String(frame).padStart(3, '0');
    return variant.webpBaseUrl.replace('000', paddedFrame);
  }, [variant.webpBaseUrl]);

  const preloadImages = useCallback(async () => {
    const { frameCount } = variant;
    loadedImagesCount.current = 0;
    imagesRef.current = Array(frameCount).fill(null).map(() => new Image());

    const onImageLoad = (isInitialBatch: boolean) => {
      loadedImagesCount.current++;
      const total = isInitialBatch ? INITIAL_PRELOAD_COUNT : frameCount;
      const loadProgress = (loadedImagesCount.current / total) * 100;
      
      if (isInitialLoad.current && isInitialBatch) {
        onInitialLoadProgress(loadProgress);
      }
    };
    
    // Initial batch for fast interaction
    const initialPromises: Promise<void>[] = [];
    for (let i = 0; i < INITIAL_PRELOAD_COUNT && i < frameCount; i++) {
      const img = imagesRef.current[i];
      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          onImageLoad(true);
          resolve();
        };
        img.onerror = () => resolve(); // Don't block on error
      });
      img.src = getFrameUrl(i);
      initialPromises.push(promise);
    }
    
    await Promise.all(initialPromises);

    if (isInitialLoad.current) {
      onInitialLoadComplete();
      isInitialLoad.current = false;
    } else {
      onSwitchComplete();
    }

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
    
    const frameIndex = Math.max(0, Math.min(variant.frameCount - 1, Math.floor(progress * variant.frameCount)));

    let frameToDraw = frameIndex;
    // Fallback to the last loaded frame if the target isn't ready
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
  }, [isMounted, progress, variant.frameCount]);


  // === LIFECYCLE & EVENT LISTENERS ===
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
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
    if (isMounted) {
      requestAnimationFrame(drawFrame);
    }
  }, [isMounted, progress, drawFrame]);


  return (
    <div className={cn(
      "absolute top-0 left-0 h-full w-full z-0 transition-opacity duration-500",
      isSwitching ? 'opacity-30' : 'opacity-100'
    )}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
}
