# Artis Roma: Curated Art Experiences

Artis Roma is a comprehensive web application designed to offer exquisite curated art experiences and premium cultural tours throughout Rome, Italy. It serves as a platform for discovering the city's artistic treasures, providing detailed information about iconic locations such as the Vatican Museums, the Colosseum, and the Borghese Gallery, all with a focus on luxury accommodations and an elevated travel experience.

## Key Features

*   **Curated Art Experiences**: Specializes in offering unique, high-quality, and expertly guided art tours across Rome's most significant cultural sites.
*   **Interactive Location Mapping**: Integrates interactive maps (powered by Leaflet) to visually present tour locations, points of interest, and itinerary details.
*   **Premium Travel Focus**: Tailored for travelers seeking luxury accommodations and an unparalleled cultural journey in the Eternal City.
*   **SEO Optimized**: Built with comprehensive SEO metadata, structured data, and multilingual support (`hreflang`) to maximize discoverability and reach a global audience.
*   **Dual Client-Server Architecture**: Comprises a modern React frontend interacting seamlessly with a robust Node.js and Express.js backend.

## Tech Stack

The Artis Roma project leverages a modern web development stack for both its frontend and backend components:

*   **Frontend**:
    *   **React**: A declarative, component-based JavaScript library for building user interfaces.
    *   **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
    *   **Vite**: A fast and opinionated build tool for modern web projects.
    *   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
    *   **Leaflet & React-Leaflet**: Libraries for creating interactive, mobile-friendly maps.
*   **Backend**:
    *   **Node.js**: A JavaScript runtime for server-side execution.
    *   **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
    *   **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
*   **Development Tools**:
    *   **npm**: Package manager for JavaScript.
    *   **ESLint**: A pluggable linting utility for JavaScript and JSX.
    *   **Concurrentlly**: Utility to run multiple commands concurrently.

## Getting Started

To set up and run the Artis Roma project locally, follow these instructions:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/artis-romae.git
    cd artis-romae
    ```
    *(Note: Replace `your-username` with the actual GitHub username if available, or remove the placeholder if the repository is not public/known.)*

2.  **Install Dependencies**:
    Navigate to the project root directory and install all necessary npm packages for both the frontend and backend:

    ```bash
    npm install
    ```

3.  **Run in Development Mode**:
    This command will start both the Node.js Express backend server (typically on `http://localhost:5011` as configured in `vite.config.ts`) and the Vite development server for the React application.

    ```bash
    npm run dev:full
    ```
    Once started, the frontend application will typically be accessible in your web browser at `http://localhost:5173`.

4.  **Build for Production**:
    To compile and optimize the frontend application for production deployment, use the build command:

    ```bash
    npm run build
    ```
    This will generate static files in the `dist/` directory, which can then be served by any static file server or integrated with the backend for serving.