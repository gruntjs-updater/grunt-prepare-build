/*
 * grunt-prepare-build
 * https://github.com/WitteStier/grunt-prepare-build
 *
 * Copyright (c) 2014 WitteStier
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('prepare_build', 'The best Grunt plugin ever.', function () {
        var options = this.options({
            versionFile : 'version.php',
            versionMatch : /([0.9]*\.[0-9]*\.[0-9*])/g,
            increaseMinor : false,
            increasePatch : true,
            //
            commit : true,
            commitMessage : 'New version <%= versionStr%>',
            //
            tag : true,
            tagMessage : 'V<%= versionStr%>'
        });

        // Check if the version file exists.
        if (!grunt.file.isFile(options.versionFile)) {
            // End, Fatal error.
            grunt.fail.fatal('Version file `' +
                options.versionFile + '`not found.', 1);
            return 1;
        }

        // Read the version file.
        var content = grunt.file.read(options.versionFile),
            versionStr = content.match(options.versionMatch),
            versionArr;

        // Check if a version number match is found.
        if (!versionStr) {
            // End, Fatal error.
            grunt.fail.fatal('Version number not found in `' +
                options.versionFile + '`.', 1);
            return 1;
        }

        // Check if the version number is valid.
        versionArr = versionStr.toString().split('.');
        if (versionArr.length !== 3) {
            // End, Fatal error.
            grunt.fail.fatal('Version number is invalid `' +
                versionStr + '`.', 1);
            return 1;
        }

        // Increase the version number.
        if (options.increaseMinor) {
            versionArr[1] = ++versionArr[1];
        }

        if (options.increasePatch) {
            versionArr[2] = ++versionArr[2];
        }

        versionStr = versionArr.join('.').toString();
        grunt.config.set('versionStr', versionStr);

        // Replace version number in the version file.
        content = content.replace(options.versionMatch, versionStr);
        grunt.file.write(options.versionFile, content);
        
        grunt.log.ok('Version updated to ' + versionStr + '.');

        // Check if changes need to be commited.
        if (options.commit) {
            grunt.task.run('gitcommit:prepare');
            grunt.log.ok('Last changes commited.');
        }

        // Check if the last commit need to be tagged.
        if (options.tag) {
            grunt.task.run('gittag:prepare');
            grunt.log.ok('Last commit tagged.');
        }
    });

};
