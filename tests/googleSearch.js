var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;
var should = bootstrap.should;
var expect = bootstrap.chai.expect;
var assert = require('assert');

var googlePage = require('../pages/googlePage');
var google;
var sessionid;
var sessionurl;

describe('Google Search - Basic Search', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    before(function(done) {
        google = new googlePage(browser);

        log.info("About to run browser init with desired options: " + JSON.stringify(bootstrap.desired, null, 4));
        bootstrap.desired.name="Google Search - Basic Search";

        browser.init({browserName:'chrome'}).then(function(adb) {
                log.info("Successfully initialized the browser.");
                browser.getSessionId().then(function(sid) {
                sessionid = sid;
                sessionurl = "https://saucelabs.com/tests/" + sid;
                bootstrap.writeToFile("Google Search - " + sessionurl);
            });
            return;
        }).nodeify(done);
    });

    after(function(done) {
        browser.quit().nodeify(done);
    });

    xit('has an initial empty test for kicks', function(done) {
        done();
    });

    describe('Mobiquity Search', function() {
        it('should display our page first', function(done) {
            log.info("About to open google home page");
            browser.get("http://google.com", HandleErrors(done, function(err) {
                log.info("Got Google.com home page!");
                google.typeSearch("mobiquity", HandleErrors(done, function(err) {
                    google.getFirstLinkAnchorText(HandleErrors(done, function(err, firstElementText) {
                        log.info("Got element on page: " + firstElementText);
                        assert.equal(firstElementText, google.mobiquityLinkText);
                        done();
                    })); 
                }));
            }));
        });
    })
});

function HandleErrors(badCB, goodCB) {
    return function(err, somethingElse) {
        if(err) {
            badCB(err);
        }
        else {
            goodCB(null, somethingElse)
        }
    }
}