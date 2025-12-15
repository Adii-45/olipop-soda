'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { DrinkVariant } from '@/app/data';

interface WebpSequenceProps {
  variant: DrinkVariant;
  onInitialLoadComplete: () => void;
  onInitialLoadProgress: (progress: number) => void;
  onSwitchComplete: () => void;
  isSwitching: boolean;
}

const SCROLL_ANIMATION_SPEED = 1; // Adjust this to control animation speed relative to scroll.

export default function WebpSequence({
  variant,
  onInitialLoadComplete,
  onInitialLoadProgress,
  onSwitchComplete,
}: WebpSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const isInitialLoad = useRef(true);

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
    preloadImages();
  }, [preloadImages]);

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
  
  // Effect for drawing and resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        requestAnimationFrame(drawFrame);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial draw
    const firstImg = imagesRef.current[0];
    if (firstImg && firstImg.complete) {
        handleResize();
    } else if (firstImg) {
        firstImg.onload = () => {
          handleResize();
        };
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);
  

  // Effect for scroll handling
  useEffect(() => {
    const handleScroll = () => {
      // This is the logic inspired by the getScrollBasedFrameIndex Genkit flow.
      // You can adjust the scroll behavior by modifying the calculation below.
      // For instance, changing SCROLL_ANIMATION_SPEED can speed up or slow down the animation relative to scroll distance.
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const scrollFraction = (window.scrollY / scrollableHeight) * SCROLL_ANIMATION_SPEED;
      
      const newFrameIndex = Math.min(
        variant.frameCount - 1,
        Math.max(0, Math.floor(scrollFraction * variant.frameCount))
      );

      if (newFrameIndex !== frameIndexRef.current) {
        frameIndexRef.current = newFrameIndex;
        requestAnimationFrame(drawFrame);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [variant.frameCount, drawFrame]);


  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  );
}
