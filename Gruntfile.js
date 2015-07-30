module.exports = function(grunt) {

  notModules = [
        './**/*.js',
        '!./node_modules/**'
      ]

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      backbone: [
        './public/client/*.js'
      ],
      publicClient: {
        src: ['./public/client/**/*.js'],
        dest: './public/client/concatClient.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      backbone: {
        src: [
          './public/lib/backbone.js'
        ], 
        dest: 
          './public/lib/backbone.min.js'
      },
      handlebars: {
        src: [
          './public/lib/handlebars.js',
        ], 
        dest: 
          './public/lib/handlebars.min.js',
      },
      jquery: {
        src: [
          './public/lib/jquery.js',
        ], 
        dest: 
          './public/lib/jquery.min.js',
      },
      underscore: {
        src: [
          './public/lib/underscore.js'
        ], 
        dest: 
          './public/lib/underscore.min.js' 
      },
      publicClient: {
        src: ['./public/client/concatClient.js'],
        dest: './public/client/concatClient.min.js'
      }      

    },

    jshint: {
      files: notModules,
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
        public: {
          src: ['./public/style.css'],
          dest: './public.min.css'
        }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },

    clean: {
      clientMax: [
        './public/lib/backbone.js',
        './public/lib/handlebars.js',
        './public/lib/jquery.js',
        './public/lib/underscore.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'test',
    'squishAll'
  ]);

  grunt.registerTask('squishBackbone', [
    'concat:backbone',
    'uglify:backbone'
  ]);

  grunt.registerTask('squishAll', [
    'uglify',
    'clean'
  ]);


  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'build'
  ]);


};
