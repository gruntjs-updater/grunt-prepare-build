/*
 * grunt-prepare-build
 * https://github.com/WitteStier/grunt-prepare-build
 *
 * Copyright (c) 2014 WitteStier
 * Licensed under the MIT license.
 */

'use strict';

exports.init = function (grunt)
{
    exports.update = function (options)
    {
        options = options || {};

        grunt.log.write('Update environment...');

        // Check if the environment file exists.
        if (!grunt.file.isFile(options.envFile)) {
            // End, Fatal error.
            grunt.fail.fatal('Environment file `' +
                options.envFile + '` not found.', 1);
            return 1;
        }

        // Read the environment file.
        var content = grunt.file.read(options.envFile),
            environmentStr = content.match(options.envMatch);

        // Check if a environment match is found.
        if (!environmentStr) {
            // End, Fatal error.
            grunt.fail.fatal('Environment not found in `' +
                options.envFile + '`.', 1);
            return 1;
        }
        
        // Replace environment in the environment file.
        content = content.replace(options.envMatch, options.envName);
        grunt.file.write(options.envFile, content);

        grunt.log.writeln('OK. Updated to ' + environmentStr + '.');

        // End.
        return 0;
    };

    // End.
    return exports;
};