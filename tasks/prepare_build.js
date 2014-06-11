/*
 * grunt-prepare-build
 * https://github.com/WitteStier/grunt-prepare-build
 *
 * Copyright (c) 2014 WitteStier
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var version = require('./lib/version').init(grunt);
    var environment = require('./lib/environment').init(grunt);

    grunt.registerMultiTask('prepare_build', 'A Grunt plugin to prepare your build process.', function ()
    {
        var options = this.options({
            versionFile : 'VERSION.js',
            versionMatch : /(\d+\.\d+\.\d+)/g,
            increaseMinor : false,
            increasePatch : false,
            //
            env : true,
            envFile : 'VERSION.js',
            envMatch : /development/g,
            envName : 'production',
            //
            commit : false,
            commitMessage : 'New version',
            commitFiles : '.',
            //
            tag : false,
            tagName : 'V',
            tagMessage : 'New version'
        });

        var versionStr = version.increase(options);

        if (options.env) {
            // Update the environment string.
            environment.update(options);
        }

        if (options.commit) {
            // Commit last changes.
            grunt.config('gitcommit.prepare', {
                options : {
                    message : options.commitMessage + ' ' + versionStr,
                    ignoreEmpty : true
                },
                files : {
                    src : [
                        options.commitFiles
                    ]
                }
            });

            grunt.task.run('gitcommit:prepare');
        }

        if (options.tag) {
            // Create a tag.
            grunt.config('gittag.prepare', {
                options : {
                    tag : options.tagName + versionStr,
                    message : options.tagMessage + ' ' + versionStr
                }
            });

            grunt.task.run('gittag:prepare');
        }

        // End.
        return 0;
    });
};
