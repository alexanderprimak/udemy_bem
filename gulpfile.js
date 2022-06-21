let project_folder = 'dist'
let source_folder = '#src'
let path = {
	build: {
		html: project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/img/',
		fonts: project_folder + '/fonts/',
		php: project_folder + '/php/',
	},
	src: {
		html: [source_folder + '/*.html', '!' + source_folder + '/html/_*.html'],
		css: source_folder + '/scss/style.scss',
		js: source_folder + '/js/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,jpeg,ico,webp}',
		fonts: source_folder + '/fonts/*.ttf',
		php: source_folder + '/php/*.php',
	},
	watch: {
		html: source_folder + '/**/*.html',
		css: source_folder + '/scss/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		php: project_folder + '/php/**/*.php',
	},
	clean: './' + project_folder + '/',
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	fileInclude = require('gulp-file-include'), /// Позволяет дробить файлы mabe html @@include - для подключения в index.html
	del = require('del'), // для удаления папки dist да и всего что нам потребуется
	scss = require('gulp-sass')(require('sass')), /// Компилятор scss
	autoprefixer = require('gulp-autoprefixer'), /// Добавление префиксов
	group_media = require('gulp-group-css-media-queries'),
	rename = require('gulp-rename'), /// Если необходимо изменить название файла
	uglify = require('gulp-uglify-es').default, /// минимизирует наши файлы js
	minifyCSS = require('gulp-minify-css'), /// минимизирует наши файлы css
	babel = require('gulp-babel'), /// приводит наш js код более приемлемому стандарту который читает каждый браузер
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'), // конвертирует наши картинки в webP фармат для браузеров которым это необходимо
	webp_html = require('gulp-webp-in-html'), /// для работы с html файлами
	webp_css = require('gulp-webp-css') /// для работы с css файлами

function browserSyncFunc(params) {
	browserSync.init({
		server: {
			baseDir: './' + project_folder + '/',
		},
		port: 3000,
		notify: false,
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileInclude())
		.pipe(webp_html())
		.pipe(dest(path.build.html))
		.pipe(browserSync.stream())
}

function fonts() {
	return src(path.src.fonts).pipe(dest(path.build.fonts))
}

function php() {
	return src(path.src.php).pipe(dest(path.build.php).pipe(browserSync.stream()))
}

function img() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70,
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browserSync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: 'expanded',
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true,
			})
		)
		.pipe(webp_css())
		.pipe(dest(path.build.css))
		.pipe(minifyCSS())
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileInclude())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(dest(path.build.js))
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(uglify())
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream())
}

function watchFiles() {
	gulp.watch([path.watch.html], html)
	gulp.watch([path.watch.css], css)
	gulp.watch([path.watch.js], js)
	gulp.watch([path.watch.img], img)
	gulp.watch([path.watch.php], php)
}

function clean() {
	return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(php, fonts, js, css, html, img))
let watch = gulp.parallel(build, watchFiles, browserSyncFunc)

exports.php = php
exports.fonts = fonts
exports.img = img
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch
