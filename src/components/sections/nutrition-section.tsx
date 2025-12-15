import { Separator } from "../ui/separator";
import { Card } from "../ui/card";

export default function NutritionSection() {
    const ThickSeparator = () => <Separator className="h-2 bg-foreground my-1" />;
    const MediumSeparator = () => <Separator className="h-1 bg-foreground my-1" />;

    return (
        <section id="nutrition" className="py-20 md:py-32 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">The Delicious Details</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Here's a look at what's inside a typical can of Olipop.
                    </p>
                </div>

                <Card className="max-w-md mx-auto bg-primary text-background p-4 rounded-lg shadow-lg">
                    <div className="p-4 border-2 border-background rounded">
                        <h3 className="text-4xl font-black tracking-tight">Nutrition Facts</h3>
                        <p className="font-medium">1 serving per container</p>
                        <p className="font-bold flex justify-between">
                            <span>Serving size</span>
                            <span>1 can (12 fl oz)</span>
                        </p>
                        <ThickSeparator />
                        <p className="font-bold">Amount per serving</p>
                        <p className="text-5xl font-black flex justify-between items-center">
                            <span>Calories</span>
                            <span>35</span>
                        </p>
                        <MediumSeparator />
                        <p className="text-right font-bold">% Daily Value*</p>
                        <Separator />
                        <p className="flex justify-between"><b>Total Fat</b> 0g <span><b>0</b>%</span></p>
                        <Separator />
                        <p className="flex justify-between"><b>Sodium</b> 35mg <span><b>2</b>%</span></p>
                        <Separator />
                        <p className="flex justify-between"><b>Total Carbohydrate</b> 16g <span><b>6</b>%</span></p>
                        <div className="pl-4">
                            <Separator />
                            <p>Dietary Fiber 9g</p>
                            <Separator />
                            <p>Total Sugars 4g</p>
                            <div className="pl-4">
                                <Separator />
                                <p>Includes 0g Added Sugars</p>
                            </div>
                        </div>
                        <Separator />
                        <p><b>Protein</b> 0g</p>
                        <ThickSeparator />
                        <p className="text-xs">*The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
                    </div>
                </Card>
            </div>
        </section>
    );
}
