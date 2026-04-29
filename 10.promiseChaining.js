//promise chaining is when you chain .then() after .then() or .catch() after .catch() 
// to handle multiple asynchronous operations in a sequence.

// Example of promise chaining:

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data loaded successfully!');
        }, 2000);
    });
}

fetchData()
    .then(result => {
        console.log(result); // Output: Data loaded successfully!
        return 'Processing data...';
    })           
    .then(processedData => {
        console.log(processedData); // Output: Processing data...
        return 'Data processed successfully!';  
    })      
    .catch(error => {
        console.error(error);   
    })            
    .then(finalResult => {
        console.log(finalResult); // Output: Data processed successfully!
    })            
    .catch(error => {
        console.error(error);
    })
// In this example, we have a function fetchData() that returns a promise.
//  We chain multiple .then() methods to handle the resolved value of the promise and perform additional operations. 
// We also include .catch() methods to handle any potential errors that may occur during the promise execution.