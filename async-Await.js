//async await is a syntax sugar for promises that makes async code easier to read and write.
//async functions always return a promise. If the function returns a value, the promise will be resolved with that value. 
// If the function throws an error, the promise will be rejected with that error.

// Example of async/await:
function fetchData(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("data Loaded successfully!");
        }, 2000)
    })
}
function processData(data){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("Data processed successfully!");
        }, 2000)
    })
}
async function loadData() {
    try{
        const res=await fetchData();
        console.log(res); // Output: data Loaded successfully!
        const processedData=await processData(res);
        console.log(processedData); // Output: Data processed successfully!
    }catch(error){
        console.error(error);
    }
    
}

loadData();

// In this example, we have two functions fetchData() and processData() that return promises.
// We define an async function loadData() that uses the await keyword to wait for the promises to resolve before proceeding with the next line of code. 
// We also include a try/catch block to handle any potential errors that may occur during the execution of the async function.

// By using async/await, we can write cleaner and more readable code that is easier to manage and understand.