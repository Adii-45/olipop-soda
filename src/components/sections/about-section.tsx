import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '../ui/card';

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-drink');

  return (
    <section id="product" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">A New Kind of Soda</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Olipop is a modern, functional soda brand inspired by the classic flavors you love, but made with better ingredients. We're a delicious, refreshing alternative to traditional sugary sodas.
            </p>
            <p className="text-muted-foreground">
              Each can is packed with prebiotics, plant fiber, and botanicals to support your digestive health and microbiome. With only 2-5 grams of sugar and 9 grams of fiber, you can indulge guilt-free.
            </p>
          </div>
          <div>
            <Card className="overflow-hidden border-2 border-[hsl(var(--brand-accent))] shadow-[0_0_20px_hsl(var(--brand-accent)/0.5)]">
              <CardContent className="p-0">
                {aboutImage && (
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    data-ai-hint={aboutImage.imageHint}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
