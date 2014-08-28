var bootstrap = require('../bootstrap');
var browser = bootstrap.browser;
var log = bootstrap.log;
var should = bootstrap.should;

var mobPage = require('../pages/mobHomePageObject');
var mobhomepage;

var sessionid;
var sessionurl;

describe('Mobiquity Home Page', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    before(function(done) {
        mobhomepage = new mobPage(browser);

        log.info("About to run browser init with desired options: " + JSON.stringify(bootstrap.desired, null, 4));
        bootstrap.desired.name="Mobiquity Home Page Menu tests";

        browser.init({browserName:'chrome'}).then(function(adb) {
                log.info("Successfully initialized the browser.");
                browser.getSessionId().then(function(sid) {
                sessionid = sid;
                sessionurl = "https://saucelabs.com/tests/" + sid;
                bootstrap.writeToFile("Mobiquity Home page - " + sessionurl);
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

    describe('Verify Menu Items', function() {
        it('should have an "About" link', function(done) {
            browser.get(mobhomepage.url, function(err) {
                log.info("mobiquity home page opened returned - err? " + err);
                if(err) {
                    done(err);
                }
                else {
                    mobhomepage.getAboutLinkText(function(err, alinktext) {
                        // TODO: Errro handline
                        log.info("Got about link text: " + alinktext);
                        alinktext.should.equal(mobhomepage.aboutLinkTextValue);
                        //mobhomepage.aboutLinkTextValue.should.equal(alinktext);
                        done();  
                    })
                }
            });
        })
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