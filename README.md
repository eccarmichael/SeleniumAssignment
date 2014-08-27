##Selenium
------
Functional tests for websites - can test web on mobile devices via sauce (or if you have the patience to set up all the drivers)

Uses Mocha for ease of adding tests
bootstrapper.js contains global settings
Page Objects should be used for each page or functional area that makes sense

###Running Locally
------
0. Run ```npm install```
1. The chrome driver must be downloaded and in the path
	1. http://chromedriver.storage.googleapis.com/index.html?path=2.9/ 
2. The selenium server must be running
	1. ```npm install selenium-standalone```
	2. run the server ```./node_modules/.bin/start-selenium -debug```
	3. This is typically locally on port 4444 at <http://localhost:4444/wd/hub>
	4. Run ```mocha tests```

###Spider Assignment 1
------
* git clone this repo
* checkout branch SpiderAssignment1
* npm install
* start the selenium server
* Get Comfy with CSS Selectors
* Get Comfy with the wd library (npm install it)
  * Read the documentation: https://github.com/admc/wd/blob/master/doc/api.md 
* Understand the existing code
  * What is a 'Page Object'
  * What is a callback
  * What is an async call
* Extend user login to verify another element on the home page
* NO CSS Selectors in the test files (ONLY in the page objects!)

###Spider Assignment 2  
* Add in more login tests
  * Invalid Username
    * Verify the error page & message
  * Invalid Password
    * Verify the error page & message
  * Admin login
    * Verify that you can see an admin feature or two on the home page after the login  
* NO CSS Selectors in the test files (ONLY in the page objects!)

###Spider Assignment 3
* Test a use case! 
* Create a new test file under scripts called adminVideoUpload.js
* Make a (very) short mp4 video
* Upload the video via the API (the same way it is uploaded from the website - use Charles Proxy or the Network tab to see what calls are made).
* After the video is uploaded, search for the video via your script on the home page & verify it's existance along with upload data
* Go to the video's home page and verify information on the page

###Assignment 1
------
* Run the existing google home page test (make sure it passes before you begin)
* Make a Mobiquity Home Page Object file 
* Add in another test to verify that clicking on the first link in the search results takes you to the mobiquity home page 
* Verify the title on the Mobiquity Home Page (make sure you wait until the page is loaded before checking the title)


###Assignment 2
------
* Make a new test file to test the mobiquity home page
* Verify at lesat 5 elements on the page
* Verify that you can click all the menu items
* Verify the title on each new page
* Make PageObjects for each new page so they each have a title property (similar to assignment 1 - MobiquityHomePage if you look at the solution branch)


###Assignment 3
------
* Verify the responsiveness of the home page
	* When shrunk to phone-size - what happens?
	* Look at the api.md documentation in the wd repository doc folder for help 
