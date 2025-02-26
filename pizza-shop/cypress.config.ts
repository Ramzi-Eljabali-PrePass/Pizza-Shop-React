import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.js',  // This is where your spec files are located
    baseUrl: 'http://localhost:5174/',  // Adjust based on where your React app is running
  },
});