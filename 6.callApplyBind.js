// .call() and .apply() are methods that allow you to call a function with a specific this value and arguments.
// .call() takes arguments separately, while .apply() takes arguments as an array.
// .bind() returns a new function with a specific this value and optional arguments.
 
let obj1={
    name: "John",
    lastName: "Doe",
    function:function(age, city){
        console.log(this.name + " " + this.lastName," " + "My age is"+age + " " +"My city is"+ city );
    }
}
let obj2={
    name: "Jane",
    lastName: "Smith"
}

console.log("Using call:" ,obj1.function.call(obj2, 25, "New York")); // Jane Smith My age is25 My city isNew York
console.log("Using apply:" ,obj1.function.apply(obj2, [30, "Los Angeles"])); // Jane Smith My age is30 My city isLos Angeles

let boundFunction = obj1.function.bind(obj2, 35, "Chicago");
console.log("Using bind:" ,boundFunction()); // Jane Smith My age is35 My city isChicago    

