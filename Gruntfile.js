module.exports = function(grunt) {

  grunt.initConfig({
    cachebreaker: {
        dev: {
            options: {
                match: ['.js', '.css'],
            },
            files: {
                src: ['index.html']
            }
        }
    }
  });

 // Load the plugins
  grunt.loadNpmTasks('grunt-cache-breaker');
  
  // Default task(s).
  grunt.registerTask('default', [
    'cachebreaker:dev',
  ]);
};