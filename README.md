# download-vine
A tool to download files, including vines

## Installation
To install, simply run

    > npm install --save download-vine

## Usage
To use, this is a sample code

    var download = require("download-vine");
    
    download(/** an array of files **/).then(function(){
        /** success **/
    }).catch(function(error){
        /** error **/
    });

The input is an array, each element of the array is a string that is the uri to source of the file you wish to download. If you wish to download a vine, the link of the vine should be of the type **http://vine.co/v/XXXXXXXXX/embed/simple**.

## Versions
**1.0.0**
* First commit
