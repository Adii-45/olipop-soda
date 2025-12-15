# Olipop Parallax - Cinematic Scroll Website

This project is a cinematic, scroll-controlled, single-page product website for the functional soda brand Olipop. It demonstrates a smooth, Apple-style parallax visual experience where a WebP image sequence animation in the hero section is controlled directly by the user's scroll.

Users can switch between multiple drink variants (Cherry, Grape, Lemon), each with its own unique animation sequence, theme content, and UI state.

*Disclaimer: This project is a design and engineering demonstration inspired by modern product websites and is not affiliated with the real Olipop brand.*

## Key Features

- **Scroll-Controlled WebP Animation**: A full-screen hero section featuring a WebP image sequence that plays forward and backward based on scroll position.
- **Variant Navigation**: Switch between different drink flavors with "PREV"/"NEXT" buttons, updating the animation, text, and theme color dynamically.
- **Premium Dark UI**: A modern, dark-themed interface designed to create a cinematic and sophisticated feel.
- **Client-Only Animation**: The entire hero animation logic is rendered client-side (`'use client'`) to ensure a smooth, interactive experience without SSR limitations.
- **Optimized Frame Preloading**: Implements a lazy-loading strategy for the animation frames to ensure a fast initial page load and seamless playback.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React
- **Styling**: Tailwind CSS
- **Animation**: WebP Image Sequences
- **Asset Hosting**: Public CDN / Supabase Storage (for WebP sequences)

## Project Structure

Here are the key files and folders in the project:

```
src
├── app/
│   ├── page.tsx        # The main entry point and layout for the single-page site.
│   ├── data.ts         # Configuration data for drink variants (names, colors, animation URLs).
│   └── globals.css     # Global styles and Tailwind CSS configuration.
│
└── components/
    ├── sections/
    │   └── hero-section.tsx  # Manages the fixed hero container and scroll spacer logic.
    └── webp-sequence.tsx     # Handles preloading, drawing, and updating of the WebP frames on a canvas.
```

## Environment Variables

This project does not require any environment variables to run locally, as all assets are publicly hosted. The WebP sequence URLs are hardcoded in `src/app/data.ts`.

If you were to host your own assets, you would create a `.env.local` file and add a variable for your asset base URL.

Example `.env.local`:
```
NEXT_PUBLIC_ASSET_URL=https://your-cdn-or-bucket-url.com/
```

## How to Run Locally

To get the project running on your local machine, follow these steps.

**Prerequisites:**
- Node.js (v18.x or later recommended)
- `npm` or `yarn`

**Instructions:**
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## Important Notes

- **Client-Side Rendering**: The hero animation is a client-only feature. It uses `next/dynamic` with `{ ssr: false }` to ensure all browser-specific APIs (like `window` and `canvas`) are only accessed on the client.
- **Asset Hosting**: For best performance, the large WebP image sequences should be hosted on a fast CDN or a dedicated storage bucket (like Supabase Storage, AWS S3, or Google Cloud Storage).
- **Frame Count**: The `frameCount` property in `src/app/data.ts` for each drink variant **must** match the actual number of frames in the corresponding WebP sequence. An incorrect count will cause the animation to break or behave unexpectedly.
