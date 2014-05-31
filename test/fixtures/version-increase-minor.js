'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        prepare_build : {
            prepare : {
                options : {
                    versionFile : '../../tmp/test/fixtures/VERSION_MINOR.js',
                    increaseMinor : true
                }
            }
        }
    });

    grunt.loadTasks('../../tasks');

    grunt.registerTask('default', ['prepare_build']);
};