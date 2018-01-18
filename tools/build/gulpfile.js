const gulp = require('gulp');
const fs = require('fs');
const template = require('gulp-template');
const argv = require('yargs').argv;
const rename = require('gulp-rename');
const path = require('path');
// 项目初始化
gulp.task('init', function() {
    let files = [];
    const projectName = argv.name;
    if(!projectName){
        return;
    }
    files = ['../templates/**/*'];
    //如果对应的文件存在那么就什么也不做，防止对原来修改文件的破坏
    if(fs.existsSync('../../dev/src/'+projectName+"/index.js")) return;
    gulp.src(files)
        .pipe(template({
            projectName: projectName,
        }))
        .pipe(gulp.dest('../../dev/src/' + projectName));
});
