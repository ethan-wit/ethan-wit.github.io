# Typescript

[Javascript](http://crockford.com/javascript/survey.html) is a language originally made to be run in browsers. Across time, Javascript has increased its functionality such that it can be used on servers as well -- think node.js. However, Javascript is dynamically typed, meaning that it will not throw errors during compiliation for incorrect data type use. See [here](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) for examples. This is problematic for large web applications. [Typescript](https://www.typescriptlang.org/) is a superset of Javascript. Typescript is statically typed, meaning that it does check for type errors while "compiling". Actually, Typescript transpiles to Javascript, meaning that it "compiles" to Javascript code, instead of machine language. It does not alter the execution of the transpiled Javascript, to ensure the behavior of the program is unchanged.

## Traditional Javascript Web Implementation

I'll provide some context on how Javascript was traditionally used in websites. [This](http://web.simmons.edu/~grabiner/comm244/weeknine/including-javascript.html) is a basic overview from 2012. [Here](https://www.youtube.com/watch?v=jaVNP3nIAv0) is a video example. Below is a basic HTML document:

```
<HTML>
    <body>
        <div>
            <p id="hello-world"></p>
        </div>
    </body>
<script src="hello-world.js"></script>
</HTML>
```

Below is a Javascript file that is located in the same directory as the above HTML, named hello-world.js:

```
var hello = document.getElementById("hello-world")
hello.innerHTML = "Hello World!"
```

When served, hello-world.js places the string "Hello World!" in the specified HTML element.

## Objects

Fundamentally, Javascript objects are a hash table implementation. An object is a collection of properties. A property is a key-value pair. A property can be a variable associated with the object. A property value can also be a function, in which case it is called a method. Below is an example of declaring an object in Javascript and adding a property:

```
const jsObject = new Object(); 
jsObject.objectProperty = "property"; 
```

One can also use the shorthand below:

```
const jsObject = {
    objectProperty: "property"
}
```

## Classes 

If you come from a C++ background, you would assume that classes are templates for objects and objects are instantiations of classes. This seems to be somewhat more confusing for beginners with Javascript. Everything in Javascript is an object, including classes. Therefore, in Javascript, you create an object (a class) which is used as a template to create more objects, which are instantiations of the class. [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) an introduction to classes in Javascript. [Here](https://www.typescriptlang.org/docs/handbook/2/classes.html) is an introduction to classes in Typescript. A Typescript class example and instantiation can be found below:

```
class Dog {

    color: string;
    weight: number;

    constructor (color, weight) {
        this.color = color;
        this.weight = weight;
    }

    get color(): string {
        return this.color;
    }

    set color(color): void {
        this.color = color;
    }
}

const clifford = new Dog("red", 12000)
clifford.set
```

## Syntax

### Declaring Types

Including a pipe character allows a property to have multiple types:

```
price: number | undefined;
```

Including an exclamation mark before type assignment allows the value to be null or undefined:

```
price !: number; 
```

Including a question mark before type assignment allows the property to be optional:

```
price ?: number;
```

Given the default tsconfig.json (typescript configuration file, which declares the strictness of the type checking), you will need to declare the types of object properties. Official documentation can be found [here](https://www.typescriptlang.org/docs/handbook/2/objects.html). For example, we have an interface that does this:

```
interface Dog {
    color: string;
    weight: number;
}

dog: Dog = {color: "red", weight: 12000}
```

### Scope

Brief [overview](https://codeburst.io/javascript-var-let-or-const-which-one-should-you-use-2fd521b050fa) on scope in Javascript.


