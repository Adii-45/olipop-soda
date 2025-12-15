import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";

export default function IngredientsSection() {
    const bgImage = PlaceHolderImages.find(p => p.id === 'ingredients-bg');

    const benefits = [
        "9g of Prebiotic Fiber",
        "Only 2-5g of Sugar",
        "Non-GMO & Gluten-Free",
        "No Artificial Sweeteners",
        "Supports Digestive Health",
        "Made with Real Fruit Juice"
    ];

    return (
        <section id="ingredients" className="relative py-20 md:py-32 overflow-hidden">
            {bgImage && (
                <Image
                    src={bgImage.imageUrl}
                    alt={bgImage.description}
                    fill
                    className="object-cover opacity-10"
                    data-ai-hint={bgImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background"></div>
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Good for Your Gut</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                    We've ditched the bad stuff and packed our sodas with ingredients that work for you, not against you.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-[hsl(var(--brand-accent))]" />
                            <span className="font-medium">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
