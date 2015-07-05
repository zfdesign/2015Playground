module.exports = function(grunt) {

    var globalJs = [
        'src/javascript/app/app.js',
        'src/javascript/app/utilities/app.clone.js',
        'src/javascript/app/utilities/app.inherit.js',
        'src/javascript/app/utilities/app.EventEmitter.js',
        'src/javascript/app/views/app.views.js',
        'src/javascript/app/views/app.views.BaseView.js',
        'src/javascript/app/controllers/app.controllers.js'
    ];
    var fundraiserJs = [
        'src/javascript/app/views/app.views.FundraisingView.js',
        'src/javascript/app/controllers/app.controllers.FundraisingController.js',
        'src/javascript/app/init.js'
    ];
    var allJs = globalJs.concat(fundraiserJs);

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
                src: ['Gruntfile.js', globalJs, fundraiserJs, 'spec/**/*.spec.js']
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
                dest: 'src/javascript/app/_temp/global.js'
            },
/*            js_vendor: {
                src: ['src/javascript/vendor/jquery-1.11.3.min.js', 'src/javascript/app/_temp/global.js'],
                dest: 'src/javascript/app/_temp/global.js'
            },*/
            js_campaign: {
                src: fundraiserJs,
                dest: 'src/javascript/app/_temp/fundraiser.js'
            },
            css_global: {
                src: ['src/css/styles.css'],
                dest: 'assets/css/styles.css'
            }
        },

        uglify: {
            my_target: {
                options: {
                    mangle: false,
                    sourceMap: true,
                    sourceMapName: 'assets/javascript/sourcemap.map'
                },
                files: {
                    //'assets/css/styles.min.css':['src/css/styles.css'],
                    'assets/javascript/global.min.js':['src/javascript/vendor/jquery-1.11.3.min.js', 'src/javascript/app/_temp/global.js'],
                    'assets/javascript/fundraiser.min.js':['src/javascript/app/_temp/fundraiser.js']
                }
            }
        },

        clean: ['src/javascript/app/_temp'],

        watch: {
            css:{
                files: ['src/css/*.css'],
                tasks: ['concat:css_global']
            },
            js_global: {
                files: ['src/javascript/app/*.js', 'src/javascript/app/utilities/*.js', 'src/javascript/app/views/app.views.*.js'],
                tasks: ['concat:js_global', /*'concat:js_vendor', */'uglify']
            },
            js_campaign: {
                files: ['src/javascript/app/views/*.js', 'src/javascript/app/controllers/*.js'],
                tasks: ['concat:js_campaign', 'uglify']
            }
        }
    });

    // "jshint"
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // "jasmine"
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // "concat"
    grunt.loadNpmTasks('grunt-contrib-concat');

    // "uglify"
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // "clean"
    grunt.loadNpmTasks('grunt-contrib-clean');

    // "watch"
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('lintNmove', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify', 'clean']);

};
