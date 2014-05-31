'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        prepare_build : {
            prepare : {
                options : {
                    versionFile : 'INVALID_VERSION.js',
                    versionMatch : /(\d+)/g,
                    increasePatch : true
                }
            }
        }
    });

    grunt.loadTasks('../../tasks');

    grunt.registerTask('default', ['prepare_build']);
};