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

    // Configuration to be run (and then tested).
    prepare_build: {
        prepare : {
            options : {
                versionFile : 'private/version.php',
                versionMatch : /([0.9]*\.[0-9]*\.[0-9*])/g,
                increasePatch : true,

                commit : true,
                commitMessage : 'New version <%= versionStr %>',

                tag : true,
                tagName : 'V<%= versionStr %>',
                tagMessage : 'New version <%= versionStr %>'
            }
        }
    },
    
    // Commit changes.
    gitcommit : {
        prepare : {
            options : {
                message : '<%= prepare_build.prepare.options.commitMessage %>'
            },
            files : {
                src: ['private']
            }
        }
    },
    
    // Tag last commit.
    gittag : {
        prepare : {
            options : {
                tag : '<%= prepare_build.prepare.options.tagName %>',
                message : '<%= prepare_build.prepare.options.tagMessage %>'
            }
        }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'prepare_build', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['prepare_build']);

};
