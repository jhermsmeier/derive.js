var assert = require( 'assert' )
var derive = require( '../' )

function SuperSuper() { this.superSuper = true }
SuperSuper.prototype.iAmSuperSuper = function() {
  return 'You got it'
}

function Super() { this.super = true }
Super.prototype.iAmSuper = function() {
  return 'Yes indeed'
}

function Ctor() {
  
  this.super = false
  this.ctor = true
  
  Super.call( this )
  SuperSuper.call( this )
  
}

Ctor.prototype.iAmNotSuper = function() {
  return 'Sadly'
}

derive( Ctor, Super, SuperSuper )

var instance = new Ctor()

describe( 'multiple inheritance', function() {
  
  it( 'should be able to inherit from multiple super constructors', function() {
    
    assert.equal( instance.iAmNotSuper(), 'Sadly' )
    assert.equal( instance.iAmSuper(), 'Yes indeed' )
    assert.equal( instance.iAmSuperSuper(), 'You got it' )
    
    assert.ok( instance.ctor )
    assert.ok( instance.super )
    assert.ok( instance.superSuper )
    
  })
  
})
