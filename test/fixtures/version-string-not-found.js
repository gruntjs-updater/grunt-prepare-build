'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        prepare_build : {
            prepare : {
                options : {
                    versionFile : 'NO_VERSION.js',
                    increasePatch : true
                }
            }
        }
    });

    grunt.loadTasks('../../tasks');

    grunt.registerTask('default', ['prepare_build']);
};