import jsdom from 'jsdom';
const { JSDOM } = jsdom;

// From mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

function dom() {
  // Set up the window from simplest document possible.
  const { window } = new JSDOM('<!doctype html><html><body></body></html>');

  // Take all properties of the window object and also attach it to the Mocha global object.
  propagateToGlobal(window);
}

dom();
