'use strict';

// MODULES //

var isTypedArray = require( 'validate.io-typed-array' ),
	toStr = require( './serialize.js' );


// SERIALIZE //

/**
* FUNCTION: serialize( value )
*	Serializes a typed array for dynamic code evaluation.
*
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} value - typed array
* @returns {String} serialized value
*/
function serialize( value ) {
	if ( !isTypedArray( value ) ) {
		throw new TypeError( 'invalid input value. Must provide a typed array. Value: `' + value + '`.' );
	}
	return toStr( value );
} // end FUNCTION serialize()


// EXPORTS //

module.exports = serialize;
module.exports.raw = toStr;
