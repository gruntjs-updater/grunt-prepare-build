'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        prepare_build : {
            prepare : {
                options : {
                    versionFile : 'foo',
                    increasePatch : true
                }
            }
        }
    });

    grunt.loadTasks('../../tasks');

    grunt.registerTask('default', ['prepare_build']);
};