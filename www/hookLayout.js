#!/usr/bin/env node

//
// This hook copies various resource files
// from our version control system directories
// into the appropriate platform specific location


var filestocopy = [{ "plugins/cordova-plugin-drawoverapps/src/android/drawable/close.png": "platforms/android/app/src/main/res/drawable/close.png" },
                   { "plugins/cordova-plugin-drawoverapps/src/android/layout/service_over_apps_head.xml": "platforms/android/app/src/main/res/layout/service_over_apps_head.xml" },
                   { "plugins/cordova-plugin-drawoverapps/src/android/layout/service_over_apps_view.xml": "platforms/android/app/src/main/res/layout/service_over_apps_view.xml" },
                   { "plugins/cordova-plugin-drawoverapps/src/android/layout/key_dispature.xml": "platforms/android/app/src/main/res/layout/key_dispature.xml" } ,
                   { "res/android/icon/hdpi.png" : "platforms/android/app/src/main/res/drawable/icon.png" }
                ];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];
/*
const resPath = "platforms/android/res/" ;
if (!fs.existsSync(resPath)){
    console.log("no res directory . lets create it") ;
    fs.mkdir(resPath , (err) =>{
        console.log("error!") ;
        console.log(err);
    } );
}


const resPath = "platforms/android/res/" ;
if (!fs.existsSync(resPath)){
    console.log("no res directory . lets create it") ;
    fs.mkdir(resPath , (err) =>{
        console.log("error!") ;
        console.log(err);
    } );
}

const xmlPath = "platforms/android/res/xml/" ;
if (!fs.existsSync(xmlPath)){
    console.log("no xml directory . lets create it") ;
    fs.mkdir(xmlPath , (err) =>{
        console.log("error!") ;
        console.log(err);
    } );
}
*/
//fs.writeFileSync('platforms/android/res/xml/config.xml', '')
/*
const configxmlPath = "platforms/android/res/xml/config.xml" ;
if (!fs.existsSync(configxmlPath)){
    console.log("no configxml file. lets create it") ;
    const sync = fs.openSync(configxmlPath, 'w') ;
    fs.closeSync(sync);
}
*/

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile =  key;
        var destfile = val;
        console.log("- hook from  "+ srcfile +" to "+ destfile );
        var destdir = path.dirname(destfile);
        // create directory if not exists
        if (!fs.existsSync(destdir)){
            fs.mkdirSync(destdir);
        }
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(
               fs.createWriteStream(destfile));
        }
    });
});
