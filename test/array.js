var assert = require( 'assert' )
var derive = require( '../' )

function Ctor() { Array.call( this ) }
derive( Ctor, Array )

var instance = new Ctor()

describe( 'inheritance from Array', function() {
  
  it( 'should update the `length` property', function() {
    
    assert.strictEqual( instance.length, 0 )
    
    instance.push( 'item' )
    assert.strictEqual( instance.length, 1 )
    assert.strictEqual( instance[0], 'item' )
    
  })
  
  it( 'should reduce/expand array size when `length` is set', function() {
    
    instance.push( 'item2' )
    assert.strictEqual( instance.length, 2 )
    
    instance.length = 1
    assert.strictEqual( instance.length, 1 )
    assert.strictEqual( instance[1], void 0 )
    
    instance.push( 'item3' )
    assert.strictEqual( instance.length, 2 )
    assert.strictEqual( instance[1], 'item3' )
    
  })
  
  it( 'instance.slice() should be instance of Ctor', function() {
    
    var sliced = instance.slice()
    assert.ok( sliced instanceof Ctor )
    
  })
  
})
