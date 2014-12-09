module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            local: {
                options: {
                    keepalive: true,
                    port: 1234
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
};