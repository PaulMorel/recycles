// Grunt Configuration
// Date: 	Created on 2015-04-24
// Author: 	Paul Morel
module.exports = function(grunt) {

	// Task Configuration
	grunt.initConfig({

		// Package info and environment variables
		pkg: grunt.file.readJSON('package.json'),
		env: {
			src: 'src', 	// Source
			dev: 'dev',		// Development
			dist: 'dist' 	// Production / Distribution
		},

		/**
		 * LESS Compiler
		 *
		 * Compiles .less files to .css
		 * and builds corresponding source map.
		 */
		less: {
			dev: {
				options: {
					strictMath: true,
					sourceMap: true,
					sourceMapURL: 'styles.css.map',
					sourceMapFilename: '<%= env.dev %>/assets/css/styles.css.map'
				},
				src: '<%= env.src %>/assets/less/styles.less',
				dest: '<%= env.dev %>/assets/css/styles.css'
			},
			dist: {
				options: {
					strictMath: true,
					sourceMap: false,
				},
				src: '<%= env.src %>/assets/less/styles.less',
				dest: '<%= env.dist %>/assets/css/styles.css'
			}
		},
		/**
		 * CSS Postprocessor
		 *
		 * Applies processors to the CSS after compilation
		 * and rebuilds the source map.
		 */
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer-core')({ browsers: ['last 3 version'] }).postcss
				]
			},
			dev: {
				src: '<%= env.dev %>/assets/css/styles.css'
			},
			dist: {
				src: '<%= env.dist %>/assets/css/styles.css'
			},
		},
		/**
		 * CSS Minimization
		 *
		 * Minifies CSS after postprocessing.
		 */
		cssmin: {
			options: {
				shorthandCompacting: true,
				roundingPrecision: -1
			},
			dist: {
				src: '<%= env.src %>/assets/less/styles.less',
				dest: '<%= env.dev %>/assets/css/styles.css'
			}
		},

		/**
		 * Image Compressor
		 *
		 * Compresses images better.
		 * Slightly lossy compression.
		 */
		imagemin: {
			dev: {
				files: [{
					expand: true,
					cwd: '<%= env.src %>/assets/img/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: '<%= env.dev %>/assets/img/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= env.src %>/assets/img/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: '<%= env.dist %>/assets/img/'
				}]
			}
		},

		/**
		 * HTML Templating
		 *
		 * Bake static HTML for production while
		 * using modular files while in development.
		 */
		assemble: {
			options: {
				assets: "<%= env.dev %>/assets",
				layout: "<%= env.src %>/templates/layouts/default.hbs",
				partials: "<%= env.src %>/templates/partials/*.hbs",
			},
			site: {
				options: {
					//data: '<%= env.src %>/_data/en/*.{json,yml}',
					site: { root: '<%= env.dev %>' }
				},
				expand: true,
				cwd: '<%= env.src %>/_pages/',
				src: '**/*.hbs',
				dest: '<%= env.dev %>/en'
			}
		},

		/**
		 * File Monitoring
		 *
		 * Watches for file changes.
		 */
		watch: {
			less: {
				files: '<%= env.src %>/assets/less/**/*.less',
				tasks: ['less:dev','postcss:dev']
			},
			html: {
				files: '<%= env.src %>/**/*.{hbs,json,yml,html}',
				tasks: ['assemble:site']
			},
			img: {
				files: '<%= env.src %>/**/*.{jpg,gif,png,jpeg,svg}',
				tasks: 'newer:imagemin:dev'
			}
		}
	});

	// Task Loading
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');

	// Task Registering
	grunt.registerTask('default', ['watch']);
	//grunt.registerTask('build dev', ['clean:dist', 'less:dist', 'postcss:dist', 'cssmin:dist', 'copy:dist', 'imagemin:dist', 'concat:dist' ]);
	//grunt.registerTask('build dist', ['clean:dist', 'less:dist', 'postcss:dist', 'cssmin:dist', 'copy:dist', 'imagemin:dist', 'concat:dist' ]);
	grunt
};
