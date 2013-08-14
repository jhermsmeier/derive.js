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
