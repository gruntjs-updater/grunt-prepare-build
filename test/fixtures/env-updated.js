'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        prepare_build : {
            prepare : {
                options : {
                    version : false,
                    env : true,
                    envFile : '../../tmp/test/fixtures/ENV_DEVELOPMENT.js',
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