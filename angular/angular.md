# Angular

The purpose of this page is to document Angular framework concepts.

## Definitions

A website is a domain that serves files to users, upon their request. Generally, the files are HTML documents (hypertext markup language), and they are stored on a web server. The web server listens for user requests and serves the proper file. A web application is a website that allows the user to alter the content of the files they are served. As an example, Facebook is a web application, because the users can change the files that are served through inputting their profile information. Web applications typically have three components: frontend, backend, and database. The frontend consists of files that the user can directly interact with and are executed on the client's computer -- think HTML, CSS, and javascript files. The backend consists of files that get information or perform actions for the frontend; these files are executed on a computer other than the client's. The database houses all the application and user information. Angular is a framework, written in Typescript, that allows developers a base from which they can build the frontend for a specific type of web application, called single-page applications. Single-page applications allow users to change the documents that are served to them, without the web application serving a new document to the user each time they make a change. Something to keep in mind: Angular is simply a group of files, which are just documents with text, that are executed by computer(s) to serve information to users.

## [Local Setup](https://angular.io/guide/setup-local) (Ubuntu)

1. Open terminal
2. Install nvm
    - Installing Angular requires an active or maintenance LTS version of [node.js](https://nodejs.org/en/). Using apt did not provide this for me, so I installed and used [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md), which stands for node version manager. nvm allows us to selectively install and use different node.js versions.
    - ```wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash```
3. Install node.js
    - ```nvm install <desired node.js version>```
    - The above command will set the specified version as your default. It will also install npm, or node package manager.
4. Install Angular CLI
    - ```npm install -g @angular/cli```

### Creating a new Angular application

Execute the following command in Angular CLI to create a new Angular application:

```
ng new <name-of-app>
```

## Basics

As mentioned, Angular is built with Typescript. One imports classes (e.g. Component) from angular modules (e.g. angular/core) in Typescript files to build their web application frontend. The key component of an Angular app is called a Component. A Component consists of the Component class from angular/core, a developer-written class with an @Component decorator, an HTML template, and some styling (CSS). Below, you'll find an example of a Component:

### HTML Template & Styling

HTML templates are the HTML code or files that our Angular Components can act on. Below is an example of an HTML template, located in the top level of the app directory and called helloWorld.html:

```
<style>
    .helloStyle {
        color: black
    }
</style>

<hello class="helloStyle">
{{ output }}
</hello>
```

### Component

Components act on HTML templates. Components are created using a decorator for a Typescript class. An example is below:

```
import { Component } from '@angular\core'

@Component({
  selector: 'hello',
  template: '.helloWorld.html'
})
export class helloWorld () {
    output = 'Hello World!';
}
```

### Creating a new Component

Execute the following command in Angular CLI to create a new Component:

```
ng generate component <name-of-component>
```

This will create a new directory with three files: Typescript, HTML, and CSS. All three files will be specific to the Component. It will also declare the Component in module.ts.

### Serving an Angular app

Serve an Angular app by executing the below in the Angular CLI:

```
ng serve
```

## Routing


Routing allows one to present Components based on the application URL path. When generating a new Angular app, you have the option to add Angular routing or not. The below works for choosing not to include Angular routing; it's counterintuitive, but you can perform routing with this configuration. A useful and official guide can be found [here](https://angular.io/guide/router-tutorial). First, the index.html file should have the app-root and the app.component.html file should have the router-outlet tag, as per the Directory Structure section above. Create a new child Component, as per the directions above. After doing so, alter the app.module.ts file to include the routing configuration below:

```
@NgModule({
    imports([
        {path: '', component: 'AppComponent'}, \\The AppComponent is presented at the base URL
        {path: 'child', component: 'ChildComponent'} \\The ChildComponent is presented when \child is appended to the base URL 
    ])
})
```

You can replace the AppComponent with a child Component, if you'd like that to be shown at the base URL. TODO: include redirects. If you'd like to include a link to another Component's URL, you can include the below in an HTML template (routerLink value is the other Component's URL from the base):

```
<a [routerLink]="other">Link to other</a>
```


## Binding

Binding allows one to pass information between the files in a Component, or between Components. Property binding lets one assign HTML object properties from the Typescript file, event binding lets one call a Typescript method from an action on the HTML template, and the @Input and @Output decorators let one pass information between Components.

### Property Binding

Official documentation can be found [here](https://angular.io/guide/property-binding). Angular property binding allows one to assign an HTML object property to a value in a Typescript file. HTML objects are nodes in the [DOM](https://web.stanford.edu/class/cs98si/slides/the-document-object-model.html) tree. [Here](https://www.cs.swarthmore.edu/courses/CS35/S20/labs/08/) are some examples what I mean by tree. An example of an HTML object is an element, such as span or div. These HTML elements have properties, in the same way that Javascript objects have properties (TODO: insert link to typescript.md). Examples of these properties being id, lastChild, and attributes; a sample list can be found [here](https://www.w3schools.com/jsref/dom_obj_all.asp). Sime Vidas explains how attributes and properties may or may not represent the same information in this [stackoverflow answer](https://stackoverflow.com/questions/6003819/what-is-the-difference-between-properties-and-attributes-in-html). Below is an example of an Angular property binding; the first line is the HTML template and the second is the associated Typescript:

```
<img [src]="imageURL">
```

```
imageURL = "../assets/image.png";
```

You can also use a technique called interpolation to set the property of an element. Interpolation takes a Typescript expression, evaluates it, and converts it to a string to be assigned to the element property. Below is an example of interpolation on the paragraph element's innerText property:

```
account: number = 000612;
```

```
<p>
    {{account}}
</p>
```

### Event Binding


Event binding generally takes the form of initiating a method (or acting on a property) when an action is taken by the user. For example, when a button is pushed, an alert will appear:

```
<button (click)="alertWindow()">Alert me<button>
```
```
class alertComponent () {

    alertWindow() {
        window.alert("You have been alerted");
    }
}
```

The eventEmitter class of the Component module of angular/core allows you to create custom events. I've seen eventEmitter used in cases where a child Component event is called in a parent Component HTML template. I don't yet understand it's utility, because you can also do this with a simple event binding in the child Component. 


### Input Binding

@Input allows a parent Component to pass data to a child Component. There are 3 actions you need to achieve this. You need an object in the parent Component, an object that has the same structure as the parent class object with the @Input decorator in the child Component, and a binding of the values in the parent Component HTML template (guide [here](https://angular.io/guide/property-binding#bind-values-between-components)). Below is an example:

Say the parent Component has a property object dog below, and we want the child Component to have access to it:

```
interface Dog {
    color: string;
    weight: number;
}

@Component ({
    selector: 'app-parent',
    templateUrl: 'parent.html'
})
export class parentComponent () {

    dog : Dog = {color: "yellow", weight:50}

}
```

Below is the child Component:

```
interface Dog {
    color: string;
    weight: number;
}

@Component ({
    selector: 'app-child',
    templateUrl: 'child.html'
})
export class childComponent () {

    @Input parentData: Dog | undefined;

}
```

And finally, here is the parent Component HTML template. The child Component now has access to the parent Component's object:

```
<div>
<app-child [parentData]='dog'><app-child>
</div>
```

### Output Binding


Output binding allows a child Component to pass information to a parent Component. To achieve this, one needs four items: an event emitter in the child component, an event in the child HTML template, an event in the parent HTML template, and a method in the parent Component. An example is below, with the first code block the child event emitter:

```
import {EventEmitter} from '@angular/core';

@Output() notifier = new EventEmitter();
```

Now, the child HTML template (selector is app-notification):

```
<button (click)='notifier.emit()'><button>
```

The parent Component:

```
notify () {
    window.alert("You have been notified")
}
```

The parent HTML template:

```
<app-notification (notifier)='notify()'>
```

## Directives

There are three types of directives in the Angular framework: Components, structural directives, and attribute directives.

### Structural Directives

Angular has multiple built-in structural directives that allow a developer to include or exclude elements in the DOM based on some logic. I'll highlight the two most popular below: ngIf and ngFor.

#### ngIf

ngIf displays an element if the condition evaluates to true. ngIf can be evaluated against any valid Typescript expression. The example below would include the element. Someting to note -- this does not only hide the element, like the HTML hidden attribute, but actually includes or exclude it from the DOM.
```
determineIfInclude: boolean = true;
```

```
<div *ngIf="determineIfInclude">
    <p>
    Element is included.
    </p>
<\div>
```

The asterisk before ngIf is the short-hand form of the syntax. Without this, the developer needs to include ngIf in brackets in an ng-template element, like the below example:

```
<ng-template [ngIf]="determineIfInclude">
    <div>
        <p>
        Element is included.
        </p>
    <\div>
<ng-template>
```

ngIf also allows for else logic, using ng-template as the element to include if the else condition is reached. Below is an example of the else element being included.

```
determineIfInclude: boolean = false; 
```

```
<div *ngIf="determineIfInclude; else includeThis">
    <p>
    Element 1 is included.
    </p>
<\div>
<ng-template #includeThis>
    <p>
    Element 2 is included.
    </p>
</ng-template>
```

#### ngFor

ngFor will iterate over a data structure (e.g. Array), allowing the developer to include or exclude an element for each item in the data structure. Below is an example:

```
dataStructure: Array<string> = ["first", "second", "third"]
```

```
<div *ngFor="let item in dataStructure">
    <p>
    {{item}}
    </p>
</div>
```

ngFor can be used with ngIf to include elements in the data structure, dependent on some additional logic. See the example below.

```
<div *ngFor="let item in dataStructure">
    <p *ngIf="item === 'first' || item === 'third'">
        {{item}}
    </p>
</div>
```

ngFor also provides local variable tracking for specific cases, such as indexing. The below directive provides the index of each item in the data structure:

```
<div *ngFor="let item in dataStructure; index as idx">
    <table>
        <tr>
            <td>{{idx}}</td>
            <td>{{item}}</td>
        </tr>
    </table>
</div>
```

Other cases include first/last and odd/even, which can be found [here](https://angular.io/api/common/NgForOf#local-variables). The trackBy local variable is used to facilitate the rerender of elements in the ngFor based on a change in a specified data structure property; without the use of trackBy, every element in ngFor will be rerendered if any given item in the data structure is changed. Below is an example of using trackBy, which rerenders an element if its price has changed. 

```
export interface Item {
    id: number;
    name: string;
    price: number;
}
```

```
items: Array<Item> = [
    {
        id: 1
        name: "5mod shirt"
        price: 7
    },
    {
        id: 2
        name: "peggy shirt"
        price: 10
    }
]

trackPrice (index: number, item: Item): number {
    return item.price
}
```

```
<div *ngFor="let item in items; trackBy: trackPrice">
    <table>
        <tr>
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
        </tr>
    </table>
</div>
```

### Pipes

A pipe transforms any valid Typescript data structure to a specified format in the HTML template, without changing the data structure itself. The pipe syntax follows this pattern: {{value | format: configuration}}. There are many built-in pipes, such as date, currency, percent, json, etc. An example is below:

```
price: number = 5.01;
```

```
<div>
    {{price | currency: 'USD'}}
</div>
```

You can also create custom pipes, by executing the below in the Angular CLI, in the directory you want the pipe to live:

```
ng generate pipe <name-of-pipe>
```

This will generate a Typescript class with pipe decorator; you must also implement the transform method from the PipeTransform interface, as shown below:

```
@Pipe({
    name: 'add-sub-num'
})
export class addSubNumPipe {

    transform (value: number, addNum: number, subNum: number) {
        return value + addNum - subNum
    }
}
```

```
val: number = 10;
```

```
<div>
    {{val | add-sub-num:5:10}}
</div>
```

Pipes are pure by default, although they can also be set to impure, as shown below:

```
@Pipe({
    name: 'add-sub-num'
    pure: false
})
```

A pure pipe is rerendered only when Angular detects a change to the value or parameters of the pipe. This excludes when the value is an object and one of its properties are changed. However, it would rerender if the value is assigned to a new object. It also excludes adding a new item to an Array that is the value. Impure pipes rerender upon a change to any state change in the Angular application, which forces more computation on the machine running the application. One other note of importance: pure pipes can be reused, while each time an impure pipe is applied, a new pipe instance will be created. 

### Custom Directives

You can create custom directives using the below command. They are generally used when there is reusable functionality that isn't associated with a specific feature.

```
ng generate directive <name-of-directive>
```

The directive Typescript file will be placed in the directory you executed the command. Remember, components are directives with an associated template, so custom directives are apt to be used when you need to add functionality to an element, but an entire template can't be justified. 

#### Attribute Directive

A footer may be an example:

```
@Directive({
    selector: ['appFooter']
})
export class FooterDirective {

    constructor(element: ElementRef, renderer Renderer2) {
        /**renderer.addClass(element.nativeElement, 'footer');**/
        /**above sets CSS footer class in styles.css to this element's class property**/
        renderer.setProperty(
            element.nativeElement,
            'textContent',
            `Webpage Footer`
        );
    }
}
```

```
<p appFooter></p>
```

There are two decorators that provide additional functionality when creating attribute directives: @HostBinding and @HostListener. @HostBinding allows an element property to be set to a Typescript attribute, using the following syntax (specific for class property, syntax differs for other properties):

In styles.css:

```
.greentext {
    color: green
}
```

In the directive class:

```
@HostBinding('class')
elementClass: string = 'greentext';
```

@HostListener allows an event to trigger a method execution, using the following syntax:

```
keyPressCounter: number = 0;

@HostListener('keypress', ['$event'])
incrementKeyPressCounter(event: KeyBoardEvent) {
    keyPressCounter += 1;
}
```

@HostListener can be useful when there is no element associated with an event, such as a window enter. It (as well as @HostBinding) can also be used in components. A good comparative for these bindings can be found [here](https://stackoverflow.com/questions/37965647/hostbinding-and-hostlistener-what-do-they-do-and-what-are-they-for).

## Application Structure

Simple Angular applications are a tree of components. For example, you may have a component for a web application page that takes in user input and returns a response based on the input. The above component could have two child components, one for the user input and another for the response. One item to note is the parent-child relationship exists when one component selector (child) is placed within another component's selector (parent) in an HTML file. This hierarchy is separate from the extends keyword used in building hierarchies of Typescript classes. 

### Base Configuration

The flow of information between components and finally to the user can be confusing. Something to remember is that single-page applications are meant to display series of information to users, without having the user request and load new HTML files. The index.html file is the HTML file; it declares the HTML tag, head tag, and body tag. It also has a tag called app-root. app-root is the selector for the root component, called AppComponent, which is located in the root module (app directory). Within the app.component.html file, which is the HTML template associated with this root component, there is generally a router-outlet tag. The router-outlet tag displays components based on your routing configuration. Routing is discussed [below](#routing).

### Modules

Angular provides another entity to more clearly separate the components of the application: the module. Each Angular application is configured with a root module, app.module.ts, with the associated app directory in src. Feature modules are prevalent in larger Angular applications, which represent a collection of Angular artifacts (e.g. pipes, directives, componenets) aligned to a domain or workflow, such as inventory, cart, or checkout in a web store. You create another module, like a feature module (given its own directory with associated Typescript file within app), by executing the command below:

```
ng generate module <name-of-module>
```

app.name-of-module.ts declares multiple items: declarations (artifacts located in module), imports (other modules for which the module can use their exported artifacts), exports (artifacts located in module that are available to other modules), providers (services located in module that are available to other modules). app.module.ts also includes the bootstrap item, which declares the component that is rendered when the application is initially served to a client. 

Something to note is the imports and exports above and below the @NgModule decorator are not associated with Angular-specific import and exports; they are javascript imports and exports. 

There are other classifications of modules outside of the root and feature modules, two are core and shared modules. Core modules contain artifacts used across the application, such as a nav-bar, and shared modules are utilities that are used by feature modules, but aren't aligned to a specific feature, such as a custom pipe.

To create an artifact that is declared in a specific module, generate it in the module directory or use the --module=name-of-module postfix. An example is below:

```
ng generate component --module=checkout
```

### Non-app items

There are other items found in an Angular project, outside the app directory. The favicon.ico file is the icon that will be shown in the browser tab. There are multiple configuration files, such as angular.json, that each configure a portion of the Angular project. The environments directory declares environments for which the Angular application can be executed; pre-set environments are development and production. Environments allow us to test the application in different scenarios. For example, you develop the application on a Linux machine with wide monitor, but the user may be using Safari on an iOS device. Environments let us test the application in these different cases. The angular.json configurations > architect > environment-name value determines which environment is used when an Angular command is executed:

```
ng <name-of-command> --configuration=<name-of-environment>
```

### Dependency Injection

Dependency injection is a simple design pattern: pass **instantiated** objects (dependencies) to the object constructor, as opposed to instantiating objects (dependencies) within the object. Angular components are responsible for one task: presenting content to the client. This does not include retrieving data from a database or executing complex business logic. The later two tasks, and any others that are not presentation-centric, are delegated to another Angular entity: services. Dependency injection allows us to decouple objects and more easily implement unit tests with mocking.

#### Services

Services perform non-presentation tasks and are injected into components before being called on to perform their tasks. You create a service by executing the below command, in the module directory associated with the service:

```
ng generate service <name-of-service>
```

A service is a Typescript file/class with the @Injectable decorator. An important point to note: services are not registered with modules by default, they are registered with an injector. A reasonable method to include in a service is a data getter method, like the below, which is registered with the root injector:

```
interface Item = {
    id: number;
    name: string;
    price: number;
}
```

```
@Injectable({
    providedIn: 'root'
})
export class cartManager {

    getCartItems(): Array<Item> {
        return [
            {
                id: 1;
                name: "5mod shirt";
                price: 7;
            },
            {
                id: 2;
                name: "peggy shirt";
                price: 10;
            }
        ]   
    }
}
```

Instead of the return object being hard-coded, it will generally be retrieved from a database or other data structure. Now, the CartManager service can be injected into the CartPresenter component, so that the CartPresenter can present cart items to the client:

```
@Component({
    ...
})
export class CartPresenter {

    cart: Array<Items>;

    constructor(private cartManager: CartManager) {

    }

    ngOnInit(): void {
        cart = this.cartManager.getCartItems();
    }
}
```

```
<div *ngFor="let item in cart">
    {{ item.name }}
    {{ item.price }}
</div>
```

Although root is the default injector, you can also register with a module injector. Do so as below:

```
@Injectable({
    providedIn: <name-of-module>
})
```

You can also register the service directly in a module file as below:

```
@NgModule({
    ...
    providers: [<name-of-service>];
})
```

A drawback to directly registering in the module Typescript files is that the service will be included in the application bundle regardless of if it is actually injected, whereas if the provider is registered in the service file, the service will not be included if it is not injected. This is known as being tree shakable.

You can also register with a component injector by declaring the provider as below:

```
@Component({
    ...
    providers: [<name-of-service>];
})
```

The service is a singleton unless configured otherwise. When injected, the component will search up the component tree, then up the module tree, and finally to the root injector, to find the service. Lastly, you can declare other fields in the providers object (acommodating factories, abstraction, etc.); documentation is [here](https://angular.io/guide/dependency-injection-providers).

##### Pattern

Angular documentation states registering with the root injector is preferable, unless you want the service to only be available to a specific module or component. The principle of least information may be appropriate in this case. For example, if a service is only used in one module, register it with that module's injector. Notes [here](https://angular.io/guide/providers).


## Asyncronous Application

A synchronous application executes each function sequentially, waiting for each function to complete before executing the next function. An [asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous) application executes at least one asynchronous function. An asynchronous function does not block the execution of the next function(s) within the application, while it is being executed. 

The core benefit of an asynchronous web application is the user can still interact with it while it is awaiting the completion of a long-running task, such as a call for information from a backend server or a user file upload. An example: the user of an ecommerce application requests to see all the items in their cart. The cart items are stored on a server's database. Therefore, the application must retrieve the cart items from the database; this takes time. If the retrieval is synchronous, the application cannot accept any further requests until the retrieval is complete. If the retrieval is asynchronous, the application can accept further requests and execute functions to satisfy those requests, while it retrieving the cart items. The prime number array generator and XMLHTTPRequest [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#synchronous_programming) are tangible examples of synchronous and asynchronous applications, respectively.

The question is, how are multiple tasks started, worked on, and completed in the same time period, if Javascript is single-threaded (unclear to me if [still the case](https://stackoverflow.com/a/64647055) since ES6)? Single-threaded means there is one execution stack in the runtime environment, and the implication of this is that only one task can be started, worked on, and completed at a time. So in the above example, how can the application be requesting the user's cart items and acting on further user requests within the same time period (either [concurrently, in parallel, or both](https://jenkov.com/tutorials/java-concurrency/concurrency-vs-parallelism.html))? This [talk](https://www.youtube.com/watch?v=8aGhZQkoFbQ) attempts to explain, but in short, the Javascript application will pass task(s) to another runtime environment (in many cases the browser, through [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API), which supports multiple threads) to be executed.

I don't yet fully understand the process, but high-level it seems to look like this: a task is passed to the browser, after completion its return (generally, or maybe always, is a function to be executed in the Javascript runtime environment) is placed in the task queue, and when the stack is empty, the event loop will place the task's return on the stack, to be executed.

There are many libraries that provide non-blocking functions which call the aforementioned Web APIs to complete long-running tasks. A convention in traditional Javascript is to pass callbacks to these library functions. However, it should be known that a callback is not a prerequisite for these library functions to operate; an example is the [send method](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) from the fundamental XMLHTTPRequest class. Another point to note is that the callback pattern has largely been replaced with other patterns to be discussed later, so you can disregard callbacks if you'd like. Regardless, they were the convention, so I'll discuss them below: 

### Callbacks

The callback is a simple design pattern: parameterize a function that is called within another function. Below is an example:

```
function a(callbackb){
    console.log('a');
    callbackb();
}

function b(){
    console.log('b');
}

a(b);
```

While executing the above, function a is entered, 'a' is logged to the console, the callback function (function b) is entered, 'b' is logged to the console, function b is exited, function a is exited. To perform another callback within b, you'd write the below:

```
function a(callbackb, callbackc){
    console.log('a');
    callbackb(callbackc);
}

function b(callbackc){
    console.log('b');
    callbackc();
}

function c(){
    console.log('c');
}

a(b, c);
```

While executing the above, function a is entered, 'a' is logged to the console, function b is entered, 'b' is logged to the console, function c is entered, 'c' is logged to the console, function c is exited, function b is exited, function a is exited. As you can see, the number of parameters in the top-level function call scales 1:1 linearly with the number of callbacks. To avoid this, we can use anonymous functions. This is analogous to the first example in this section:

```
function a(callbackb){
    console.log('a');
    callbackb();
}

//a(function(){console.log('b');})
//traditional formatting:
a(function(){
    console.log('b');
})
```

While executing the above, function a is entered, 'a' is logged to the console, the anonymous function declared in function a input is entered, 'b' is logged to the console, the anonymous function declared in function a input is exited, function a is exited. Now, a replication of the second example in this section:

```
function a(callbackb){
    console.log('a');
    callbackb();
}

function b(callbackc){
    console.log('b');
    callbackc();
}

//a(function(){b(function(){console.log('c');})})
//traditional formatting:
a(function(){
    b(function(){
        console.log('c');
    })
})
```

As you can see, the number of parameters is now one. Some [disucssion](https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo) on the use of anonymous functions as callbacks. Personally, I find this convention difficult to read. That being said, the below is valid, returns the same result, and does not use callbacks:

```
function a(){
    console.log('a');
    b();
}

function b(){
    console.log('b');
    c();
}

function c(){
    console.log('c');
}

a();
```

Regardless, I will show an example below of an "asynchronous" function, setTimeout, that takes a callback. 

```
function a(){

    setTimeout(() => {
        console.log('a');
    }, 1000)

}

a();
```

setTimeout uses the [setTimeout Web API](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) that waits for the time specificed by the second function parameter (in milliseconds). After waiting is complete, the callback function is placed on the task queue, and it will be placed atop the execution stack when it is first in the queue and the execution stack is empty. It should be noted that setTimeout does not initiate the callback function when it itself is called.

The issue with nested callbacks is many people find them difficult to understand. This is known as [callback hell](http://callbackhell.com/). To provide an alternative to nested callbacks, the Promise class was introduced in 2015 with ES6.

### Promises

The Promise class allows you to chain asynchronous function calls (dependent on success or failure of the long-running task(s)) as opposed to nesting callbacks.

A Promise constructor takes a callback function, called an executor. The executor performs some long-running task, defined by the programmer. The executor takes in two other positional callback functions, generally named resolve and reject. These functions are defined by the Promise. The programmer calls the resolve function upon a successful result from the long-running task, otherwise, they call the reject function. The Promise constructor returns another Promise. Below is an example of the Javascript syntax:

```
a = function() {

    return new Promise((resolve, reject) => {

        //long-running task (generally asynchronous)
        setTimeout(() => {

            //randomly get true or false
            randomBoolean = Math.random() < 0.5;

            if (randomBoolean) {
                resolve(randomBoolean);
            } else {
                reject();
            }

        }, 5000)

    })
}
```

The Promise constructor returns another Promise; this allows you to chain functions that act on successive Promises, using the then and catch methods. The then method can take two callback functions, the first is executed if the resolve function is executed in the constructor, and the second is executed if the reject function is executed in the constructor. The initial Promise is executed synchronously (but its callback generally executes an asynchronous function anyway), and the chained then/catch methods all executed asynchronously.

In the above example it appears that the resolve and reject functions do not serve any purpose. However, when a then method is chained to the Promise, the parameter passed to resolve/reject function is available as the parameter to the associated function in the then method. This allows you to pass the promised information from the asynchronous function to the downstream functions. Below is an example:

```
promise = a();

secondPromise = promise.then((asyncReturn) => {console.log(asyncReturn); return asyncReturn;}, () => {console.log('failure')})
```

If the resolve function is executed, the randomBoolean is passed to the promise object callback, and I decided to call it asyncReturn. Something to note: if you want to pass an object from a then method callback, you return the object, and the next then method has access to it. See below:

```
thirdPromise = secondPromise.then((secondAsyncReturn) => {console.log(secondAsyncReturn)};)
```

### Observables

The observer pattern is the modern/"reactive" way of utilizing asynchronous functions, and it is provided by the RxJS library. An Observable is a class that takes a callback; the callback takes an object. When the Observable's subsribe method is executed, the Observable's callback is executed. Per the RxJS [documentation](https://rxjs.dev/guide/observable#subscribing-to-observables), "It is not a coincidence that observable.subscribe() and subscribe in new Observable(function subscribe(subscriber) {...}) have the same name. In the library, they are different, but for practical purposes you can consider them conceptually equal." The callback's object parameter, known as an observer (or subscriber), declares at least one of three functions: next, error, or complete. Below is an example:

```
import { Observable } from 'rxjs';

observer = {
    next(parameter){console.log(parameter)},
    error(parameter){console.log(parameter)},
    complete(){console.log('complete')}
}

observable$ = new Observable((observerObject) => {

    observerObject.next('a');
    
    setTimeout(() => {
        observerObject.complete();
    }, 0)

    observerObject.next('b');

})

observable$.subscribe(observer);
```

The $ postfix is a convention to identify an attribute as an Observable. The error or complete functions may be called only once; no further next executions will be completed after error or complete is executed. An important note: subscriptions to observables will not be destroyed unless they are programmed to do so. The subscribe method returns a Subscription object, which can be unsubscribed from (which performs the destruction). Taking from the above example:

```
subscription = observable$.subscribe(observer);
subscription.unsubscribe();
```

#### Operators

A (creational) [operator](https://rxjs.dev/guide/operators) is a function that creates an Observable instance, without explicitly calling ```new Observable```. RxJS provides many operators for specific Observable use cases. An example is the ```of``` operator, that passes each operator parameter to the observer function:

```
ofOperator = of(4, 5, 6)
ofOperator.subscribe((ofParameter) => {console.log(ofParameter)})
```

The pipe method allows you to chain operators. The fromEvent operater allows you to call an observer function when an event occurs in an element or component. The ViewChild decorator facilitates the observation through creating a Typescript attribute associated with the element/component. The map operator allows you to chain further operators prior to the observer function is called when the subscribe method is executed. An example using the fromEvent and map operators below:

```
<input type="number" #numberInput></input>
```

```
//{static: true} declares the element is available on init
@ViewChild('numberInput', {static: true}) numberInput: ElementRef;

fromEventOperator = fromEvent(this.numberInput.nativeElement, 'keyup')

fromEventOperator.pipe(map((evt: KeyboardEvent) => 2*evt.key), map((x) => 3*x)).subscribe((y) => {console.log(y)})
```

#### Asynchronous HTTP

##### XMLHttpRequest

Below is an example of implementing the XMLHttpRequest GET method within an observable:

```
requestObservable$ = new Observable((observer) => {

    request = new XMLHttpRequest();
    httpEventEmitter = request.eventEmitter;

    if (httpEventEmitter.status == 4 && httpEventEmitter.responseCode == 200) {
        observer.next(request.responseText)
        observer.complete()
    } else {
        observer.error(request.error)
    }

    request.open('GET', 'https://someURL.org/info')
    request.send()
});

observer = {
    next: (response) => {console.log(response)},
    error: (error) => {console.log(error)},
    complete: () => {console.log('http request complete')};
}

subscription = requestObservable$.subscribe(observer);
subscription.unsubscribe();
```

##### HttpClient GET

However, directly using the XMLHttpRequest class is not necessary, because Angular provides a well constructed service that makes HTTP request implementation simpler. The service is called HttpClient, and its request methods (GET, POST, PUT, DELETE) execute asynchronously. Generally, the service is injected in an http service that you write for your application, the HttpClient request method is used in a method within your http service, and then your http service/method is injected/executed in a component. Below is an example of a GET request implemented in a service related to items in a web shop.

The HttpClient request methods require a type to be declared for the data that is received. Therefore, an interface "model" (per model-view-controller) is established for non-primitive types in the item.ts file in the models folder:

```
interface Item = {
    id: number;
    name: string;
    price: number;
}
```

Now, the service is built:

```
import { HttpClient } from '@angular/core/http';
import { Item } from 'models/item';

@Injectable({
    providedIn: 'root'
}) 
export class itemsHttpService {

    url: string = 'https://webshop.com/items';

    constructor (private http: HttpClient){

    }

    getItems(url): Observable<Item[]> {
        return this.http.get<Item[]>(this.url);
    }

}
```

The HttpClient request methods do not directly return the data received; instead, they return an Observable that, when subscribed to, provides the observer with the data. So, the component that presents items to the customer injects the service and subscribes to the Observable:

```
<div>
    <div *ngFor="'let item of items'">
        {{ item.name }}
        {{ item.price }}
    </div>
</div>
```

```
import { Item } from 'models/item';

@Component({
    selector: 'items',
    templateUrl: 'items.html'
}) 
export class items {

    items: Item[];

    constructor(private httpService: itemsHttpService) {
        
    }

    ngOnInit() {
        this.getItems().subscribe((items) => {this.items = items});
    }

    getItems() {
        return this.httpService.getItems();
    }

}
```

##### HttpClient POST

You can also send information (called a payload) to an API endpoint; one method to do so is the POST request. Below, I add a POST method that requests to add an item to the imagined API's database. 

```
addItem(additionalItem: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.url, additionalItem);
}
```

```
additionalItem: Item = {
    id: 3;
    name: 'HAV map';
    price: 17
}

ngOnInit() {
    this.httpService.addItem(additionalItem).subscribe((additionalItem) => {console.log('${additionalItem} added successfully')});
}
```

TODO: HTTPClient error handling, HTTP Interceptors, async pipe





