inherit.js
==========

### Usage

```javascript
// Your constructor function
function Example() {
  
  // Don't forget to call the
  // super's constructors
  EventEmitter.call( this )
  Array.call( this )
  
}
```

```javascript
// Your prototype
Example.prototype = {
  get bla() { return 1 },
  method: function() {
    // ...
  }
}
```

```javascript
// Inherit from what-the-fuck-ever you want
// NOTE: With this inheriter function, even
// the 'length' property keeps working when
// inheriting from the Array constructor...
inherit( Example, EventEmitter, Array )
```
