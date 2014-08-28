var webdriver = require('wd');
var log = require('custom-logger').config({ level: 0 }); // TODO: Change to 2 for sauce
var browser;
//var aboutLinkCss = "a[title='About']";
var aboutLinkCss = 'a[title="About"]';
//var aboutLinkCss = 'a[title=\'About\']';


// Page Elements Here
// NOTE: No other customer page-specific names should be anywhere 
//   but at the top of the file or the top of the page object

var MobiquityHomePageObject = function(theBrowser) {
    browser = theBrowser;
    log.info("Mobiquity Home Page initialized");

    // Custom Exported values here
    this.pageTitle = "Enterprise Mobile Apps, Strategy & Solutions | Mobiquity";
    this.url = "http://www.mobiquityinc.com";
    this.aboutLinkTextValue = "About";
};

MobiquityHomePageObject.prototype.getAboutLinkText = function(done) {
    log.info("In get about link text");

    browser.waitForElementByCssSelector(aboutLinkCss, function(err, el) {
        log.info("got some sort of aboutlink element? " + err);

        if(err) {
            done(err);
        }
        else {
            el.getAttribute("innerHTML", function(err, val) {
                if(err) {
                    done(err);
                }
                else {
                    done(null, val);    
                }
            })
        }
    });
}

module.exports = MobiquityHomePageObject;