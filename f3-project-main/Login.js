let email = document.getElementById("email");
let password = document.getElementById("password");
let submitBtn = document.getElementById("login");
let error = document.getElementById("error");

// Generate token
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Login logic
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value === '' || password.value === '') {
    error.textContent = "Please fill in all the fields";
    error.style.color = "red";
  } else {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length > 0) {
      let user = users.filter((user) => user.email === email.value && user.password === password.value);
      if (user.length > 0) {
        // User exists and password matches
        let obj = user[0];
        // Login successful
        console.log("Login successful for:", obj);
        localStorage.setItem("CurrentUser", JSON.stringify({
          email: obj.email,
          password: obj.password,
          token: generateToken(),
        }));
        window.location.href = "shop/index.html";
      } else {
        error.textContent = "Invalid email or password";
        error.style.color = "red";
      }
    } else {
      error.textContent = "No users found. Please sign up first.";
      error.style.color = "red";
    }
  }
});
