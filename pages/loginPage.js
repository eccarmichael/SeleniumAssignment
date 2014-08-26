var wd = require('wd');
var bootstrap = require('../bootstrap');
var log = bootstrap.log;
var browser;

// Page Elements Here
var loginPageObjects = {
	emailCss: "#Email",
	passCss: "#Passwd",
    submitCss:"#signIn",
    loginButtonCss:".login-button",
	username: "spiderlmsuser@mobiquityinc.com",
	userpassword: "spider1234",
    adminname: "spiderlms@mobiquityinc.com",
    adminpassword: "spiderlms123",
    userAccountButton: "button[value='spiderlmsuser@mobiquityinc.com']"
};

var loginPage = function(theBrowser) {
    log.info("Creating LoginPage object");

    this.browser = theBrowser;
    browser = theBrowser;
};

loginPage.prototype.clickUserAccount = function(done) {
    // Only do this if we can find the button 
    browser.elementByCss(loginPageObjects.userAccountButton, function(err, el) {
        if(err) {
            done(); // No need to click
        }
        else {
            el.click(function(err) {
                if(err) {
                    done(err);
                }
                else {
                    done();
                }
            })
        }
    });
}

loginPage.prototype.clickElement = function(element, done) {
    log.info("Clicking Element: " + element);
    browser.elementByCss(element).click(function(err) {
        if(err) {
            done(err);
        }
        else {
            done();
        }
    })
}

loginPage.prototype.clickLogin = function(done) {
    this.clickElement(loginPageObjects.loginButtonCss, done);
}

loginPage.prototype.clickSubmit = function(done) {
    this.clickElement(loginPageObjects.submitCss, done)
}

loginPage.prototype.typeEmail = function(emailText, done) {
    browser.elementByCss(loginPageObjects.emailCss)
    .sendKeys(emailText, function(err) {
        if(err) {
            done(err);
        }
        else {
            log.info("Finished typing user email");
            done();
        }
    });  
}

loginPage.prototype.typePassword = function(passwordText, done) {
    browser.elementByCss(loginPageObjects.passCss)
    .sendKeys(passwordText, function(err) {
        if(err) {
            done(err);
        }
        else {
            done();
        }
    });
}


loginPage.prototype.typeUserEmail = function(done) {
    this.typeEmail(loginPageObjects.username, done);
}

loginPage.prototype.typeUserPassword = function(done) {
    this.typePassword(loginPageObjects.userpassword, done);
}

loginPage.prototype.typeAdminEmail = function(done) {
    this.typeEmail(loginPageObjects.adminname, done);
}

loginPage.prototype.typeAdminPassword = function(done) {
    this.typePassword(loginPageObjects.adminpassword, done);
}

module.exports = loginPage;
