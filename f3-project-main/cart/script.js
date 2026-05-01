// Cart page script
let currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

if (!currentUser) {
  // Redirect to login if not logged in
  window.location.href = "/f3-project-main/Login.html";
}

// Get cart items from localStorage (stored as object with id and quantity)
let cartData = JSON.parse(localStorage.getItem("Cart")) || {};

// Get all products from localStorage or fetch from API
let allProducts = [];

async function initCart() {
  // First try to get from localStorage
  if (localStorage.getItem("Products")) {
    allProducts = JSON.parse(localStorage.getItem("Products"));
  } else {
    // Fetch from API if not available
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      allProducts = await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  
  // Get cart items as array
  let cartItems = [];
  Object.keys(cartData).forEach(productId => {
    let product = allProducts.find(p => p.id == productId);
    if (product) {
      product.quantity = cartData[productId];
      cartItems.push(product);
    }
  });

  renderCart(cartItems);
}

// Render cart items
function renderCart(cartItems) {
  const cartItemsContainer = document.getElementById("cart-items");
  const orderSummaryBody = document.getElementById("order-summary-body");
  
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty. Go to Shop to add products!</p>
      </div>
    `;
    orderSummaryBody.innerHTML = "";
    document.getElementById("total-amount").textContent = "$0";
    return;
  }

  // Render cart items
  cartItemsContainer.innerHTML = "";
  cartItems.forEach(product => {
    cartItemsContainer.innerHTML += `
      <div class="item">
        <img src="${product.image}" alt="Item" />
        <div class="info">
          <div class="row">
            <div class="price">$${product.price}</div>
            <div class="sized">${product.sizes ? product.sizes.join(',') : ''}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              ${(product.colors || []).map(color => `<div class="circle" style="background-color: ${color}"></div>`).join('')}
            </div>
          </div>
          <div class="row">Qty: ${product.quantity}</div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button>
      </div>
    `;
  });

  // Render order summary table
  orderSummaryBody.innerHTML = "";
  let totalAmount = 0;
  cartItems.forEach(product => {
    const productTotal = product.price * product.quantity;
    totalAmount += productTotal;
    const productName = product.title.length > 30 ? product.title.substring(0, 30) + "..." : product.title;
    orderSummaryBody.innerHTML += `
      <tr>
        <td>${productName}</td>
        <td>${product.quantity}</td>
        <td>$${productTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  document.getElementById("total-amount").textContent = "$" + totalAmount.toFixed(2);
}

// Remove item from cart
function removeFromCart(productId) {
  let cartData = JSON.parse(localStorage.getItem("Cart")) || {};
  delete cartData[productId];
  localStorage.setItem("Cart", JSON.stringify(cartData));
  
  // Re-fetch products and re-render
  initCart();
}

// Checkout button handler
document.getElementById("checkout-btn").addEventListener("click", function() {
  // Get cart items
  let cartData = JSON.parse(localStorage.getItem("Cart")) || {};
  const cartItemCount = Object.keys(cartData).length;
  
  if (cartItemCount === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  // Calculate total amount
  let totalAmount = 0;
  Object.keys(cartData).forEach(productId => {
    let product = allProducts.find(p => p.id == productId);
    if (product) {
      totalAmount += product.price * cartData[productId];
    }
  });
  
  const amountInPaise = Math.round(totalAmount * 100);
  
  // Call Razorpay checkout
  if (typeof Razorpay !== 'undefined') {
    var options = {
      key: "rzp_test_key", // Test key (replace with actual key in production)
      amount: amountInPaise,
      currency: "USD",
      name: "MeShop Checkout",
      description: "Order from MeShop",
      theme: {
        color: "#000"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  } else {
    alert("Checkout feature not available. Please contact support.");
  }
});

// Initialize
initCart();
