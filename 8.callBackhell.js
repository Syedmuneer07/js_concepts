// Callback hell (pyramid of doom) is when multiple nested async callbacks make code hard to read, debug, and maintain. Each level of nesting adds indentation and complexity.

// Code Example
// ❌ Callback Hell — 4 levels deep
getUser(userId, function(err, user) {
  if (err) return handleError(err);
  getOrders(user.id, function(err, orders) {
    if (err) return handleError(err);
    getProduct(orders[0].productId, function(err, product) {
      if (err) return handleError(err);
        getReview(product.id, function(err, review) {
          if (err) return handleError(err);
          console.log(review); // finally!
        });
    });
  });
});

// ✅ Fix 1: Promises
getUser(userId)
  .then(user => getOrders(user.id))
  .then(orders => getProduct(orders[0].productId))
  .then(product => getReview(product.id))
  .then(review => console.log(review))
  .catch(handleError);

// ✅ Fix 2: Async/Await (cleanest)
async function loadData(userId) {
  try {
    const user    = await getUser(userId);
    const orders  = await getOrders(user.id);
    const product = await getProduct(orders[0].productId);
    const review  = await getReview(product.id);
    console.log(review);
  } catch(err) { handleError(err); }
}
// Interview Q&A
// Q: What is callback hell and how do you solve it?
// A: Callback hell is deeply nested async callbacks, making code shaped like a pyramid and nearly unmaintainable. 
// Problems: hard to read, error handling at every level, hard to debug. 
// Solutions: 
// 1) Promises with .then() chaining,
// 2) async/await for flat readable code, 
// 3) Named functions instead of anonymous callbacks — each improves readability and error handling.
// ⚠ Watch out: Watch for 3+ nested levels of callbacks in code review. It's a refactor signal. 
// Promises and async/await were built to solve exactly this.



