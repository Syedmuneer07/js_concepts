//closure in js is a function that has access to the variables in its parent scope, 
// even after the parent function has closed    
//closure is a way to create private variables in js    
//closure is a function that has access to the variables in its parent scope, 
// even after the parent function has closed
function main(){
    let name= "John Doe";
    function outerfun(){
        function innerfun(){
            console.log(name);
        }
        innerfun();
    }
    outerfun();

}
main(); // John Doe     
//In this example, the innerfun() function is a closure that has access to the name variable in the main() function,
//  even after main() has finished executing. When we call main(), it logs "John Doe" to the console.

//lexical environment is the environment in which a function is declared. 
// It consists of the variables and functions that are in scope at the time the function is created. 
// When a function is called, it creates a new execution context with its own lexical environment. 
// The function can access variables from its own lexical environment as well as from the outer lexical environment (closure).




//Q: What is a closure in JavaScript and how does it work?
//A: A closure is a function that retains access to its outer scope variables even after the outer function has executed. 
// It works by creating a lexical environment for the inner function that includes references to the variables of the outer function. 
// This allows the inner function to access and manipulate those variables, enabling data encapsulation and private state in JavaScript.

//Q: What is the difference between a closure and a lexical environment in JavaScript?
//A: A closure is a function that retains access to its outer scope variables, while a lexical environment is the context in which a function is declared. 
// The lexical environment includes all the variables and functions that are in scope at the time the function is created. 
// A closure is a specific instance of a function that has access to its lexical environment, allowing it to access and manipulate variables from its outer scope even after the outer function has finished executing.

//q: what is scope in JavaScript?
//A: Scope refers to the visibility and accessibility of variables and functions in a JavaScript program. 
// It determines how variables and functions can be accessed and used in different parts of the program.
// There are three types of scope in JavaScript: global scope, function scope, and block scope.
// Global scope: Variables declared outside of any function or block are in the global scope and can be accessed from anywhere in the program.
// Function scope: Variables declared inside a function are in the function scope and can only be accessed within that function.
// Block scope: Variables declared with let or const inside a block (e.g., inside an if statement or a loop) are in the block scope and can only be accessed within that block.

//Q:lexical scope in JavaScript?
//A: Lexical scope refers to the fact that the scope of a variable is determined by its position in the source code. 
// In JavaScript, functions are lexically scoped, meaning that they have access to variables from their outer scope (the scope in which they were defined) even after that outer scope has finished executing. 
// This is what allows closures to work, as the inner function retains access to the variables of its outer function due to lexical scoping.