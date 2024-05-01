/**
 * Include required modules here
 * 
*/
const boganipsum = require("boganipsum");
const colors = require("colors");
const progress = require("cli-progress"); 
const lodash = require("lodash"); 
var readline = require("readline");


/**
 * Main Application Wrapper
 *
 * @return object
*/
const lazyterminal = {  

    /**
     * All possible answers to user prompt
     *
     * @return array
    */
    possibleAnswers: ["slow", "medium", "fast", "random"],


    /**
     * Boot up the console app here
     *
     * @return function
    */
    startApp: function(){
        console.info("\n Welcome, you lazy piece of shit!".green);
        this.askTheQuestionAndGetAnAnswer();
    },

   
    /**
     * Handle user prompt and prompt validation, if user input is valid then we start working
     *
     * @return function
    */
    askTheQuestionAndGetAnAnswer: function(){ 
        var question = " Press ENTER for random speed".green + " (or type slow, medium or fast): "; 
        var rl = null;

        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }); 

        rl.question(question, (answer) => {
            rl.close()
            if (answer.length===0) {
                return this.startWorking(answer); 
            } else {
                return this.possibleAnswers.includes(answer) ? this.startWorking(answer) : this.askTheQuestionAndGetAnAnswer();
            }
        });
    },


    /**
     * Using this function, we quickly decide if to show a random line or progress bar
     *
     * @return function
    */
    startWorking: function(speed) {
        // make line has more chance to be shown
        var type = lodash.sample(["line", "progress", "line", "line", "line"]); 
        type == "line" ? this.showLine(speed) : this.showProgress(speed); 
    },



    /**
     * Using this function, we generate a random line with zero meaning lol
     *
     * @return function
    */
    showLine: function(speed){
        var randomMessage = this.getMessage();
        var randomColor = this.getColor();
        var randomStatus = this.getStatus();
        var randomModule = this.getModule(); 
        var randomDate = this.getFormattedDate();
        console.log(randomDate+ " " +randomModule.grey + " " + randomStatus.magenta + " " + randomMessage[randomColor]);
        
        setTimeout(() => {
            this.startWorking(speed);
        }, this.getShortTime(speed));
    },


    /**
     * Using this function, we show a random progress bar using various presets
     *
     * @return function
    */
    showProgress: function(speed){ 

        const bar = new progress.SingleBar({

        }, progress.Presets[lodash.sample(['rect', 'legacy', 'shades-classic'])]); 
        var meter = lodash.random(10, 80);
        bar.start(100, meter); 
        

        const intervalId = setInterval(() => {
            if (meter >= 100) {
                clearInterval(intervalId);
                bar.stop();
                this.startWorking(speed);
            }
            let add = lodash.random(10, 40);
            // make sure we don't go over 100
            add = meter + add <= 100 ? add : 1;
            bar.update(meter += add);
        }, this.getShortTime(speed));
        
    },



    /**
     * Using this function, we get a random message line to display on our console
     *
     * @return function
    */
     getMessage: function(){   
        var senteces = [
            "it worked if it ends with ok",
            "cli [ 'node', '" + this.getSystemInfos() + "', 'install', '--verbose' ]",
            "using npm@1.4.28 " + this.getSystemInfos(),
            "using node@v0.10.32",
            "readDependencies using package.json deps",
            "install where, deps " + this.getSystemInfos() + ", [ '" + this.getNodePackage() + "' ] ]",
            "readDependencies using package.json deps",
            "already installed skipping  " + this.getNodePackage() + "@" + this.getVersion(),
            "already installed skipping boganipsum@0.1.0 " + this.getSystemInfos(),
            "build /Users/samuel/Documents/bebusy",
            "linkStuff [ false, false, false, '/Users/samuel/Documents' ]",
            "rebuildBundles " + this.getNodePackage() + "@" + this.getVersion(),
            "rebuildBundles [ '.bin', 'boganipsum', 'colors' ]",
            "install " + this.getNodePackage() + "@" + this.getVersion(),
            "postinstall " + this.getNodePackage() + "@" + this.getVersion(),
            "prepublish " + this.getNodePackage() + "@" + this.getVersion(),
            "preinstall " + this.getNodePackage() + "@" + this.getVersion(),
            "linkStuff " + this.getNodePackage() + "@" + this.getVersion(),
            "linkBins " + this.getNodePackage() + "@" + this.getVersion(),
            "linkMans " + this.getNodePackage() + "@" + this.getVersion(),
            "exit [ 0, true ]",
            "ok",
            "etag " + this.getHexNumber()
        ];

        return lodash.sample(senteces);

    },



    /**
     * Using this function, we grab some info about the user's enviroment so it looks more realistic
     *
     * @return function
    */
    getSystemInfos: function(){ 
        var env = process.env;
        var systemPaths = [ env.TMPDIR, env.PATH, env.PWD, env.HOME ]; 
        return lodash.sample(systemPaths); 
    },


  
    /**
     * Using this function, we generate a random version number - we follow semantic versioning :-)
     *
     * @return function
    */
    getVersion: function(){ 
        var mayorV = lodash.random(1, 9);
        var minorV = lodash.random(1, 9);
        var devV = lodash.random(1, 9); 
        return "v" + mayorV + "." + minorV + "." + devV;
    },

 

    /**
     * Using this function, we generate a random hexcode
     *
     * @return function
    */
    getHexNumber: function(){ 
        var stringSize = 60;
        var generatedHexString = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
        for (var i=0; i<stringSize; i++){
            generatedHexString += possible.charAt(Math.floor(Math.random() * possible.length));
        } 
        return generatedHexString;
    },


  

    /**
     * Using this function, we determine our pace based on the input we got from the user, remember?
     *
     * @return function
    */
    getShortTime: function(speed){ 
        if (speed==="fast") {
            return lodash.random(1, 5) * 5;
        } else if (speed==="medium") {
            return lodash.random(5, 10) * 10;
        } else if (speed==="slow") {
            return lodash.random(10, 20) * 15;
        } else if (speed==="random") {
            return lodash.random(1, 20) * 20;
        }

    },



    /**
     * Using this function, we get a random module command/action name 
     *
     * @return function
    */
    getModule: function(){ 
        var modules = [
            "\u001b[32mnpm\u001b[0m",      // Green color for "npm"
            "\u001b[33minstall\u001b[0m",  // Yellow color for "install"
            "\u001b[34mdownload\u001b[0m", // Blue color for "download"
            "\u001b[35mparse\u001b[0m",    // Purple color for "parse"
            "\u001b[36mok\u001b[0m",       // Cyan color for "ok"
            "\u001b[33mverb\u001b[0m",     // Yellow color for "verb"
            "\u001b[31mWARN\u001b[0m",     // Red color for "WARN"
            "\u001b[32minfo\u001b[0m"      // Green color for "info"
        ];
        return lodash.sample(modules); 
    },


    /**
     * Using this function, we get the name of random package to display in the commandline
     *
     * @return function
    */
    getNodePackage: function(){ 
        var modules = [
            "axios", "lodash", "sentry-cli", "babel", "nodemon", "mongoose", "underscore", "async", "request", "lodash", "commander", "express", "optimist", "colors", "coffee-script",
            "mkdirp", "debug", "q", "chalk", "yeoman-generator", "moment", "glob", "through2", "jade", "uglify-js",
            "socket.io", "gulp-util", "redis", "cheerio", "through", "node-uuid", "connect", "winston", "mime",
            "minimist", "bluebird", "grunt", "handlebars", "mongodb", "rimraf", "semver", "ejs", "mongoose", "marked",
            "xml2js", "lodash.string", "fs-extra", "mocha", "js-yaml", "superagent", "less", "extend", "esprima",
            "jquery", "stylus", "body-parser", "xtend", "jsdom", "event-stream", "shelljs", "minimatch", "prompt",
            "browserify", "wrench", "ws", "mysql", "readable-stream", "yosay", "inherits", "when", "pkginfo",
            "backbone", "nopt", "cli-color", "concat-stream", "passport", "nodemailer", "gulp", "chai", "inquirer",
            "nconf", "validator", "yargs", "mustache", "qs", "clean-css", "npm", "ncp", "should", "open", "aws-sdk",
            "graceful-fs", "temp", "http-proxy", "iconv-lite", "requirejs", "socket.io-client", "hiredis", "uuid",
            "promise", "escodegen", "bower", "oauth", "log4js", "cli-table"
        ];


        return lodash.sample(modules);

    },



    /**
     * Using this function, we fetch a random status for the current operation to display in the commandline
     *
     * @return function
    */
    getStatus: function(){

        var allColors = [
            "100 Continue", "101 Switching Protocols", "102 Processing", "200 OK", "201 Created", "202 Accepted",
            "203 Non-Authoritative Information", "204 No Content", "205 Reset Content", "206 Partial Content",
            "207 Multi-Status", "208 Already Reported", "226 IM Used (RFC 3229)", "300 Multiple Choices",
            "301 Moved Permanently", "302 Found", "303 See Other", "304 Not Modified", "305 Use Proxy",
            "306 Switch Proxy", "307 Temporary Redirect", "308 Permanent Redirect", "prepublish", "postinstall",
            "install", "rebuildBundles", "linkMans", "linkBins", "linkStuff", "install", "about to build", "addNamed",
            "lock", "etag", "parsed url", "search", "query", "host", "auth", "slashes", "cache add", "GET", "POST",
            "trying", "installOne", "tar unpack"
        ];

        return lodash.sample(allColors);

    },



    /**
     * Using this function, we fetch a random color to format our output on the console
     *
     * @return function
    */
    getColor: function(){ 
        var allColors = [ "white", "grey", "green", "blue", "cyan", "white", "gray" ]; 
        return lodash.sample(allColors);  
    },



    /**
     * Using this function, we generate some random text. I mean how do we even start without doing that? :-)
     *
     * @return function
    */
    generateIpsum: function(){

        for (var i=0; i<1000; i++){
            console.log( boganipsum({ sentenceMin: 200, sentenceMax: 205 }) );
        }

    },
 

    /**
     * Using this function, we fetch and output the current time to make it look even more realsitic
     *
     * @return function
    */
    getFormattedDate: function(){

        var date = new Date();

        var leadingZero = function(nmbr){
            if (nmbr<10) { return ("0" + nmbr) } else { return nmbr }
        };

        var formattedTime = "";
        formattedTime += leadingZero( date.getHours() );
        formattedTime += ":" + leadingZero( date.getMinutes() );
        formattedTime += ":" + leadingZero( date.getSeconds() );

        return formattedTime;

    },

 
}


//Of course, we need to export :)
module.exports =  lazyterminal

