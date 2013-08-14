var assert = require( 'assert' )
var derive = require( '../' )

function Super() {}
  
function Ctor() { Super.call( this ) }
derive( Ctor, Super )

var instance = new Ctor()

describe( 'instanceof', function() {
  
  it( 'should be instance of Ctor', function() {
    assert.ok( instance instanceof Ctor )
  })
  
  it( 'should be instance of Super', function() {
    assert.ok( instance instanceof Super )
  })
  
})
