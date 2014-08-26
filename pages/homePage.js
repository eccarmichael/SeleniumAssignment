var wd = require('wd');
var bootstrap = require('../bootstrap');
var log = bootstrap.log;
var browser;

// Page Elements Here
var pageObjects = {
	emailCss: ".email"
};

var homePage = function(theBrowser) {
    log.info("Creating Home Page object");

    this.browser = theBrowser;
    browser = theBrowser;
};


homePage.prototype.getLoggedInEmail = function(done) {
    browser.waitForElementByCss(pageObjects.emailCss, function(err, el) {
        if(err) {
            done(err);
        }
        else {
            el.text(function(err, text) {
                done(null, text);
            });
        }
    })
}


module.exports = homePage;
