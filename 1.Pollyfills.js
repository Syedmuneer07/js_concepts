
//A polyfill is code that implements a modern feature on older browsers that don't natively support it. 
// It 'fills the gap' between what the browser supports and what your code needs.

// Polyfill for Array.prototype.includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchVal) {
    return this.indexOf(searchVal) !== -1;
  };
}
console.log([1, 2, 3].includes(2)); // true

// Polyfill for Object.assign
if (!Object.assign) {
  Object.assign = function(target, ...sources) {
    sources.forEach(src => {
      Object.keys(src).forEach(key => {
        target[key] = src[key];
      });
    });
    return target;
  };
}

// Polyfill for forEach 
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// Polyfill for map
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
    return result;
  };
}

// Polyfill for filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
}

// Polyfill for reduce
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
  };
}



// Modern apps use Babel + core-js to auto-add polyfills
// babel.config.js:
// presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]]