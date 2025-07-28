const { src, dest, watch, series } = require('gulp');

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

// Imagenes
//
const imagemin = require('gulp-imagemin');

function cssd( done ) {
    console.log('iniciando funcion cssd')
    src('src/scss/app.scss')     // <-- Identificar el archivo principal
        .pipe(sass() )           // <-- Compilar SASS
        .pipe(dest('build/css')) // <-- Exportarlo o guardarlo en una ubicación
    done();
}

function cssbuild( done ) {
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html']
        }))
        .pipe( dest('build/css'))
    done();
}

function dev( done ) {
    watch('src/scss/**/*.scss', cssd);
    watch('src/img/**/*',imagenes);
    done();
}

function imagenes(done) {
    src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3}) )
        .pipe(dest('build/img') )
    done();
}

exports.css = cssd;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series( imagenes, cssd, dev );
exports.build = series( cssbuild );