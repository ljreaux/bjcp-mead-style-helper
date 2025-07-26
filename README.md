# Mead Style Selector

A modern, responsive UI built with React, Tailwind CSS, and ShadCN to help categorize meads based on selected ingredients, sweetness, strength, carbonation, and more. This tool is designed to help homebrewers and meadmakers determine the most accurate BJCP-style category for their creations.

## Features

- Fuzzy Ingredient Search with checkbox selection and custom ingredient support
- Style Attribute Selection (Sweetness, Strength, Carbonation)
- ShadCN UI integration with skeleton loaders for a seamless UX
- Smart Warnings when ingredient combinations may not align with selected style
- Dark mode support
- Easily extendable to support new style guidelines or custom categories

## Tech Stack

- React (with hooks and context)
- TypeScript
- Tailwind CSS (with `@theme` and `@layer` utilities)
- ShadCN UI
- Radix UI components
- Fuse.js for fuzzy search
- Vite
- Bun

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
