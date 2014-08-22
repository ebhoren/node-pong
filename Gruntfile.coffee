module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

  grunt.initConfig

    # config
    config:
      server: 'http://localhost'
      port: 8000

    open:
      server:
        path: '<%= config.server %>:<%= config.port %>/'

    watch:
        grunt:
            files: ['Gruntfile.coffee']
            options:
              reload: true
        server:
            files: ['app.js']
            tasks: ['develop']
            options: 
                nospawn: true
        scripts:
            files: ['src/scripts/{,*/}*.js']
            tasks: ['browserify']
        styles: 
            files: ['src/styles/{,*/}*.less']
            tasks: ['less:dev']

    develop:
      server:
        file: 'app.js'
        nodeArgs: ['--debug']



    # scripts
    browserify:
        game:
            src: 'src/scripts/game.js'
            dest: 'public/scripts/game.js'



    # styles
    less:
        dev: 
            options: 
                ieCompat: false
            files: 
                'public/styles/app.css': 'src/styles/app.less'
        prod:
            options:
                ieCompat: false
                report: 'gzip'
            files: 
                'public/styles/app.css': 'src/styles/app.less'


  # start working
  grunt.registerTask 'work', ['develop', 'watch']
  grunt.registerTask 'build', ['browserify', 'less:prod']
  grunt.registerTask 'default', ['work']
