var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;
var should = bootstrap.should;
var expect = bootstrap.chai.expect;
var assert = require('assert');

var googlePage = require('../pages/googlePage');
var mobiquityHomePage = require('../pages/mobiquityHomePage');
var google;
var mobiquityHome;
var sessionid;
var sessionurl;

describe('Google Search - Basic Search', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    before(function(done) {
        google = new googlePage(browser);
        mobiquityHome = new mobiquityHomePage(browser);

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

    it('has an initial empty test for kicks', function(done) {
        done();
    });

    describe('Mobiquity Search', function() {
        it('should display our page first', function(done) {
            log.info("About to open google home page");

            OpenGoogle(done, function() {
                google.typeSearch("mobiquity", function() {
                    google.getFirstLinkAnchorText(function(err, firstElementText) {
                        if(err) {
                            log.error("Unable to get first result: " + err);
                            done(err);
                        }
                        else {
                            log.info("Got element on page: " + firstElementText);
                            assert.equal(firstElementText, google.mobiquityLinkText);
                        }
                        done();
                    })
                });
            });
        });

        it('clicking the first mobiquity result should take you to the home page', function(done) {
            log.info("About to open google home page");

            OpenGoogle(done, function() {
                google.typeSearch("mobiquity", function() {
                    ClickFirstGoogleLink(ValidateMobiquityHomePageTitle, function(err) {
                        done(err);
                    });
                });
            });
        });

        function OpenGoogle(mochaDone, callBackOnSuccess) {
            browser.get(google.location, function(err) {
                if(err) {
                    mochaDone(err);
                }
                else {
                    log.info("Got Google.com home page!");
                    callBackOnSuccess();
                }
            });
        }

        function ClickFirstGoogleLink(ValidateNewPageFxn, done) {
            log.info("In Click first Google Link fxn");

            google.getFirstLinkElement(function(err, firstLinkElement) {
                log.info("Got First Element: " + firstLinkElement);
                firstLinkElement.click(function(err) {
                    if(err) {
                        done(err);
                    }
                    else {
                        log.info("Clicked on the first link");
                        ValidateNewPageFxn(done);
                    }
                })
            })
        }

        // Returns err string if error, otherwise null
        function ValidateMobiquityHomePageTitle(done) {
            browser.title(function(err, title) {
                if(err) {
                    done(err);
                }
                else {
                    log.info("Mobiquity Home Page title: " + title);
                    assert.equal(title, mobiquityHome.title);
                    done();
                }
            });
        }

    })
});

