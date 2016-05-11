'use strict';

var fs = require('fs');

describe('RESIMPLIFI', function() {


    beforeEach(function() {
        browser.ignoreSynchronization = true;

    });

    it('should login', function() {
        //browser.driver.get('https://login.salesforce.com/');
        browser.get(process.env.RESIMP_TEST_URL);
        snap('initial', 4000);
        expect(browser.driver.getTitle()).toBe('Login | Salesforce');
        //browser.sleep( 8000 );
        var username = element(by.id("username"));
        username.sendKeys(process.env.RESIMP_TEST_USER);
        var password = element(by.id("password"));
        password.sendKeys(process.env.RESIMP_TEST_PASSWORD);
        var login = element(by.id("Login"));
        snap('logging in', 2000);
        login.click();
        browser.sleep(4000);
        expect(browser.driver.getTitle()).toBe('REsimplifi');
    });

    it('should go to the first property', function() {

        expect(browser.getTitle()).toBe('REsimplifi');
        snap('login');

        //click on first property
        var row = element(by.css(".TransactionList__list-Row"));
        row.click();
        snap('Property');
    });

    it('should go to dashboard and add a note', function(){
        //dashboard aka notes
        var dashboard = element(by.css('a.dashboard'));
        dashboard.click();
        
        snap('Dashboard');
        var notearea = element(by.css(".NoteWidget__textarea")); 
        notearea.sendKeys('This is a brand new note');

        var noteButton = element(by.css(".NoteWidget__footer>.btn")); 
        noteButton.click();
        snap('NewNote', 4000);
    });

    it('should go to details tab', function(){
        //details
        var details = element(by.css('a.details'));
        details.click();
        snap('Details');
    });

    it('should go to documents tab', function(){
        var documents = element(by.css('a.documents'));
        documents.click();
        snap('Documents');

    });

    function snap(filename, sleep){
      sleep = sleep || 2000;
      browser.sleep(sleep);
      browser.takeScreenshot().then(function(png) {
            var stream = fs.createWriteStream(process.env.CIRCLE_ARTIFACTS + "/resimplifi_" + filename + '.png');
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        });
    }


});
