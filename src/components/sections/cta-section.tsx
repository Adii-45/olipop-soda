import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const ctaImage = PlaceHolderImages.find(p => p.id === 'cta-grape-can');

  return (
    <section id="contact" className="py-20 md:py-32 border-t-2 border-[hsl(var(--brand-accent))]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Try a New Kind of Soda?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the soda revolution and treat your gut to something good. Find your favorite flavor today.
            </p>
            <Button size="lg" className="rounded-full bg-[hsl(var(--brand-accent))] text-black hover:bg-[hsl(var(--brand-accent))]/80 px-8 py-6 text-lg">
              Shop All Flavors
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="flex justify-center">
            {ctaImage && (
              <Image
                src={ctaImage.imageUrl}
                alt={ctaImage.description}
                width={500}
                height={500}
                className="rounded-full shadow-2xl shadow-[hsl(var(--brand-accent))/0.3]"
                data-ai-hint={ctaImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
