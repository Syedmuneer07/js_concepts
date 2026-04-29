//Every JS object has a hidden [[Prototype]] link to another object. 
// When you access a property, JS walks up this prototype chain until found or null.
// The ES6 class syntax is just syntactic sugar over this prototype system.

// .this is the instance object, 
// .__proto__ is the prototype object, and
// .constructor points back to the constructor function. 

//Code Example
// Constructor function + prototype
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return this.name + ' makes a sound';
};

const dog = new Animal('Dog');
console.log(dog.speak());           // "Dog makes a sound"
console.log(dog.__proto__ === Animal.prototype); // true

// Prototype chain:
// dog → Animal.prototype → Object.prototype → null

// ES6 class (same prototype under the hood)
class Cat extends Animal {
  speak() { return this.name + ' meows'; }
}
const c = new Cat('Cat');
c.speak(); // "Cat meows"

// Check prototype
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true


//Q: Explain prototype chain in JavaScript.
//A: Every object has a [[Prototype]] reference to another object. 
// When you access obj.method(), JS first looks in obj, then obj.__proto__,
//  then up the chain until Object.prototype (top). 
// This is how inheritance works in JS. ES6 class extends is still prototype-based — 
// it just provides cleaner syntax.