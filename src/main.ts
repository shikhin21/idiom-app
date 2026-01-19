import { ChunkManager } from './store/chunkManager.js';
import { IdiomStore } from './store/index.js';
import { initializeUI } from './ui/render.js';

/**
 * Main application entry point
 */

// Create chunk manager and store instances
const chunkManager = new ChunkManager();
export const store = new IdiomStore(chunkManager);

async function main(): Promise<void> {
  const appElement = document.getElementById('app')!;

  try {
    // Show loading state
    appElement.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading idioms...</p>
      </div>
    `;

    // Initialize store (loads first chunk)
    await store.initialize();

    // Initialize UI
    initializeUI();
  } catch (error) {
    console.error('Error initializing app:', error);
    appElement.innerHTML = `
      <div class="error">
        <h1>Failed to load idioms</h1>
        <p>Please refresh the page to try again.</p>
        <p class="error-details">${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
  }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
