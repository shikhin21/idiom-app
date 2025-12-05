import { store } from './store/index.js';
import { initializeUI } from './ui/render.js';
import type { Idiom } from './types/index.js';

/**
 * Main application entry point
 */

async function loadIdioms(): Promise<Idiom[]> {
  try {
    const response = await fetch('./data/idioms.json');
    if (!response.ok) {
      throw new Error(`Failed to load idioms: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading idioms:', error);
    return [];
  }
}

async function main(): Promise<void> {
  // Load idiom data
  const idioms = await loadIdioms();
  
  if (idioms.length === 0) {
    document.getElementById('app')!.innerHTML = `
      <div class="error">
        <h1>Failed to load idioms</h1>
        <p>Please refresh the page to try again.</p>
      </div>
    `;
    return;
  }

  // Initialize store with idiom data
  store.initialize(idioms);
  
  // Initialize UI
  initializeUI();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
