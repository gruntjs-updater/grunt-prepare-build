'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit
 
 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.prepare_build = {
    setUp : function (done)
    {
        // setup here if necessary
        done();

        // End.
    },
    versionFileNotFound : function (test)
    {
        test.expect(2);

        grunt.util.spawn({
            grunt : true,
            args : [
                '--gruntfile',
                'test/fixtures/version-file-not-found.js'
            ]
        },
        function (error, output, code)
        {
            var i = output.stdout.indexOf('Fatal error: Version file `foo` not found.');

            test.strictEqual(code, 1, 'Grunt should fail.');
            test.notStrictEqual(-1, i, 'Should output file not found error.');

            test.done();

            // End.
        });

        // End.
    },
    versionStringNotFount : function (test)
    {
        test.expect(2);

        grunt.util.spawn({
            grunt : true,
            args : [
                '--gruntfile',
                'test/fixtures/version-string-not-found.js'
            ]
        },
        function (error, output, code)
        {
            var i = output.stdout.indexOf('Fatal error: Version number not found in `NO_VERSION.js`.');

            test.strictEqual(code, 1, 'Grunt should fail.');
            test.notStrictEqual(-1, i, 'Should output file not found error.');

            test.done();

            // End.
        });

        // End.
    },
    versionStringNotValid : function (test)
    {
        test.expect(2);

        grunt.util.spawn({
            grunt : true,
            args : [
                '--gruntfile',
                'test/fixtures/version-string-invalid.js'
            ]
        },
        function (error, output, code)
        {
            var i = output.stdout.indexOf('Fatal error: Version number is invalid `1` use a format like `0.1.2`.');

            test.strictEqual(code, 1, 'Grunt should fail.');
            test.notStrictEqual(-1, i, 'Should output file not found error.');

            test.done();

            // End.
        });

        // End.
    },
    envFileNotFound : function (test)
    {
        test.expect(2);

        grunt.util.spawn({
            grunt : true,
            args : [
                '--gruntfile',
                'test/fixtures/env-file-not-found.js'
            ]
        },
        function (error, output, code)
        {
            var i = output.stdout.indexOf('Fatal error: Environment file `foo` not found.');

            test.strictEqual(code, 1, 'Grunt should fail.');
            test.notStrictEqual(-1, i, 'Should output file not found error.');

            test.done();

            // End.
        });

        // End.
    },
    envStringNotFound : function (test)
    {
        test.expect(2);

        grunt.util.spawn({
            grunt : true,
            args : [
                '--gruntfile',
                'test/fixtures/env-string-not-found.js'
            ]
        },
        function (error, output, code)
        {
            var i = output.stdout.indexOf('Fatal error: Environment not found in `NO_ENV.js`.');

            test.strictEqual(code, 1, 'Grunt should fail.');
            test.notStrictEqual(-1, i, 'Should output file not found error.');

            test.done();

            // End.
        });

        // End.
    },
    updateEnvString : function (test)
    {
        test.expect(1);

        grunt.util.spawn({
            grunt : true,
            args : [
                '--gruntfile',
                'test/fixtures/env-updated.js'
            ]
        },
        function (error, output, code)
        {
            var i = grunt.file.read('tmp/test/fixtures/ENV_DEVELOPMENT.js').indexOf('testing');

            test.notStrictEqual(-1, i, 'Should update the environment value.');

            test.done();

            // End.
        });

        // End.
    },
    increaseMinor : function (test)
    {
        test.expect(1);

        grunt.util.spawn({
            grunt : true,
            args : [
                '--gruntfile',
                'test/fixtures/version-increase-minor.js'
            ]
        },
        function (error, output, code)
        {
            var i = grunt.file.read('tmp/test/fixtures/VERSION_MINOR.js').indexOf('0.1.1');

            test.notStrictEqual(-1, i, 'Should increase the version minor value.');

            test.done();

            // End.
        });

        // End.
    },
    increasePatch : function (test)
    {
        test.expect(1);

        grunt.util.spawn({
            grunt : true,
            args : [
                '--gruntfile',
                'test/fixtures/version-increase-patch.js'
            ]
        },
        function (error, output, code)
        {
            var i = grunt.file.read('tmp/test/fixtures/VERSION_PATCH.js').indexOf('0.0.2');

            test.notStrictEqual(-1, i, 'Should increase the version patch value.');

            test.done();

            // End.
        });

        // End.
    }
};
