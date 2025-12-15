import type { IconName } from "@/components/icons";

export type DrinkVariant = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string; // HSL format string for CSS variable
  webpBaseUrl: string;
  frameCount: number;
};

export const drinkVariants: DrinkVariant[] = [
  {
    id: 1,
    name: 'Cherry',
    subtitle: 'Soda',
    description: 'A modern take on a classic soda with a perfect blend of sweet and tart, full of nostalgic flavor.',
    themeColor: '0 84% 60%',
    webpBaseUrl: 'https://rkajpvjfkkinfiysubsn.supabase.co/storage/v1/object/public/cherry/frame_000_delay-0.04s.webp',
    frameCount: 200,
  },
  {
    id: 2,
    name: 'Grape',
    subtitle: 'Soda',
    description: 'A modern functional soda brand inspired by classic flavors but made with better ingredients.',
    themeColor: '270 70% 60%',
    webpBaseUrl: 'https://rkajpvjfkkinfiysubsn.supabase.co/storage/v1/object/public/grapes/frame_000_delay-0.04s.webp',
    frameCount: 200,
  },
  {
    id: 3,
    name: 'Lemon',
    subtitle: 'Ginger Soda',
    description: 'Bright and refreshing citrus soda with natural lemon spark and crisp bubbles.',
    themeColor: '50 90% 60%',
    webpBaseUrl: 'https://rkajpvjfkkinfiysubsn.supabase.co/storage/v1/object/public/lemon/frame_000_delay-0.04s.webp',
    frameCount: 200,
  },
];

export const socialLinks: { name: string; icon: IconName; url: string }[] = [
  { name: 'Twitter', icon: 'Twitter', url: '#' },
  { name: 'Instagram', icon: 'Instagram', url: '#' },
  { name: 'Facebook', icon: 'Facebook', url: '#' },
];

export const navLinks = [
  { name: 'Product', href: '#product' },
  { name: 'Ingredients', href: '#ingredients' },
  { name: 'Nutrition', href: '#nutrition' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export const faqItems = [
  {
    id: "faq1",
    question: 'Is there sugar in Olipop?',
    answer: 'Yes, Olipop contains 2-5g of sugar per can. We use natural ingredients like cassava root syrup and real fruit juice to sweeten our sodas.'
  },
  {
    id: "faq2",
    question: 'What are the benefits of Olipop?',
    answer: 'Olipop is a functional soda that provides digestive health benefits. Each can contains 9g of prebiotic fiber to support a healthy gut microbiome.'
  },
  {
    id: "faq3",
    question: 'Is Olipop gluten-free?',
    answer: 'Yes, all Olipop flavors are gluten-free, vegan, and made with non-GMO ingredients.'
  },
  {
    id: "faq4",
    question: 'Where can I buy Olipop?',
    answer: 'Olipop is available at major retailers nationwide including Whole Foods, Target, and Kroger. You can also order directly from our website.'
  }
];

export const reviews = [
  {
    name: 'Sarah K.',
    rating: 5,
    text: 'I\'m obsessed with the Vintage Cola flavor! It tastes like the real deal without all the sugar and junk. My gut has never been happier.',
    image: 'review-avatar-1'
  },
  {
    name: 'Mike D.',
    rating: 5,
    text: 'The Strawberry Vanilla is my go-to. It\'s the perfect afternoon treat that actually makes me feel good. Highly recommend!',
    image: 'review-avatar-2'
  },
  {
    name: 'Jessica P.',
    rating: 4,
    text: 'I love having a healthier soda option. The flavors are great, though some are a bit sweet for me. The Classic Grape is a winner!',
    image: 'review-avatar-3'
  },
  {
    name: 'David R.',
    rating: 5,
    text: 'Finally, a soda I can drink guilt-free. Olipop has been a game-changer for my diet. All the flavors are delicious.',
    image: 'review-avatar-4'
  }
];
