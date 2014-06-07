/*
 * grunt-prepare-build
 * https://github.com/WitteStier/grunt-prepare-build
 *
 * Copyright (c) 2014 WitteStier
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    
    /**
     * Copy test fixtures.
     */
    copy : {
        test : {
            files : [
                {
                    expand : true,
                    src : [
                        'test/fixtures/VERSION_*.js'
                    ],
                    dest : 'tmp',
                    cwd : '.'
                }
            ]
        }
    },

    // Configuration to be run (and then tested).
    prepare_build: {
        prepare : {
            options : {
                versionFile : 'VERSION',
                versionMatch : /(\d+\.\d+\.\d+)/g,
                increasePatch : true,

                commit : true,
                commitMessage : 'New version',

                tag : false,
                tagName : 'V',
                tagMessage : 'New version'
            }
        }
    },
    
    // Commit changes.
//    gitcommit : {
//        prepare : {
//            options : {
//                message : '<%= prepare_build.prepare.options.commitMessage %>',
//                ignoreEmpty: true
//            },
//            files : {
//                src: ['private']
//            }
//        }
//    },
    
    // Tag last commit.
//    gittag : {
//        prepare : {
//            options : {
//                tag : '<%= prepare_build.prepare.options.tagName %>',
//                message : '<%= prepare_build.prepare.options.tagMessage %>'
//            }
//        }
//    },

    // Unit tests.
    nodeunit: {
        options: {
            reporter: 'verbose'
        },
        tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'copy', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['prepare_build']);

};
