const {gulp, parallel,dest, src,series} = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync')
const watch = require('gulp-watch')
const clean = require('gulp-clean')


let _src = "#src"
let dist = "dist"



function scripts(){
    return src("#src/js/main.js")
       .pipe(rename('main.min.js'))
       .pipe(uglify())
       .pipe(dest("#src/js/"))
}
function browsersync(){
    return browserSync({
        server: {
            baseDir: '#src/',
        }
    })
}

function watchFiles(){
    return watch([
        '#src/**/*.html',
        '#src/img/**/*.[png,svg,jpg,]',
        "#src/css/style.css",
        "#src/js/main.min.js",
    ]).on('change', browserSync.reload)
}

function cleanFiles(){
    return src("dist/")
       .pipe(clean())
}
function build(){
    return src([
        '#src/**/*.html',
        '#src/css/style.css',
        '#src/img/**/*.[png,jpg,svg]',
        '#src/js/main.min.js',
    ],{base:'#src'})
    .pipe(dest('dist/'))
}
exports.scripts = scripts
exports.browsersync = browsersync
exports.watchFiles = watchFiles
exports.cleanFiles = cleanFiles
exports.build = series(cleanFiles,build)
exports.default = parallel(browsersync,watchFiles,scripts)