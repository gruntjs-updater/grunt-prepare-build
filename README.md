# grunt-prepare-build

> A Grunt plugin to prepare your build process.
  Update the version number, Commit the last changes and create a GIT tag.

[![Build Status](https://travis-ci.org/WitteStier/grunt-prepare-build.svg?branch=master)](https://travis-ci.org/WitteStier/grunt-prepare-build)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-prepare-build --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-prepare-build');
```

## The "prepare_build" task

### Overview
In your project's Gruntfile, add a section named `prepare_build` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  prepare_build: {
    options: {
      // Task-specific options go here.
    }
  }
});
```

### Options

#### options.versionFile
Type: `String`  
Default value: `VERSION.js`

Name of the file where the version number can be found.

#### options.versionMatch
Type: `RegExp`  
Default value: `/(\d+\.\d+\.\d+)/g`

Regular expression to isolate the version number string.
_(Notice the global flag)_


#### options.increaseMinor
Type: `Boolean`  
Default value: `false`

When `true` the version number, minor section, will be increased by 1.


#### options.increasePatch
Type: `Boolean`  
Default value: `false`

When `true` the version number, patch section, will be increased by 1.


#### options.commit
Type: `Boolean`  
Default value: `false`

When `true` all changes will be committed using GIT.  
_(Notice: When `false` the updated version number will not be committed.)_


#### options.commitMessage
Type: `String`  
Default value: `New version`

GIT commit message.  
_(Notice: The version number will added to the end of the commitMessage.)_

#### options.commitFiles
Type: `String`  
Default value: `.`

GIT commit files.

#### options.tag
Type: `Boolean`  
Default value: `false`

When `true` a GIT tag will be created.

#### options.tagName
Type: `String`  
Default value: `V`

GIT tag name.  
_(Notice: The version number will added to the end of the tagName.)_

#### options.tagMessage
Type: `String`  
Default value: `New version`

Git tag message.  
_(Notice: The version number will added to the end of the tagMessage.)_

### Usage Examples

```js
grunt.initConfig({
  prepare_build: {
    build : {
      options: {
        versionFile: 'public/app.js',
        versionMatch: /(\d+\.\d+\.\d+)/,
        increaseMinor: true,
        commit: true,
        commitMessage: 'New version',
        commitFiles: '.'
        tag: true,
        tagName: 'V',
        tagMessage: 'New release'
      }
    },
    update : {
      options: {
        versionFile: 'public/app.js',
        versionMatch: /(\d+\.\d+\.\d+)/,
        increasePatch: true,
        commit: true,
        commitMessage: 'Small update',
        commitFiles: '.'
        tag: true,
        tagName: 'V',
        tagMessage: 'Small fixes'
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-06-07   v0.1.3   Add commitFiles option.
* 2014-06-07   v0.1.2   Dont require gitcommit and gittag configuration in the Gruntfile anymore.
* 2014-06-01   v0.1.1   Add Travis ci and some small fixes.
