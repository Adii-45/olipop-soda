'use client';

import { useState, useEffect } from 'react';
import type { DrinkVariant } from '@/app/data';
import WebpSequence from '@/components/webp-sequence';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { socialLinks } from '@/app/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  variant: DrinkVariant;
  variantIndex: number;
  onNext: () => void;
  onPrev: () => void;
  isSwitching: boolean;
  onSwitchComplete: () => void;
  onInitialLoadComplete: () => void;
  onInitialLoadProgress: (progress: number) => void;
}

export default function HeroSection({
  variant,
  variantIndex,
  onNext,
  onPrev,
  isSwitching,
  onSwitchComplete,
  onInitialLoadComplete,
  onInitialLoadProgress,
}: HeroSectionProps) {
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSwitching) {
      setIsTextVisible(false);
    } else {
      // Delay to allow fade-out then fade-in of new content
      timer = setTimeout(() => {
        setIsTextVisible(true);
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [isSwitching, variant.id]);

  return (
    <section id="hero" className="h-screen w-full sticky top-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <WebpSequence
        variant={variant}
        onInitialLoadComplete={onInitialLoadComplete}
        onInitialLoadProgress={onInitialLoadProgress}
        onSwitchComplete={onSwitchComplete}
        isSwitching={isSwitching}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-20 h-full">
        <div className="grid grid-cols-12 h-full items-center">
          
          <div className="col-span-12 md:col-span-5">
            <div
              className={cn(
                'transition-all duration-700 ease-in-out',
                isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              )}
            >
              <Icons.Olipop className="h-12 w-12 mb-4 text-primary" />
              <h1 className="text-7xl md:text-8xl font-black uppercase text-primary tracking-tighter">
                {variant.name}
              </h1>
              <p className="text-2xl font-light text-primary/80 mb-6">{variant.subtitle}</p>
              <p className="max-w-md text-primary/90 mb-8">{variant.description}</p>
              <div className="flex gap-4">
                <Button size="lg" variant="outline" className="rounded-full border-2 bg-transparent text-primary hover:bg-primary hover:text-background px-8">
                  ADD TO
                </Button>
                <Button size="lg" className="rounded-full bg-[hsl(var(--brand-accent))] text-black hover:bg-[hsl(var(--brand-accent))]/80 px-8">
                  CART
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-6">
            <div className="flex flex-col items-center gap-4 text-primary">
              <button onClick={onPrev} disabled={isSwitching} className="group p-2">
                <span className="text-xs uppercase tracking-widest hidden md:block">Prev</span>
                <ArrowUp className="w-6 h-6 mx-auto transition-transform group-hover:-translate-y-1" />
              </button>
              <div className="w-px h-16 bg-primary/50"></div>
              <button onClick={onNext} disabled={isSwitching} className="group p-2">
                <ArrowDown className="w-6 h-6 mx-auto transition-transform group-hover:translate-y-1" />
                <span className="text-xs uppercase tracking-widest hidden md:block">Next</span>
              </button>
            </div>
            <div className="relative">
              {isSwitching && <Loader2 className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 animate-spin text-primary" />}
              <span className="text-8xl md:text-[12rem] font-black text-primary/10 leading-none select-none" style={{fontVariantNumeric: 'tabular-nums'}}>
                {String(variantIndex + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
          {socialLinks.map(link => (
            <Link key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary transition-colors">
              <Icons[link.icon] className="w-6 h-6" />
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
