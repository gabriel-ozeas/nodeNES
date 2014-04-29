var hexAssert = require('../lib/tests/hex-assert.js');
var colors = require('colors');

exports.should_not_throw_excep_when_eq = function(test) {
	hexAssert.equals([0x1A], [0x1A]);
	test.done();
};
exports.should_throw_excep_when_diff = function(test) {
	var exception = null;

	try {
		hexAssert.equals([0x1A, 0x1B], [0x1A, 0x1A]);
		test.fail('Should throw HexaAssertionException');
	} catch (e) {
		exception = e;
	}

	test.equals(1, exception.stack.toString().match(/Expected/ig).length);
	test.equals(1, exception.stack.toString().match(/Actual/ig).length);
	test.ok(exception.stack.toString().indexOf('1A' + '1B'.green) !== -1);
	test.ok(exception.stack.toString().indexOf('1A' + '1A'.red) !== -1);

	test.done();
};

exports.should_show_custom_message = function(test) {
	var exception = null;

	try {
		hexAssert.equals([0x1A], [0x1B], 'Custom Assertion Message');
		test.fail('Should throw HexaAssertionException');
	} catch (e) {
		exception = e;
	}

	test.equals(1, exception.stack.toString().match(/Expected/ig).length);
	test.equals(1, exception.stack.toString().match(/Actual/ig).length);
	test.equals(1, exception.stack.toString().match(/Custom Assertion Message/ig).length);

	test.done();
};

exports.should_throw_excep_when_some_diff = function(test) {
	var exception = null;
	try {
		hexAssert.equals(
			[0x78, 0xd8, 0xa2, 0x40, 0x8e, 0x17, 0x40, 0xa2, 0xff, 0x9a, 0xe8, 0x8e, 0x00, 0x20, 0x8e, 0x01,
			0x78, 0xd8, 0xa2, 0x40, 0x8e, 0x17, 0x40, 0xa2, 0xff, 0x9a, 0xe8, 0x8e, 0x00, 0x20, 0x8e, 0x01,
			0x78, 0xd8, 0xa2, 0x40, 0x8e, 0x17, 0x40, 0xa2, 0xff, 0x9a, 0xe8, 0x8e, 0x00, 0x20, 0x8e, 0x01],
			
			[0x78, 0xd8, 0xa2, 0x40, 0x8e, 0x1f, 0x40, 0xaa, 0xff, 0x9a, 0xe8, 0x8c, 0x00, 0x20, 0x1e, 0x01,
			0x78, 0xd8, 0xa2, 0x40, 0x8e, 0x17, 0x40, 0xaa, 0xff, 0x9a, 0xe8, 0x8c, 0x00, 0x20, 0x8e, 0x01,
			0xd8, 0xa2, 0x40, 0x8e, 0x17, 0x40, 0xa2, 0xff, 0x9a, 0xe8, 0x8e, 0x00, 0x20, 0x8e, 0x01]);

		test.fail('Should throw HexaAssertionException');
	} catch (e) {
		exception = e;
	}
	test.equals(3, exception.stack.toString().match(/Expected/ig).length);
	test.equals(3, exception.stack.toString().match(/Actual/ig).length);

	test.done();	
};