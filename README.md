inherit.js
==========

Yes, I know. Many have done or tried it before. 
Still, this is make take on it, and it works for me.
Just in case you should decide to use it, ping me on twitter. 
I'm [@jhermsmeier](//twitter.com/jhermsmeier).

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


### Source

```javascript
/**
 * Prototype inheriter capable of
 * nearly everything you ever wanted
 * @param  {Function} constructors..
 * @return {Object}   prototype
 */
function inherit( ctor /*, supers.. */ ){
  
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
