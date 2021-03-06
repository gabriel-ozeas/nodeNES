var assert = require('assert');

var compiler = require('../lib/compiler.js');

exports.test_jmp_abs = function(test){
    var tokens = compiler.lexical('JMP $1234');
    test.equal(2 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    test.equal('$1234', tokens[1].value);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_ABSOLUTE', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x4c, 0x34, 0x12]);
    test.done();
};