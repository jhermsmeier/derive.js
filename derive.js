
if( typeof module !== 'undefined' ) {
  module.exports = derive
}

/**
 * Prototype inheriter capable of
 * nearly everything you ever wanted
 * @param  {Function} constructors..
 * @return {Object}   prototype
 */
function derive( target /*, supers.. */ ) {
  
  var ctors = Array.prototype.slice
    .call( arguments )
  
  var prototypes = Array.prototype.concat
    .apply( [], derive.tree( ctors ) )
    .reverse()
  
  return target.prototype = prototypes
    .reduce( function( current, next ) {
      return Object.create( current, derive.describe( next ) )
    })
  
}

/**
 * Retrieves an object's description
 * @param  {Object} object
 * @return {Object} description
 */
derive.describe = function( object ) {
  return Object.getOwnPropertyNames( object )
    .reduce( function( desc, key ) {
      desc[ key ] = Object.getOwnPropertyDescriptor( object, key )
      return desc
    }, Object.create( null ))
}

/**
 * Inherits from sctor to ctor
 * @param  {Function} ctor
 * @param  {Function} sctor
 * @return {Object} 
 */
derive.inherit = function inherit( ctor, sctor ) {
  ctor.prototype = Object.create(
    sctor.prototype,
    derive.describe( ctor.prototype )
  )
}

/**
 * Gets a prototype chain tree
 * @param  {Array} ctors
 * @return {Array} tree
 */
derive.tree = function( ctors ) {
  
  var i = 0, tree = []
  var chain, len = ctors.length
  
  for( i = 0; i < len; i++ ) {
    // Get the prototype chain of each constructor
    if( chain = derive.chain( ctors[i] ) ) {
      // Remove trailing Object.prototype,
      if( chain.length > 1 && i < len - 1 ) {
        // Only remove if it's not the only
        // prototype in the chain (=> an inheritance of Object)
        if( chain[ chain.length - 1 ] === Object.prototype ) {
          chain.length--
        }
      }
      // Append to prototype chain tree
      tree.push( chain )
    }
  }
  
  return tree
  
}

/**
 * Retrieves the prototype chain of an object
 * @param  {Object} object
 * @return {Array}  prototypes
 */
derive.chain = function( object ) {
  
  var prototypes = []
  var proto = Object.create( object.prototype )
  
  while( proto = Object.getPrototypeOf( proto ) ) {
    if( !~prototypes.indexOf( proto ) ) {
      prototypes.push( proto )
    }
  }
  
  return prototypes.length ?
    prototypes : undefined
  
}
