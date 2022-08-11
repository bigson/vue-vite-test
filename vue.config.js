const glob               = require('glob')

// get HEAD SCSS
var all = glob.sync('./src/**/*.scss'),
    style = [],
    head = []

all.forEach(function(e, i){
    console.log(e)
    if(e.match((/.*\.head\.scss/))){
        head.push(e)
    }else{
        style.push(e)
    }
})

module.exports = {
    devtool : false,
    // Point entry to your app's server entry file
    entry: {
        head  : head,
        style : style,
    }
}