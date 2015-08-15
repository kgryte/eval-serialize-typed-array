/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	serialize = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'serialize', function tests() {

	it( 'should export a function', function test() {
		expect( serialize ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a typed array', function test() {
		var values = [
			'5',
			5,
			null,
			true,
			NaN,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				serialize( value );
			};
		}
	});

	it( 'should serialize a typed array', function test() {
		/* jshint evil:true */
		var arr,
			out;

		arr = new Float32Array( 4 );
		out = serialize( arr );

		assert.strictEqual( out, 'new Float32Array([0,0,0,0])' );
		assert.deepEqual( arr, eval( out ) );
		assert.strictEqual( eval( out ).constructor.name, 'Float32Array' );

		arr = new Uint8ClampedArray( [1,2,3,4,5] );
		out = serialize( arr );

		assert.strictEqual( out, 'new Uint8ClampedArray([1,2,3,4,5])' );
		assert.deepEqual( arr, eval( out ) );
		assert.strictEqual( eval( out ).constructor.name, 'Uint8ClampedArray' );
	});

});
