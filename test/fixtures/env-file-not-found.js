'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        prepare_build : {
            prepare : {
                options : {
                    version : false,
                    env : true,
                    envFile : 'foo',
                    envMatch : /development/g,
                    envName : 'testing'
                }
            }
        }
    });

    grunt.loadTasks('../../tasks');

    grunt.registerTask('default', [
        'prepare_build'
    ]);
};