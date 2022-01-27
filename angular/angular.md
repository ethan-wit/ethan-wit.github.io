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

This will create a new directory with three files: Typescript, HTML, and CSS. All three files will be specific to the Component.


## Binding


### Property Binding

Official documentation can be found [here](https://angular.io/guide/property-binding). Angular property binding allows one to assign an HTML object property to a value in a Typescript file. HTML objects are nodes in the [DOM](https://web.stanford.edu/class/cs98si/slides/the-document-object-model.html) tree. [Here](https://www.cs.swarthmore.edu/courses/CS35/S20/labs/08/) are some examples what I mean by tree. An example of an HTML object is an element, such as span or div. These HTML elements have properties, in the same way that Javascript objects have properties (TODO: insert link to typescript.md). Examples of these properties being id, lastChild, and attributes; a sample list can be found [here](https://www.w3schools.com/jsref/dom_obj_all.asp). Sime Vidas explains how attributes and properties may or may not represent the same information in this [stackoverflow answer](https://stackoverflow.com/questions/6003819/what-is-the-difference-between-properties-and-attributes-in-html). Below is an example of an Angular property binding; the first line is the HTML template and the second is the associated Typescript:

```
<img [src]="imageURL">
```
```
imageURL = "../assets/image.png";
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

## Routing

The steps needed to route throughout the application is dependent on the application directory structure. The following is for the example [here](https://angular.io/start). One needs x items to perform routing for a new component: a child Component to be routed to, a link within the parent Component, and a URL-Component declaration in the app module Typescript file. 


## Directives

ngFor
ngIf


