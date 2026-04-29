let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let btn = document.getElementById("btn");
let loggedIn = "false";
let Userobj = {};
//localStorage is a web storage API that allows us to store data in the browser. 
// It provides a way to store key-value pairs in a web browser with no expiration date. 
// The data stored in localStorage is persistent and will remain even
// after the browser is closed and reopened.
btn.addEventListener("click", function () {
  console.log("User is logging in");
  if (inputEmail.value && inputPassword.value) {
    loggedIn = "true";
    //localStorage only stores string data, so we need to convert the boolean value to a string before storing it
    localStorage.setItem("loggedIn", loggedIn);
    localStorage.setItem("email", inputEmail.value);
    localStorage.setItem("password", inputPassword.value);

    Userobj = {
      email: inputEmail.value,
      password: inputPassword.value,
    };
    console.log(Userobj);
    console.log("User is logged in");
    onLoad();
  } else {
    console.log("Please enter email and password");
  }
});

console.log("Logged in status:", localStorage.getItem("loggedIn"));
function onLoad() {
  if (localStorage.getItem("loggedIn") === "true") {
    console.log("User is logged in");

    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    Userobj = {
      email: email,
      password: password,
    };
    console.log(Userobj);
    inputEmail.style.display = "none";
    inputPassword.style.display = "none";
    btn.style.display = "none";

    document.body.innerHTML += "<h1>Welcome back!</h1>";
  }
}

onLoad();
