module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            ignores: ['src/vendor/**'],
            all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js']
        },

        concat: {
            js_global: {
                src: ['src/javascript/vendor/jquery-1.11.3.min.js', 'src/javascript/app.js', 'src/javascript/views/app.views.js', 'src/javascript/views/app.views.BaseView.js', 'src/javascript/controllers/app.controllers.js', 'src/javascript/utilities/app.clone.js', 'src/javascript/utilities/app.inherit.js', 'src/javascript/utilities/app.EventEmitter.js'],
                dest: 'src/javascript/_bundles/global.js'
            },
            js_campain: {
                src: ['src/javascript/views/app.views.CampaignView.js', 'src/javascript/controllers/app.controllers.CampaignController.js', 'src/javascript/init.js'],
                dest: 'src/javascript/_bundles/campaign.js'
            },
            css_global: {
                src: ['src/css/base.css','src/css/main.css'],
                dest: 'public/stylesheets/global.css'
            }
        },

        uglify: {
            my_target: {
                options: {
                    mangle: false
                },
                files: {
                    'public/scripts/global.min.js':['src/javascript/_bundles/global.js'],
                    'public/scripts/campaign.min.js':['src/javascript/_bundles/campaign.js']
                }
            }
        }
    });

    // "uglify"
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // "jasmine"
    //grunt.loadNpmTasks('grunt-contrib-jasmine');

    // "concat"
    grunt.loadNpmTasks('grunt-contrib-concat');

    // "uglify"
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    //grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify']);
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
