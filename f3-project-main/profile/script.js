// Check if user is logged in
let currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

if (!currentUser) {
  // Redirect to login if not logged in
  window.location.href = "/f3-project-main/Login.html";
} else {
  // Get user data from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === currentUser.email);
  
  if (user) {
    // Display user info
    document.getElementById("fname-display").textContent = user.fname || "N/A";
    document.getElementById("lname-display").textContent = user.lname || "N/A";
    document.getElementById("email-display").textContent = user.email || "N/A";
    document.getElementById("created-display").textContent = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";
  }
}

// Logout button handler
document.getElementById("logout-btn").addEventListener("click", function() {
  // Remove current user from localStorage
  localStorage.removeItem("CurrentUser");
  // Redirect to login page
  window.location.href = "/f3-project-main/Login.html";
});
