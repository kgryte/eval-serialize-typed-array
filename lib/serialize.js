'use strict';

/**
* FUNCTION: serialize( arr )
*	Serializes a typed array for dynamic code evaluation.
*
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - typed array
* @returns {String} serialized value
*/
function serialize( arr ) {
	var len = arr.length,
		n = len - 1,
		str,
		i;

	str = '[';
	for ( i = 0; i < len; i++ ) {
		str += arr[ i ];
		if ( i < n ) {
			str += ',';
		}
	}
	str += ']';

	return 'new '+arr.constructor.name+'('+str+')';
} // end FUNCTION serialize()


// EXPORTS //

module.exports = serialize;
