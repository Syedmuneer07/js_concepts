// Write your script here
let currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

// Color and size arrays for generating random colors/sizes
let colors = ["red", "blue", "green", "yellow", "black"];
let sizes = ["S", "M", "L", "XL", "XXL"];

// Store all products globally
let allProducts = [];

// Store current filter states
let currentFilters = {
  search: "",
  category: "all",
  colors: [],
  sizes: [],
  rating: 0,
  priceRange: ""
};

if (currentUser) {
  // User is logged in - always fetch fresh products from API to get new colors/sizes
  fetchProductsFromAPI();
} else {
  // Back to login page if user is not logged in
  window.location.href = "/f3-project-main/Login.html";
}

// Fetch products from API
function fetchProductsFromAPI() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log("Products from API:", data);
      
      // Add random colors and sizes to each product
      let newData = data.map((item) => {
        item.colors = colors.slice(0, Math.floor(Math.random() * 5) + 1);
        item.sizes = sizes.slice(0, Math.floor(Math.random() * 5) + 1);
        return item;
      });
      
      console.log("New Data with colors/sizes:", newData);
      localStorage.setItem("Products", JSON.stringify(newData));
      allProducts = newData;

      // Initialize the app
      initShop();
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      // Try to use cached products if API fails
      if (localStorage.getItem("Products")) {
        allProducts = JSON.parse(localStorage.getItem("Products"));
        initShop();
      }
    });
}

// Initialize the shop
function initShop() {
  renderProducts(allProducts);
  setupFilterListeners();
  setupSidebarFilters();
}

// Function to render products
function renderProducts(productList) {
  const itemsContainer = document.querySelector('.items');
  itemsContainer.innerHTML = '';

  if (productList.length === 0) {
    // Show no results message
    itemsContainer.innerHTML = `
      <div class="no-results">
        <p>We couldn't find any products matching your search.</p>
      </div>
    `;
    return;
  }

  productList.forEach((product) => {
    itemsContainer.innerHTML += `
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
          <div class="row">Rating: ${product.rating?.rate || 0}</div>
        </div>
        <button class="addBtn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}
// Add to cart function
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("Cart")) || {};
  if (!cart[productId]) {
    cart[productId] = 1;
    localStorage.setItem("Cart", JSON.stringify(cart));
    console.log("Cart after adding product:", cart);
    alert("Product added to cart!");
  } else {
    // Increment quantity
    cart[productId]++;
    localStorage.setItem("Cart", JSON.stringify(cart));
    console.log("Cart after incrementing quantity:", cart);
    alert("Product quantity updated in cart!");
  }
}

// Apply all filters and render products
function applyFilters() {
  let filtered = allProducts;

  // Filter by search term
  if (currentFilters.search) {
    const searchTerm = currentFilters.search.toLowerCase();
    filtered = filtered.filter(product => 
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by category
  if (currentFilters.category !== "all") {
    filtered = filtered.filter(product => {
      switch (currentFilters.category) {
        case "mens":
          return product.category === "men's clothing";
        case "womens":
          return product.category === "women's clothing";
        case "jewellery":
          return product.category === "jewelery";
        case "electronics":
          return product.category === "electronics";
        default:
          return true;
      }
    });
  }

  // Filter by colors
  if (currentFilters.colors.length > 0) {
    filtered = filtered.filter(product => {
      if (!product.colors) return false;
      return currentFilters.colors.some(color => 
        product.colors.includes(color)
      );
    });
  }

  // Filter by sizes
  if (currentFilters.sizes.length > 0) {
    filtered = filtered.filter(product => {
      if (!product.sizes) return false;
      return currentFilters.sizes.some(size => 
        product.sizes.includes(size)
      );
    });
  }

  // Filter by rating
  if (currentFilters.rating > 0) {
    filtered = filtered.filter(product => 
      (product.rating?.rate || 0) >= currentFilters.rating
    );
  }

  // Filter by price range
  if (currentFilters.priceRange) {
    filtered = filtered.filter(product => {
      const price = product.price;
      switch (currentFilters.priceRange) {
        case "0-25":
          return price >= 0 && price <= 25;
        case "25-50":
          return price > 25 && price <= 50;
        case "50-100":
          return price > 50 && price <= 100;
        case "100on":
          return price > 100;
        default:
          return true;
      }
    });
  }

  renderProducts(filtered);
}

// Setup filter tab listeners
function setupFilterListeners() {
// Search input listener
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    currentFilters.search = e.target.value;
    applyFilters();
  });

  // Filter tab listeners
  document.querySelectorAll('.filter').forEach((tab) => {
    tab.addEventListener("click", function () {
      // Set active class
      document.querySelectorAll(".filter").forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Update category title
      const categoryTitle = document.getElementById("category-title");

      // Get category from tab text or id
      const tabText = this.textContent.trim().toLowerCase();
      switch (tabText) {
        case "all":
          currentFilters.category = "all";
          categoryTitle.textContent = "All Products";
          break;
        case "mens":
          currentFilters.category = "mens";
          categoryTitle.textContent = "Men's Clothing";
          break;
        case "womens":
          currentFilters.category = "womens";
          categoryTitle.textContent = "Women's Clothing";
          break;
        case "jewellery":
          currentFilters.category = "jewellery";
          categoryTitle.textContent = "Jewellery";
          break;
        case "electronics":
          currentFilters.category = "electronics";
          categoryTitle.textContent = "Electronics";
          break;
        default:
          currentFilters.category = "all";
          categoryTitle.textContent = "All Products";
      }
      applyFilters();
    });
  });
}

// Setup sidebar filter listeners
function setupSidebarFilters() {
  // Color filters
  document.querySelectorAll('input[name="color"]').forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const color = e.target.id;
      if (e.target.checked) {
        currentFilters.colors.push(color);
      } else {
        currentFilters.colors = currentFilters.colors.filter(c => c !== color);
      }
      applyFilters();
    });
  });

  // Size filters
  document.querySelectorAll('input[name="size"]').forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const size = e.target.id.toUpperCase();
      if (e.target.checked) {
        currentFilters.sizes.push(size);
      } else {
        currentFilters.sizes = currentFilters.sizes.filter(s => s !== size);
      }
      applyFilters();
    });
  });

  // Rating filter
  const rangeInput = document.getElementById("range");
  rangeInput.addEventListener("input", (e) => {
    currentFilters.rating = parseFloat(e.target.value);
    applyFilters();
  });

  // Price range filters
  document.querySelectorAll('input[name="prange"]').forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      // Uncheck other price range checkboxes
      if (e.target.checked) {
        document.querySelectorAll('input[name="prange"]').forEach((cb) => {
          if (cb !== e.target) cb.checked = false;
        });
        currentFilters.priceRange = e.target.id;
      } else {
        currentFilters.priceRange = "";
      }
      applyFilters();
    });
  });
}
