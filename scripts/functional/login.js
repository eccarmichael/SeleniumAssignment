var bootstrap = require('../../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;

var loginPage = require('../../pages/loginPage');
var homePage = require('../../pages/homePage');
var login;
var home;
var sessionid;
var sessionurl;

var useremail = "spiderlmsuser@mobiquityinc.com";
var userpassword= "spider1234";
var url = "http://development.spiderlms.com:3000";

describe('SpiderLMS - Login', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    before(function(done) {
        login = new loginPage(browser);
        home = new homePage(browser);

        log.info("About to run browser init with desired options");
        bootstrap.desired.name="SpiderLMS - Login Tests";
        browser.init(bootstrap.desired).then(function(adb) {
            log.info("Successfully initialized the browser.");
                browser.getSessionId().then(function(sid) {
                    process.env["SauceOnDemandSessionID"] = sid;
                    process.env["job-name"] = bootstrap.desired.name;

                    sessionid = sid;
                    sessionurl = "https://saucelabs.com/tests/" + sid;

                    bootstrap.writeToFile(bootstrap.desired.name + " - " + sessionurl);
                });

            return;

        }).nodeify(done);
    });

	xit('Initiated', function(done) {
		done();
	});

    xit('elise test failure', function(done) {
        done("Broke it on purpose!");
    });

    after(function(done) {
        browser.quit().nodeify(done);
    });

    it('Login - User Valid Login', function (done) {
        log.info("Running Login - User Valid Login")
        LoginAs(useremail, userpassword, HandleErrors(done, function(err) {
            // Validate Stuff on the home page
            home.getLoggedInEmail(function(err, text) {
                if(err) {
                    done(err);
                }
                else {
                    log.info("Logged in email is: " + text);
                    useremail.should.equal(text);
                    done();
                }
            })
        }));
    });
    
}); // Final Describe


function LoginAs(email, password, CBFxn) {
    log.info("About to login as: " + email + ", Password: " + password);
    try {
        browser.get(url, HandleErrors(CBFxn, function() {
            log.info("Opened Page");
            login.clickLogin(HandleErrors(CBFxn, function() {
                log.info("Clicked Login Button");
                login.typeEmail(email, HandleErrors(CBFxn, function() {
                    log.info("Typed email");
                    login.typePassword(password, HandleErrors(CBFxn, function() {
                        log.info("Typed password");
                        login.clickSubmit(HandleErrors(CBFxn, function() {
                            log.info("Clicked subit");
                            login.clickUserAccount(HandleErrors(CBFxn, function() {
                                log.info("Logged in as email " + email);
                                // Verify Stuff in the Callback
                                CBFxn();
                            }))
                        }));
                    }));  
                }));
            }));
        }));
    }
    catch(e) {
        CBFxn(e);
    }

}

function HandleErrors(itDidNotWorkCB, itWorkedCB) {
    return function (err, other) {
        if (err) {
            itDidNotWorkCB(err);
        }
        else {
            itWorkedCB(null, other);
        }
    }
}
