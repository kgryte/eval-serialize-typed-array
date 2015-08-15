Typed Array Serialization
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Serializes a [typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) for dynamic code evaluation.


## Installation

``` bash
$ npm install eval-serialize-typed-array
```

## Usage

``` javascript
var serialize = require( 'eval-serialize-typed-array' );
```

#### serialize( value )

Serializes a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) for dynamic code evaluation.

``` javascript
var deepEqual = require( 'deep-equal' );

var arr1 = new Int8Array( 4 );

var str = serialize( arr1 );
// returns 'new Int8Array([0,0,0,0])'

var arr2 = eval( str );
// returns Int8Array( [0,0,0,0] )

var bool = deepEqual( arr1, arr2 );
// returns true
```


#### serialize.raw( arr )

Serializes a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) without performing type checking.

``` javascript
try {
	// throws during input argument validation...
	serialize( null );
} catch ( err ) {
	console.error( err );
}

// To bypass validation...
var str = serialize.raw( new Float64Array( [1,2,3,4] ) );
// returns 'new Float64Array([1,2,3,4])';
```


## Examples

``` javascript
var serialize = require( 'eval-serialize-typed-array' );

/**
* Returns a function to create a filled array.
*/
function create( arr ) {
	var f = '';
	f += 'return function fill( len ) {';
	f += 'var arr = new Array( len );';
	f += 'for ( var i = 0; i < len; i++ ) {';
	f += 'arr[ i ] = ' + serialize( arr ) + ';';
	f += '}';
	f += 'return arr;';
	f += '}';
	return ( new Function( f ) )();
}

var fill = create( new Float32Array( 20 ) );

console.log( fill( 10 ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/eval-serialize-typed-array.svg
[npm-url]: https://npmjs.org/package/eval-serialize-typed-array

[travis-image]: http://img.shields.io/travis/kgryte/eval-serialize-typed-array/master.svg
[travis-url]: https://travis-ci.org/kgryte/eval-serialize-typed-array

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/eval-serialize-typed-array/master.svg
[codecov-url]: https://codecov.io/github/kgryte/eval-serialize-typed-array?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/eval-serialize-typed-array.svg
[dependencies-url]: https://david-dm.org/kgryte/eval-serialize-typed-array

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/eval-serialize-typed-array.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/eval-serialize-typed-array

[github-issues-image]: http://img.shields.io/github/issues/kgryte/eval-serialize-typed-array.svg
[github-issues-url]: https://github.com/kgryte/eval-serialize-typed-array/issues
