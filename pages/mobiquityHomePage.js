var webdriver = require('wd');
var log = require('custom-logger').config({ level: 0 }); // TODO: Change to 2 for sauce
var browser;

// Page Elements Here
// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object
var searchBoxInputById = "gbqfq";
var firstResultSelector = "#rso li .r a";

var MobiquityHomePage = function(theBrowser) {
    browser = theBrowser;
    log.info("Mobiquity Home Page initialized");

    // Custom Exported values here
    this.location = "http://www.mobiquityinc.com";
    this.title = 'Enterprise Mobile Apps, Strategy & Solutions | Mobiquity';
};

module.exports = MobiquityHomePage;