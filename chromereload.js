// chromeload.js – dynamically loads other scripts for a Chrome Extension

function loadScript(path, callback) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(path); // 'path' should be a string
  script.onload = () => {
    console.log(`Loaded script: ${path}`);
    if (callback) callback();
  };
  script.onerror = () => {
    console.error(`Failed to load script: ${path}`);
  };
  document.head.appendChild(script);
}

// Example usage:
loadScript('scripts/helper.js', () => {
  loadScript('scripts/ui.js', () => {
    console.log('All scripts loaded.');
  });
});
