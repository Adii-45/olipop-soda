import { reviews } from "@/app/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

export default function ReviewsSection() {
    return (
        <section id="reviews" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Don't Just Take Our Word</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        See what our fans are saying about their favorite functional soda.
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {reviews.map((review, index) => {
                            const avatarImage = PlaceHolderImages.find(p => p.id === review.image);
                            return (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card className="h-full bg-secondary/30">
                                            <CardContent className="flex flex-col justify-between h-full p-6">
                                                <div>
                                                    <div className="flex items-center mb-4">
                                                        <Avatar className="h-12 w-12 mr-4">
                                                            {avatarImage && (
                                                                <AvatarImage src={avatarImage.imageUrl} alt={review.name} data-ai-hint={avatarImage.imageHint} />
                                                            )}
                                                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-bold">{review.name}</p>
                                                            <div className="flex">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground italic">&quot;{review.text}&quot;</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    );
}
