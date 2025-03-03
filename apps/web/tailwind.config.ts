// tailwind config is required for editor support

import type { Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config'

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    // app content
    './app/**/*.{js,ts,jsx,tsx}',
    // include packages if not transpiling
    // '../../packages/ui/*.{js,ts,jsx,tsx}',
  ],
  presets: [sharedConfig],
}

export default config
