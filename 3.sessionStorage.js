// sessionStorage.js
// sessionStorage is similar to localStorage but the data stored in sessionStorage is cleared when the page session ends. 
// A page session lasts as long as the browser is open and survives over page reloads and restores. 
// Opening a page in a new tab or window will cause a new session to be initiated.
document.getElementById("btn").addEventListener("click", () => {
    sessionStorage.setItem("Session storage",JSON.stringify({name: "John Doe"}));
    console.log(JSON.parse(sessionStorage.getItem("Session storage")));
    
})