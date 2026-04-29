//Callback functions:
//A callback is a function passed as an argument to another function, 
// to be invoked later — after an async operation completes or an event fires. 
// It's the foundation of async JS.
//Example: setTimeout takes a callback to run after a delay
setTimeout(() => {
    console.log("This runs after 1 second");
}, 1000);
// 1. Synchronous callback
[1, 2, 3].forEach(function(num) {
  console.log(num);  // callback runs immediately
});

// 2. Asynchronous callback
setTimeout(function() {
  console.log('After 1 second');
}, 1000);

// 3. Event listener callback
document.getElementById('btn').addEventListener('click', function() {
  console.log('Clicked!');
});

// 4. Node.js error-first callback pattern
const fs = require('fs');
fs.readFile('data.txt', 'utf8', function(err, data) {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});
// Interview Q&A
// Q: What is a callback function? Give a real-world example.
// A: A callback is a function you pass to another function to be called later.
//  Real example: setTimeout(fn, 1000) — fn is a callback called after 1 second. 
// Example:fetch('/api').then(callback) — callback runs when data arrives. Node.js uses error-first callbacks: function(err, data) — always check err first.
// ✓ Tip: Callbacks themselves aren't bad. The problem is NESTING them deeply. That leads to callback hell — solved by Promises or async/await.

// Q: What are the differences between synchronous and asynchronous callbacks in JavaScript?
// A: Synchronous callbacks run in the same thread as the calling function, while asynchronous callbacks run in a separate thread.

