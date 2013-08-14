var assert = require( 'assert' )
var derive = require( '../' )

function SuperSuper() {}
SuperSuper.prototype = {
  constructor: SuperSuper,
  get ultimateBeef() {
    return 0xBEEF * 0xC0FFEE
  }
}
SuperSuper.prototype.__defineGetter__(
  'doubleBeef', function() {
    return 0xBEEF * 2
  }
)

function Super() {
  this.__defineGetter__(
    'definedBeef', function() {
      return 0xBEEF
    }
  )
}

function Ctor() {
  Super.call( this )
  SuperSuper.call( this )
}

Ctor.prototype = {
  constructor: Ctor,
  get beef() {
    return 0xDEADBEEF
  }
}

derive( Ctor, Super, SuperSuper )

var instance = new Ctor()

describe( 'getters & setters', function() {
  
  it( 'should be able to inherit getters', function() {
    assert.strictEqual( instance.beef, 0xDEADBEEF )
    assert.strictEqual( instance.definedBeef, 0xBEEF )
    assert.strictEqual( instance.doubleBeef, 0xBEEF * 2 )
    assert.strictEqual( instance.ultimateBeef, 0xBEEF * 0xC0FFEE )
  })
  
})
