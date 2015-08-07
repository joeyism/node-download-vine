"use strict";
var async = require("async");
var Promise = require("promise");
var fs = require("fs");
var request = require("request");


var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        if (res.statusCode === 200){
            console.log("Downloading " + filename + " at " + uri);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        }
        else {
            callback();
        }
    });
};


module.exports = function(medias){

    return new Promise(function(resolve, reject){
        async.eachSeries(medias, function(media, next){
            var names = media.split("/");
            var filename = names.pop();

            if (media.indexOf("vine") > -1){
                filename = names[4]+".mp4";
                request.get(media, function(err, res, body){
                    var urls =[ 
                        body.match(/src=".+"/g)[0].match(/".+"/g)[0].replace(/\"/g,"").replace("v","mtc").replace("videos","videos_dashhd").replace(".mp4.jpg",".mp4").replace(/\?.+/,""),  
                        body.match(/src=".+"/g)[0].match(/".+"/g)[0].replace(/\"/g,"").replace("v","mtc").replace("videos","videos_h264dash").replace(".mp4.jpg",".mp4").replace(/\?.+/,"")
                    ];

                    async.eachSeries(urls, function(url, done){
                        download(url, filename, function(err){
                            done();
                        });
                    }, function(err){
                        next(err);
                    });
                });
            }
            else {
                download(media, filename, function(err){
                    next();
                });
            }
        }, function(err){
            if (err){
                reject(err);
            } 
            else {
                resolve();
            }
        });
    });
};
