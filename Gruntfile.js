module.exports = function(grunt) {

    var globalJs = [
        'src/javascript/app.js',
        'src/javascript/utilities/app.clone.js',
        'src/javascript/utilities/app.inherit.js',
        'src/javascript/utilities/app.EventEmitter.js',
        'src/javascript/utilities/app.FormValidator.js',
        'src/javascript/views/app.views.js',
        'src/javascript/views/app.views.BaseView.js',
        'src/javascript/controllers/app.controllers.js'
    ];
    var campaignJs = [
        'src/javascript/views/app.views.CampaignView.js',
        'src/javascript/controllers/app.controllers.CampaignController.js',
        'src/javascript/init.js'
    ];
    var allJs = globalJs.concat(campaignJs);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                globals: {
                    jQuery: true,
                    app: true
                }
            },
            files: {
                src: allJs.concat(['Gruntfile.js'])
            }
        },

        jasmine: {
            pivotal: {
                src: allJs,
                options: {
                    vendor: [
                        'src/vendor/*.js',
                        "http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"
                    ],
                    specs: ['spec/**/*.spec.js'],
                    display: 'full',
                    summary: true
                }
            }
        },

        concat: {
            js_global: {
                src: globalJs,
                dest: 'src/javascript/_bundles/global.js'
            },
            js_campain: {
                src: campaignJs,
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
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // "concat"
    grunt.loadNpmTasks('grunt-contrib-concat');

    // "uglify"
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify']);

};
