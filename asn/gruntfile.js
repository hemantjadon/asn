module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [
          {
            expand: true,
            cwd: 'static/',
            src: ["**/*.less"],
            dest: "",
            ext: ".css/",
            extDot: "first",
            rename: function(dest,src){
              var splittedSRC = src.split('/');
              var destinationPath = dest.replace(dest,'static/'+splittedSRC[0]+"/css/"+splittedSRC[(splittedSRC.length)-2]);
              return destinationPath;
            },
          }
        ],
      }
    },

    watch: {
      styles: {
        files: ['static/**/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['less','watch']);
};
