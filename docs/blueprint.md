# **App Name**: Olipop Parallax

## Core Features:

- Drink Variant Configuration: Allow users to input drink name, subtitle, description, theme color, WebP sequence URLs, and other metadata for each drink variant, thus updating drink variant contents.
- Parallax Hero Animation: Implement a full-screen hero section with a WebP image sequence controlled by scroll position. Advance frames on scroll down, reverse on scroll up for a cinematic experience.
- Dynamic Text Overlay: Overlay text elements (drink name, subtitle, description) on the animated background. Update the text dynamically based on the selected drink variant, thus update with fade animation.
- Variant Navigation: Implement a vertical navigation strip with "PREV"/"NEXT" buttons to switch between drink variants. Update text, theme color, and WebP sequence upon variant switch.
- Loading Experience: Display a full-screen loading overlay with a loading bar and percentage indicator while preloading the initial WebP sequence. Show a small loading indicator when switching variants.
- Scroll-Based Sequence: Tool: Use Javascript or another appropriate tool to create and customize logic to Map scroll position to the frame index of the WebP sequence so it scrolls smoothly and appropriately, also provide guidance on where a user may manually change the code to set their website scroll settings

## Style Guidelines:

- Primary color: Olipop White (#FFFFFF) provides a clean base that doesn't distract.
- Background color: Olipop Black (#000000) for a cinematic and sophisticated look.
- Accent color: Olipop Gray (#808080) will offset Olipop Black without being distracting
- Body and headline font: 'Inter', a grotesque-style sans-serif that's suitable for headlines or body text.
- Sticky top navigation with brand logo on the left and smooth-scrolling links to sections on the right. Include a dark/light mode toggle in the navbar.
- Use minimal, monochrome social icons in the hero and footer. Icons should be consistent with the brand’s aesthetic.
- Implement subtle fade-in/fade-out animations when updating text and other elements on variant switch. Parallax scroll behavior should be smooth and responsive.