'use client';

import { Progress } from '@/components/ui/progress';
import { Icons } from '@/components/icons';

interface PreloaderProps {
  isLoading: boolean;
  progress: number;
}

export default function Preloader({ isLoading, progress }: PreloaderProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full max-w-sm text-center p-4">
        <Icons.Olipop className="h-24 w-24 mx-auto mb-8 text-primary" />
        <h1 className="text-2xl font-bold uppercase tracking-widest text-primary mb-4">Olipop</h1>
        <Progress value={progress} className="h-2 w-full mb-2 bg-secondary" indicatorClassName="bg-primary" />
        <p className="text-sm text-muted-foreground">{Math.round(progress)}% Loaded</p>
      </div>
    </div>
  );
}
