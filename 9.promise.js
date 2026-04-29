//promise is a JavaScript object for asynchronous operation.
//state: pending -> fulfilled or rejected
//A promise is a placeholder for a value that will be available in the future, 
// allowing you to write asynchronous code in a more synchronous fashion. 
// It represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// Promise is a constructor function that creates a promise object.
// Code Example
const myPromise = new Promise((resolve, reject) => {
  // Simulate an async operation
  setTimeout(() => {    
    resolve("Data loaded successfully!"); // Call resolve when the operation is successful
    // reject("Failed to load data."); // Call reject if there was an error
  }, 2000);
}); 
// To consume the promise, we use .then() for success and .catch() for errors
myPromise
  .then(result => {
    console.log(result); // "Data loaded successfully!"
  })
  .catch(error => {
    console.error(error); // "Failed to load data."
  });



// Interview Q&A
// Q: What is a promise in JavaScript and how does it work?
// A: A promise is an object representing the eventual completion or failure of an asynchronous operation. 
// It has three states: pending, fulfilled, or rejected. 
// You create a promise with new Promise((resolve, reject) => { ... }) 
// and call resolve(value) on success or reject(error) on failure. 
// To consume a promise, use .then() for success and .catch() for errors, 
// allowing you to write cleaner async code without deeply nested callbacks.

// Q: What are the differences between a promise and a callback in JavaScript?
// A: A callback is a function passed to another function to be called later, often leading to nested callbacks (callback hell). 
// A promise is an object that represents the eventual result of an asynchronous operation, allowing for cleaner chaining with .then() and better error handling with .catch(). 
// Promises avoid the pyramid of doom by flattening async code and providing a more structured way to handle success and failure.

// Q: How do you create a promise in JavaScript?
// A: You create a promise with new Promise((resolve, reject) => { ... })
// where you perform an asynchronous operation and call resolve(value)
//  if it succeeds or reject(error) if it fails.

// Q: How do you consume a promise in JavaScript?
// A: You use .then() for success and .catch() for errors, 
// allowing you to write cleaner async code without deeply nested callbacks.

// Q: What are the advantages of using promises over callbacks in JavaScript?
// A: Promises provide better readability and maintainability by avoiding deeply nested callbacks (callback hell). 
// They allow for chaining with .then() and centralized error handling with .catch(), 
// making it easier to manage complex asynchronous flows. 
// Promises also have built-in methods like Promise.all() and

// --------------------------------------------------------------------------------------------------------------

// JS provides 4 static Promise combinators for handling multiple promises: 
// Promise.all (fail-fast), Promise.allSettled (wait all), Promise.race (first to settle), Promise.any (first to fulfill).

const p1 = fetch('/api/users').then(r => r.json());
const p2 = fetch('/api/orders').then(r => r.json());
const p3 = Promise.reject(new Error('Server down'));

// 1. Promise.all — ALL must resolve, ANY reject = fail
Promise.all([p1, p2])
  .then(([users, orders]) => console.log(users, orders))
  .catch(err => console.error('One failed:', err));

// 2. Promise.allSettled — waits for ALL, never rejects
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach(r => {
      if (r.status === 'fulfilled') console.log(r.value);
      else console.error(r.reason);
    });
  });

// 3. Promise.race — first to SETTLE (resolve OR reject)
Promise.race([p1, p2])
  .then(first => console.log('Fastest:', first));

// 4. Promise.any — first to RESOLVE (ignores rejects)
// Throws AggregateError only if ALL reject
Promise.any([p1, p2, p3])
  .then(first => console.log('First success:', first));

// Interview Q&A
// Q: Difference between Promise.all and Promise.allSettled?
// A: Promise.all fails fast — the moment any promise rejects, the whole thing rejects. 
// Use it when ALL results are required (e.g., dashboard needs users AND orders). 
// Promise.allSettled waits for all to complete and gives you each result with status: 'fulfilled' or 'rejected'. 
// Use it when partial success is OK — like loading multiple widgets independently.
// ⚠ Watch out: Real-world: Use Promise.allSettled for loading multiple independent API calls in a dashboard. 
// Use Promise.all only when you need every piece of data.

//Q: How do you handle errors in a promise?
//A: You can use .catch() to handle errors in a promise.

//Q: What are the different states of a promise?
//A: A promise has three states: pending, fulfilled, and rejected.

