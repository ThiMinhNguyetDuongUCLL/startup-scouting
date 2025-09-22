# Startup Scout Frontend

A React TypeScript frontend application for startup scouting and innovation management.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **React Hook Form** for form management
- **Zod** for validation
- **Zustand** for state management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── store/         # Zustand store
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── services/      # API services
```

## Contributing

1. Create a feature branch: `git checkout -b feat/your-feature-name`
2. Make your changes
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feat/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.