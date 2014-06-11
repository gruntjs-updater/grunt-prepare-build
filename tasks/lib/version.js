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
    exports.increase = function (options)
    {
        options = options || {};

        grunt.log.write('Update version number...');

        // Check if the version file exists.
        if (!grunt.file.isFile(options.versionFile)) {
            // End, Fatal error.
            grunt.fail.fatal('Version file `' +
                options.versionFile + '` not found.', 1);
            return 1;
        }

        // Read the version file.
        var content = grunt.file.read(options.versionFile),
            versionStr = content.match(options.versionMatch),
            versionArr,
            minor,
            patch;

        // Check if a version number match is found.
        if (!versionStr) {
            // End, Fatal error.
            grunt.fail.fatal('Version number not found in `' +
                options.versionFile + '`.', 1);
            return 1;
        }

        // Check if the version number is valid.
        versionArr = versionStr.toString().split('.');
        if (versionArr.length < 2) {
            // End, Fatal error.
            grunt.fail.fatal('Version number is invalid `' +
                versionStr + '` use a format like `0.1.2`.', 1);
            return 1;
        }

        // Get the version minor and patch numbers.
        patch = parseInt(versionArr.pop());
        minor = parseInt(versionArr.pop());

        // Increase the version number.
        if (options.increaseMinor) {
            minor = ++minor;
        }

        if (options.increasePatch) {
            patch = ++patch;
        }

        // Update the version number.
        versionArr.push(minor, patch);
        versionStr = versionArr.join('.').toString();
        grunt.config.set('versionStr', versionStr);

        // Replace version number in the version file.
        content = content.replace(options.versionMatch, versionStr);
        grunt.file.write(options.versionFile, content);

        grunt.log.write('OK. Updated to ' + versionStr + '.');

        // End.
        return 0;
    };

    // End.
    return exports;
};