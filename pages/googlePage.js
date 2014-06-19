var webdriver = require('wd');
var log = require('custom-logger').config({ level: 0 }); // TODO: Change to 2 for sauce
var browser;

// Page Elements Here
// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object
var searchBoxInputById = "gbqfq";
var firstResultSelector = "#rso li .r a";

var GooglePage = function(theBrowser) {
    browser = theBrowser;
    log.info("Google Page initialized");

    // Custom Exported values here
    this.location = "http://google.com/";
    this.mobiquityLinkText = '<em>Mobiquity</em>: Enterprise Mobile Apps, Strategy &amp; Solutions';
};

GooglePage.prototype.typeSearch = function(searchString, done) {
    log.info("About to search for text: " + searchString);

    browser.waitForElementById(searchBoxInputById, function(err, el) {
        if(err) {
            log.err("Unable to find search box: " + err);
            done();
        }
        else {
            el.sendKeys(searchString, function(err) {
                if(err) {
                    log.err("Unable to type text into search box: " + err);
                }
                else {
                    log.info("Successfully typed text: " + searchString);
                }
                done();
            });
        }
    })
}

GooglePage.prototype.getFirstLinkAnchorText = function(done) {
    var self = this;
    log.info("About to get first link anchor text");
    
    browser.waitForElementByCssSelector(firstResultSelector, function(err, el) {
        if(err) {
            done(err);
        }
        else {
            
            self.getLinkText(el, done);
        }
    });
}

GooglePage.prototype.getFirstLinkElement = function(done) {
    log.info("About to get first link element on page");
    
    browser.waitForElementByCssSelector(firstResultSelector, function(err, el) {
        if(err) {
            done(err);
        }
        else {
            log.info("First link showed up, calling callback");
            done(null, el);
        }
    });
}

GooglePage.prototype.getLinkText = function(el, done) {
    el.getAttribute("innerHTML", function(err, val) {
        if(err) {
            done(err);
        }
        else {
            log.info("Got link text: " + val);
            done(null, val);
        }
    });
}

module.exports = GooglePage;