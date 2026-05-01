let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let submitBtn = document.getElementById("signup");
let error = document.getElementById("error");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (fname.value === '' || lname.value === '' || email.value === '' || password.value === '' || confirmPassword.value === '') {
    error.textContent = "Please fill in all the fields";
    error.style.color = "red";
  } else if (password.value === confirmPassword.value) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let filteredUsers = users.filter((user) => user.email === email.value);
    if (filteredUsers.length > 0) {
      error.textContent = "Email already exists";
      error.style.color = "red";
    } else {
      users.push({
        email: email.value,
        password: password.value,
        fname: fname.value,
        lname: lname.value,
        createdAt: new Date(),
      });
      localStorage.setItem("users", JSON.stringify(users));
      fname.value = "";
      lname.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      error.textContent = "Account created successfully! Redirecting to login...";
      error.style.color = "green";
      // Redirect to Login page after successful signup
      setTimeout(() => {
        window.location.href = "Login.html";
      }, 1500);
    }
  } else {
    error.textContent = "Passwords do not match";
    error.style.color = "red";
  }
});
