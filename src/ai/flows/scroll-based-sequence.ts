'use server';

/**
 * @fileOverview This file defines a Genkit flow to map scroll position to the frame index of a WebP sequence for parallax scrolling.
 *
 * - `getScrollBasedFrameIndex` - A function that calculates the frame index based on the scroll position.
 * - `ScrollBasedFrameIndexInput` - The input type for the `getScrollBasedFrameIndex` function.
 * - `ScrollBasedFrameIndexOutput` - The return type for the `getScrollBasedFrameIndex` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScrollBasedFrameIndexInputSchema = z.object({
  scrollPosition: z.number().describe('The current scroll position of the page.'),
  totalFrames: z.number().describe('The total number of frames in the WebP sequence.'),
  documentHeight: z.number().describe('The total height of the document.'),
});
export type ScrollBasedFrameIndexInput = z.infer<typeof ScrollBasedFrameIndexInputSchema>;

const ScrollBasedFrameIndexOutputSchema = z.object({
  frameIndex: z.number().describe('The calculated frame index for the current scroll position.'),
  scrollSettingsGuidance: z
    .string()
    .describe(
      'Guidance on how to manually adjust scroll settings to fine-tune the parallax effect.'
    ),
});
export type ScrollBasedFrameIndexOutput = z.infer<typeof ScrollBasedFrameIndexOutputSchema>;

export async function getScrollBasedFrameIndex(
  input: ScrollBasedFrameIndexInput
): Promise<ScrollBasedFrameIndexOutput> {
  return getScrollBasedFrameIndexFlow(input);
}

const scrollBasedFrameIndexPrompt = ai.definePrompt({
  name: 'scrollBasedFrameIndexPrompt',
  input: {schema: ScrollBasedFrameIndexInputSchema},
  output: {schema: ScrollBasedFrameIndexOutputSchema},
  prompt: `You are a helpful assistant that calculates the frame index for a WebP sequence based on the current scroll position.

Given the following information:
- Scroll Position: {{{scrollPosition}}}
- Total Frames: {{{totalFrames}}}
- Document Height: {{{documentHeight}}}

Calculate the frame index using the following formula:
frameIndex = (scrollPosition / (documentHeight - window.innerHeight)) * totalFrames

Ensure the frame index is an integer and within the range of 0 to totalFrames - 1.

Also provide guidance on how a developer can manually adjust scroll settings to fine-tune the parallax effect. Consider adjusting the documentHeight or scaling the scrollPosition.
`,
});

const getScrollBasedFrameIndexFlow = ai.defineFlow(
  {
    name: 'getScrollBasedFrameIndexFlow',
    inputSchema: ScrollBasedFrameIndexInputSchema,
    outputSchema: ScrollBasedFrameIndexOutputSchema,
  },
  async input => {
    const {output} = await scrollBasedFrameIndexPrompt(input);
    return output!;
  }
);
