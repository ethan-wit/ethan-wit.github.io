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

@Input allows a parent Component to pass data to a child Component. There are x number of actions you need to achieve this. You need an object in the parent Component, an object that has the same structure as the parent class object with the @Input decorator in the child Component, and a binding of the values in the parent Component HTML template (guide [here](https://angular.io/guide/property-binding#bind-values-between-components)). For example, below is the parent Component HTML template:

```
<div>
<p>Parent Component div</p>
<app-child-component [parentData]='dog'></app-child-component>
</div>
```

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

## Services

A Service allows one to persist information across Components and provide methods for each of the Components to use. Essentially, a Service lets you implement logic and save data, without being attached to an HTML template.

- import service into Components using it
- Create Service methods to be called, properties that can store Component data

## Directives

There are three types of directives in the Angular framework: Components, structural directives, and attribute directives.

### Structural Directives

Angular has multiple built-in structural directives that allow a developer to include or exclude elements in the DOM based on some logic. I'll highlight the two most popular below: ngIf and ngFor.

#### ngIf

ngIf displays an element if the condition evaluates to true. ngIf can be evaluated against any valid Typescript expression. The example below would include the element. Someting to note -- this does not only hide the element, like the HTML hidden attribute, but actually includes or exclude it.
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
determinIfInclude: boolean = false; 
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

ngFor can be used with ngIf to include elements in the data structure, with additional logic; see example below.

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
    {{val | add-num:5:10}}
</div>
```

Pipes are pure by default, although they can also be set to impure, as shown below:

```
@Pipe({
    name: 'add-sub-num'
    pure: false
})
```

A pure pipe is rerendered only when Angular detects a change to the value or parameters of the pipe. This excludes when the value is an object and one of its properties are changed. However, it would rerender if the value is assigned to a new object. It also excludes adding a new item to an Array that is the value. Impure pipes rerender upon a change to any state change in the Angular application, which forces more computation on the machine running the application. One other note of importance, is that pure pipes can be reused, while each time an impure pipe is applied, a new pipe instance will be created. 

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

Angular provides another entity to more clearly separate the components of the application: the module. Each Angular application is configured with a root module, app.module.ts, with the associated app directory in src. Feature modules are prevalent in larger Angular applications, which represent a collection of Angular artifacts (e.g. pipes, directives, componenets) aligned to a domain or workflow, such as inventory, cart, and checkout in a web store. You create another module, like a feature module (given its own directory with associated Typescript file within app), by executing the command below:

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







