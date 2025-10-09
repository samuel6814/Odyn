// in frontend/src/services/pyodideService.js
let pyodide = null;
let isLoading = false;
const loadingPromise = new Promise((resolve) => {
  // Store the resolve function to be called when Pyodide is loaded
  window.resolvePyodideLoading = resolve;
});

// Function to initialize Pyodide
async function initializePyodide() {
  if (pyodide) {
    return; // Already loaded
  }
  if (isLoading) {
    await loadingPromise; // If loading is in progress, wait for it to finish
    return;
  }
  
  isLoading = true;
  console.log('Loading Pyodide...');
  pyodide = await window.loadPyodide();
  console.log('Pyodide loaded successfully.');
  window.resolvePyodideLoading(); // Resolve the promise for other waiting calls
}

// A buffer to capture Python's print output
const outputBuffer = [];
pyodide?.setStdout({
  batched: (str) => {
    outputBuffer.push(str);
  },
});


// Function to run Python code
async function runPython(code) {
  await initializePyodide(); // Ensure Pyodide is loaded
  
  // Set up a custom stdout to capture print statements
  let consoleOutput = '';
  pyodide.setStdout({
    batched: (str) => {
      consoleOutput += str + '\n';
    }
  });

  try {
    await pyodide.loadPackagesFromImports(code);
    await pyodide.runPythonAsync(code);
    return { output: consoleOutput, error: null };
  } catch (error) {
    return { output: consoleOutput, error: error.message };
  } finally {
    // Reset stdout
    pyodide.setStdout({ batched: () => {} });
  }
}

export { initializePyodide, runPython };