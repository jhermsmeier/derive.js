derive [![NPM version](https://badge.fury.io/js/derive.png)](https://npmjs.org/derive)
======

Yes, I know. Many have done or tried it before. 
Still, this is my take on it, and it works for me. Consider it an experiment.
Just in case you should decide to use it, ping me on twitter. 
I'm [@jhermsmeier](//twitter.com/jhermsmeier).

### Note

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
derive( Example, EventEmitter, Array )
```


### Source

```javascript
/**
 * Prototype inheriter capable of
 * nearly everything you ever wanted
 * @param  {Function} constructors..
 * @return {Object}   prototype
 */
function derive( ctor /*, supers.. */ ){
  
  var supers = [].slice.call( arguments )
  
  supers.push( Object.prototype )
  supers.reverse()
  
  return ctor.prototype = supers.reduce( function( proto, ctor ) {
    return Object.create( proto,
      Object.getOwnPropertyNames( ctor.prototype )
        .reduce( function( desc, key ) {
            desc[ key ] = Object.getOwnPropertyDescriptor( ctor.prototype, key )
            return desc
          }, Object.create( null )
        )
    )
  })
  
}
```
