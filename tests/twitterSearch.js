var bootstrap = require("../bootstrap");
var assert = require('assert');

var log = bootstrap.log;
var browser = bootstrap.browser;

var twitterHomePage = require("../pages/twitterHomePage");
var twitterHome = new twitterHomePage(browser);

describe('Twitter Search', function() {
    this.timeout(bootstrap.MaxWaittime);

    before(function(done) {
        browser.init(bootstrap.desired, function(err, sessionid, caps) {
            if(err) {
                done(err);
            }
            else {
                log.info("Initialized the browser with session: " + sessionid);

                done();
            }
        });
    });

    after(function(done) {
        done();
        // browser.quit(function(err) {
        //     if(err) {
        //         done(err);
        //     }
        //     else {
        //         log.info("Successfully closed the browser");
        //         done();
        //     }
        // });
    });

    it('should initialize', function(done) {
        //expect(1).equals(2);
        // if(assert.equal(1,2,'why does this hang')) {
        //     log.info("PASSED");
        // }
        // else {
        //     log.info("FAILED");
        // }

        log.info("Initialize test ran!");
        done();
    });


    function HandleErrors(mochaTestDoneCB, itWorkedCB) {
        return function (err) {
            if (err) {
                mochaTestDoneCB(err);
            }
            else {
                itWorkedCB();
            }
        }
    }

    it('should not let me log in with valid username and invalid password', function(done) {
        
        // Open the page
        twitterHome.open(HandleErrors(done, function () {
            TypeInvalidUserName(HandleErrors(done, function() {
                TypeInvalidPassword(HandleErrors(done, function() {
                    twitterHome.clickLogin(HandleErrors(done, function() {
                        log.info("Clicked login!");
                        done();
                    }));
                }));
            }));
        }));


        // Validate error page

        //done();
    });
})

function TypeInvalidPassword(done) {
    log.info("About to type invalid password");

    twitterHome.typePassword("somethingstupid", function(err) {
        if(err) {
            done(err);
        }
        else {
            log.info("I typed something in the password field succesfully");
            done();
        }
    })
}

function TypeInvalidUserName(done) {
    log.info("About to type invalid username");

    twitterHome.typeUserName("abcdefghijklmnopqrstuvwxyz1983", function(err) {
        if(err) {
            done(err); // Unable to type for some reason
        }
        else {
            log.info("I typed something in the username field succesfully");
            try {
                assert.equal(1, 2, "not equal");
                done();
            }
            catch(e) {
                done(e);
            }
        }
    })
}