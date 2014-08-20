module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

  grunt.initConfig

    # config
    config:
      server: 'http://crosby.local'
      port: 8017


    # work
    clean: 
        dist: '<%= config.dist %>' 
        tmp: '<%= config.tmp %>'
        front: '<%= config.views %>/front.prod.php'
        prelaunch: '<%= config.views %>/prelaunch.prod.php'

    open:
      server:
        path: '<%= config.server %>:<%= config.port %>/'

    watch:
        grunt:
            files: ['Gruntfile.coffee']
            options:
              reload: true
        scripts:
            files: ['<%= config.app %>/scripts/{,*/}*.js']
            tasks: ['browserify']



  # start working environment
  grunt.registerTask 'work', ['build', 'open:server', 'watch']

  # prep images assets (responsive images, spritesheets)
  grunt.registerTask 'images', ['responsive_images', 'sprite', 'copy:gifLoader']

  # prep site for production (minify js/css) 
  grunt.registerTask 'build', ['clean', 'images', 'browserify', 'less:dev']
  grunt.registerTask 'release', ['build', 'copy:view', 'pngmin', 'imagemin', 'less:prod', 'useminPrepare', 'concat', 'copy:jsLibs', 'uglify', 'cssmin', 'rev', 'usemin', 'clean:tmp']
  
  # start working
  grunt.registerTask 'default', ['release']
