'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { DrinkVariant } from '@/app/data';

interface WebpSequenceProps {
  variant: DrinkVariant;
  onInitialLoadComplete: () => void;
  onInitialLoadProgress: (progress: number) => void;
  onSwitchComplete: () => void;
  isSwitching: boolean;
  onAnimationComplete: (isComplete: boolean) => void;
}

const SCROLL_SENSITIVITY = 0.5; // Adjust to control animation speed

export default function WebpSequence({
  variant,
  onInitialLoadComplete,
  onInitialLoadProgress,
  onSwitchComplete,
  onAnimationComplete,
}: WebpSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const isInitialLoad = useRef(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // When component mounts or variant changes, animation is not complete
    onAnimationComplete(false); 
    frameIndexRef.current = 0;
  }, [variant.id, onAnimationComplete]);

  const getFrameUrl = useCallback((frame: number) => {
    const paddedFrame = String(frame).padStart(3, '0');
    return variant.webpBaseUrl.replace('000', paddedFrame);
  }, [variant.webpBaseUrl]);

  const preloadImages = useCallback(async () => {
    const { frameCount } = variant;
    const promises: Promise<void>[] = [];
    let loadedCount = 0;

    imagesRef.current = Array(frameCount).fill(null).map(() => new Image());

    for (let i = 0; i < frameCount; i++) {
      const img = imagesRef.current[i];
      const promise = new Promise<void>((resolve, reject) => {
        img.onload = () => {
          loadedCount++;
          if (isInitialLoad.current) {
            onInitialLoadProgress((loadedCount / frameCount) * 100);
          }
          resolve();
        };
        img.onerror = reject;
      });
      img.src = getFrameUrl(i);
      promises.push(promise);
    }

    await Promise.all(promises);

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      onInitialLoadComplete();
    } else {
      onSwitchComplete();
    }
  }, [variant, onInitialLoadComplete, onInitialLoadProgress, onSwitchComplete, getFrameUrl]);

  useEffect(() => {
    if (mounted) {
      preloadImages();
    }
  }, [preloadImages, mounted]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const img = imagesRef.current[frameIndexRef.current];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      requestAnimationFrame(drawFrame);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    const firstImg = imagesRef.current[0];
    if (firstImg && firstImg.complete) {
      handleResize();
    } else if (firstImg) {
      firstImg.onload = handleResize;
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame, mounted]);
  
  useEffect(() => {
    if (!mounted) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      let newFrameIndex = frameIndexRef.current;
      if (e.deltaY > 0) { // Scrolling down
        newFrameIndex = Math.min(frameIndexRef.current + SCROLL_SENSITIVITY, variant.frameCount - 1);
      } else { // Scrolling up
        newFrameIndex = Math.max(frameIndexRef.current - SCROLL_SENSITIVITY, 0);
      }

      newFrameIndex = Math.round(newFrameIndex);

      if (newFrameIndex !== frameIndexRef.current) {
        frameIndexRef.current = newFrameIndex;
        requestAnimationFrame(drawFrame);
      }

      // Check for animation completion
      if (newFrameIndex >= variant.frameCount - 1) {
        onAnimationComplete(true);
      } else {
        onAnimationComplete(false);
      }
    };
    
    const mainElement = document.querySelector('main');
    mainElement?.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      mainElement?.removeEventListener('wheel', handleWheel);
    };
  }, [variant.frameCount, drawFrame, mounted, onAnimationComplete]);

  if (!mounted) {
    return <div className="absolute top-0 left-0 w-full h-full object-cover" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  );
}
