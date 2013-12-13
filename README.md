derive [![NPM version](https://badge.fury.io/js/derive.png)](https://npmjs.org/derive)
======

A utility to either *derive* from **multiple** super-constructors,
or *inherit* from **one** super-constructor.

### Note

You shouldn't rely on getters or setters with side effects
(like the Array's `length` property) when deriving from native types.
(You probably shouldn't derive or inherit from native types anyway)

Also, the `instanceof` operator will not work as expected,
because it checks if a prototype in the chain is equal to
the prototype of the object it's being checked against - 
which means it will return `false` for everything you've derived from.

That's why it's called `derive`, not `inherit`.

**Have a look at the (currently primitive) tests to get a rough overview
of what works, and what does not.**



## Install with [npm](https://npmjs.org)

```sh
$ npm install derive
```



## Install with [bower](http://twitter.github.com/bower/)

```shell
$ bower install derive
```



### Usage

**Deriving** from multiple super-constructors:

```javascript
// Your constructor function
function Example() {
  // Don't forget to call the
  // super's constructors
  EventEmitter.call( this )
  Array.call( this )
}

// Your prototype
Example.prototype = {
  constructor: Example,
  get bla() { return 1 },
  method: function() {
    // ...
  }
}

derive( Example, EventEmitter, Array )
```

**Inheriting** from a super-constructor:

```javascript
function Example() {
  Emitter.call( this )
}

Example.prototype = derive.inherit( Emitter, {
  constructor: Example,
  get bla() { return 1 },
  method: function() {
    // ...
  }
})
```