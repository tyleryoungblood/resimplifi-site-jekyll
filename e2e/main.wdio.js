var chai = require('chai'),
    assert = chai.assert;
var webdriverio = require('webdriverio');
//credentials
var conf = require('./../gulp-jsforce/jsforce.config');

var defaultCredentials = conf.credentials[0];
var username = defaultCredentials.username;
var password = defaultCredentials.password;


describe('REsimplifi e2e', function () {

    this.timeout(99999999);
    var client = {};

    before(function (done) {
        client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' } });
        client.init(done);
    });

    it('should login', function (done) {
        client
            .url('https://login.salesforce.com/')
            .getTitle(function (err, title) {
                assert.strictEqual(title, 'Login | Salesforce');
            })
            .setValue('#username', username)
            .setValue('#password', password)
            .saveScreenshot('./e2e/screenshots/login.png')
            .click('#Login')
            .waitForVisible('#tsidButton', 30000)
            .getUrl().then(function (url) {
                var host = url.split('//')[0];
                var site = url.split('//')[1].split('/')[0];
                var resiplifiApp = `${host}\/\/${site}\/apex\/sparesimplifi`;
                client.url(resiplifiApp);
                client.getTitle(function (err, title) {
                    assert.strictEqual(title, 'REsimplifi');
                })
            })
            .call(done);
    });
    
    it('should create a Buyer Transaction', (done) => {
        client
            // Click the create new Buyer Transaction Button
            .click('div.MainNavBar__logo-container a.logo')
            .waitForExist('.TransactionList__link.btn', 7000)
            .click('.TransactionList__link.btn')
            .waitForExist('.TransactionList__dropdown-menu a.Buyer', 5000)
            .click('.TransactionList__dropdown-menu a.Buyer')
            // Fill out Notes tab
            .waitForExist('[id*="Listing_Agreement_Commencement_Date__c"]', 5000)
            .addValue('[id*="Listing_Agreement_Commencement_Date__c"]', '01012016')
            .addValue('[id*="Listing_Agreement_Expiration_Date__c"]', '06302016')
            .setValue('[id*="Agent_Commission__c"]', '5')
            .setValue('[id*="Search_Square_Footage__c"]', '5000')
            .addValue('[id*="Search_Property_Type__c"]', 'Retail')
            .setValue('[id*="Search_Market_Submarket__c"]', 'Clothing and Apparel')
            .setValue('[id*="Search_Parking_Spaces__c"]', '50')
            .setValue('[id*="Total_Sales_Price__c"]', '500000')
            // Save screenshots, then go to Property tab
            .saveScreenshot('./e2e/screenshots/buyerNotesTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Listing_Agreement_Commencement_Date__c"]', 5000)
            .saveScreenshot('./e2e/screenshots/buyerNotesTabAfterSave.png')
            .click('a.property')
            // Fill out property tab
            .waitForExist('[id*="Type__c"]', 5000)
            .addValue('[id*="Type__c"]', 'Retail')
            .setValue('[id*="input_Name"]', 'A wonderful place to work')
            .setValue('[id*="Address__c"]', '100 Cherokee Blvd #320')
            .setValue('[id*="City__c"]', 'Chattanooga')
            .setValue('[id*="State__c"]', 'TN')
            .setValue('[id*="PostalCode__c"]', '37405')
            .setValue('[id*="Zoning__c"]', 'Commercial / Retail')
            .setValue('[id*="Tax_ID_Number__c"]', '10123C')
            .setValue('[id*="Ownership_Name_Legal_Entity__c"]', 'CodeScience')
            .setValue('[id*="Parking_Available__c"]', '500')
            .setValue('[id*="Description__c"]', 'A fantastic property with spacious offices')
            .setValue('[id*="Total_Building_Size__c"]', '500000')
            .setValue('[id*="Floors__c"]', '3')
            .setValue('[id*="Year_Built__c"]', '1945')
            .setValue('[id*="Common_Area_Factor__c"]', '20')
            .setValue('[id*="Acreage__c"]', '1.25')
            // Save screenshots, then go to Transaction Details
            .saveScreenshot('./e2e/screenshots/buyerPropertyTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Type__c"]', 5000)
            .saveScreenshot('./e2e/screenshots/buyerPropertyTabAfterSave.png')
            .click('a.details')
            // Fill out details tab
            .waitForExist('#addSuite', 5000).then( () => {
                var addSuite = client.element('#addSuite');
                if(!addSuite.isSelected()){
                    addSuite.click();
                }
            })
            .setValue('[id*="Suite__c"]', '320')
            .setValue('[id*="Suite_Size__c"]', '1000')
            .setValue('[id*="Suite_Description__c"]', 'A beatiful open space with views of downtown Chattanooga')
            .addValue('[id*="Earnest_Money_Sale__c"]', 'No')
            .addValue('[id*="Close_Date_Sale__c"]', '03012016')
            .addValue('[id*="Due_Diligence_Period_Expiration_Date__c"]', '05012016')
            .setValue('[id*="Warn_Commission_Percent__c"]', '10')
            .setValue('[id*="Company_Commission_Percent__c"]', '10')
            .addValue('[id*="Commission_To_Be_Paid_By__c"]', 'Buyer')
            .addValue('[id*="Commission_Notes__c"]', 'Some test notes for the agent')
            // Save screenshots, then go to Documents Tab
            .saveScreenshot('./e2e/screenshots/buyerDetailsTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Earnest_Money_Sale__c"]', 7000)
            .saveScreenshot('./e2e/screenshots/buyerDetailsTabAfterSave.png')
            .click('a.documents')
            // Take screenshot of documents tab
            .waitForExist('.DonutChart__container', 5000)
            .saveScreenshot('./e2e/screenshots/buyerDocumentsTab.png')
            .call(done);
    });
    
    it('should create a Seller Transaction', (done) => {
        client
            // Click the create new Seller Transaction Button
            .click('div.MainNavBar__logo-container a.logo')
            .waitForExist('.TransactionList__link.btn', 5000)
            .click('.TransactionList__link.btn')
            .waitForExist('.TransactionList__dropdown-menu a.Seller', 5000)
            .click('.TransactionList__dropdown-menu a.Seller')
            // Fill out Notes tab
            .waitForExist('[id*="Listing_Agreement_Commencement_Date__c"]', 5000)
            .addValue('[id*="Listing_Agreement_Commencement_Date__c"]', '01012016')
            .addValue('[id*="Listing_Agreement_Expiration_Date__c"]', '06302016')
            .setValue('[id*="Commission_Percent__c"]', '5')
            .setValue('[id*="Total_Sales_Price__c"]', '500000')
            // Save screenshots, then go to Property tab
            .saveScreenshot('./e2e/screenshots/sellerNotesTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Listing_Agreement_Commencement_Date__c"]', 5000)
            .saveScreenshot('./e2e/screenshots/sellerNotesTabAfterSave.png')
            .click('a.property')
            // Fill out property tab
            .waitForExist('[id*="Type__c"]', 5000)
            .addValue('[id*="Type__c"]', 'Retail')
            .setValue('[id*="input_Name"]', 'A wonderful place to work')
            .setValue('[id*="Address__c"]', '100 Cherokee Blvd #320')
            .setValue('[id*="City__c"]', 'Chattanooga')
            .setValue('[id*="State__c"]', 'TN')
            .setValue('[id*="PostalCode__c"]', '37405')
            .setValue('[id*="Zoning__c"]', 'Commercial / Retail')
            .setValue('[id*="Tax_ID_Number__c"]', '10123C')
            .setValue('[id*="Ownership_Name_Legal_Entity__c"]', 'CodeScience')
            .setValue('[id*="Parking_Available__c"]', '500')
            .setValue('[id*="Description__c"]', 'A fantastic property with spacious offices')
            .setValue('[id*="Total_Building_Size__c"]', '500000')
            .setValue('[id*="Floors__c"]', '3')
            .setValue('[id*="Year_Built__c"]', '1945')
            .setValue('[id*="Common_Area_Factor__c"]', '20')
            .setValue('[id*="Acreage__c"]', '1.25')
            // Save screenshots, then go to Transaction Details
            .saveScreenshot('./e2e/screenshots/sellerPropertyTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Type__c"]', 5000)
            .saveScreenshot('./e2e/screenshots/sellerPropertyTabAfterSave.png')
            .click('a.details')
            // Fill out details tab
            .waitForExist('#addSuite', 5000).then( () => {
                var addSuite = client.element('#addSuite');
                if(!addSuite.isSelected()){
                    addSuite.click();
                }
            })
            .setValue('[id*="Suite__c"]', '320')
            .setValue('[id*="Suite_Size__c"]', '1000')
            .setValue('[id*="Suite_Description__c"]', 'A beatiful open space with views of downtown Chattanooga')
            .addValue('[id*="Earnest_Money_Sale__c"]', 'No')
            .addValue('[id*="Close_Date_Sale__c"]', '03012016')
            .addValue('[id*="Due_Diligence_Period_Expiration_Date__c"]', '05012016')
            .setValue('[id*="Warn_Commission_Percent__c"]', '10')
            .setValue('[id*="Company_Commission_Percent__c"]', '10')
            .addValue('[id*="Commission_To_Be_Paid_By__c"]', 'Seller')
            .addValue('[id*="Commission_Notes__c"]', 'Some test notes for the agent')
            // Save screenshots, then go to Documents Tab
            .saveScreenshot('./e2e/screenshots/sellerDetailsTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Earnest_Money_Sale__c"]', 7000)
            .saveScreenshot('./e2e/screenshots/sellerDetailsTabAfterSave.png')
            .click('a.documents')
            // Take screenshot of documents tab
            .waitForExist('.DonutChart__container', 5000)
            .saveScreenshot('./e2e/screenshots/sellerDocumentsTab.png')
            .call(done);
    });
        
    it('should create a Landlord Transaction', (done) => {
        client
            // Click the create new Landlord Transaction Button
            .click('div.MainNavBar__logo-container a.logo')
            .waitForExist('.TransactionList__link.btn', 5000)
            .click('.TransactionList__link.btn')
            .waitForExist('.TransactionList__dropdown-menu a.Landlord', 5000)
            .click('.TransactionList__dropdown-menu a.Landlord')
            // Fill out Notes tab
            .waitForExist('[id*="Listing_Agreement_Commencement_Date__c"]', 5000)
            .addValue('[id*="Listing_Agreement_Commencement_Date__c"]', '01012016')
            .addValue('[id*="Listing_Agreement_Expiration_Date__c"]', '06302016')
            .setValue('[id*="Commission_Percent__c"]', '5')
            .setValue('[id*="Search_Yearly_Square_Foot_Rate__c"]', '12')
            .setValue('[id*="Search_Yearly_Square_Foot_Rate_Increase__c"]', '1.25')
            .setValue('[id*="Search_Projected_Term_Years__c"]', '5')
            // Save screenshots, then go to Property tab
            .saveScreenshot('./e2e/screenshots/landlordNotesTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Listing_Agreement_Commencement_Date__c"]', 5000)
            .saveScreenshot('./e2e/screenshots/landlordNotesTabAfterSave.png')
            .click('a.property')
            // Fill out property tab
            .waitForExist('[id*="Type__c"]', 5000)
            .addValue('[id*="Type__c"]', 'Retail')
            .setValue('[id*="input_Name"]', 'A wonderful place to work')
            .setValue('[id*="Address__c"]', '100 Cherokee Blvd #320')
            .setValue('[id*="City__c"]', 'Chattanooga')
            .setValue('[id*="State__c"]', 'TN')
            .setValue('[id*="PostalCode__c"]', '37405')
            .setValue('[id*="Zoning__c"]', 'Commercial / Retail')
            .setValue('[id*="Tax_ID_Number__c"]', '10123C')
            .setValue('[id*="Ownership_Name_Legal_Entity__c"]', 'CodeScience')
            .setValue('[id*="Parking_Available__c"]', '500')
            .setValue('[id*="Description__c"]', 'A fantastic property with spacious offices')
            .setValue('[id*="Total_Building_Size__c"]', '500000')
            .setValue('[id*="Floors__c"]', '3')
            .setValue('[id*="Year_Built__c"]', '1945')
            .setValue('[id*="Common_Area_Factor__c"]', '20')
            .setValue('[id*="Acreage__c"]', '1.25')
            // Save screenshots, then go to Transaction Details
            .saveScreenshot('./e2e/screenshots/landlordPropertyTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Type__c"]', 5000)
            .saveScreenshot('./e2e/screenshots/landlordPropertyTabAfterSave.png')
            .click('a.details')
            // Fill out details tab
            .waitForExist('#addSuite', 5000).then( () => {
                var addSuite = client.element('#addSuite');
                if(!addSuite.isSelected()){
                    addSuite.click();
                }
            })
            .setValue('[id*="Suite__c"]', '320')
            .setValue('[id*="Suite_Size__c"]', '1000')
            .setValue('[id*="Suite_Description__c"]', 'A beatiful open space with views of downtown Chattanooga')
            
            .addValue('[id*="Lease_Commencement_Date__c"]', '03012016')
            .addValue('[id*="Lease_Expiration_Date__c"]', '02282017')
            .setValue('[id*="Base_Year__c"]', '2016')
            .setValue('[id*="Security_Deposit_Held_By__c"]', 'John Smith')
            .setValue('[id*="Improvement_Allowance__c"]', '10.00')
            .setValue('[id*="Additional_Concessions__c"]', 'Candy for the kids')
            
            .addValue('[id*="Security_Deposit_Lease__c"]', 'Yes')
            .setValue('[id*="Security_Deposit_Amount__c"]', '15000')
            
            .setValue('[id*="Warn_Commission_Percent__c"]', '10')
            .setValue('[id*="Company_Commission_Percent__c"]', '10')
            .addValue('[id*="Commission_To_Be_Paid_By__c"]', 'Landlord')
            .addValue('[id*="Commission_Notes__c"]', 'Some test notes for the agent')
            // Save screenshots, then go to Documents Tab
            .saveScreenshot('./e2e/screenshots/landlordDetailsTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Lease_Commencement_Date__c"]', 7000)
            .saveScreenshot('./e2e/screenshots/landlordDetailsTabAfterSave.png')
            .click('a.documents')
            // Take screenshot of documents tab
            .waitForExist('.DonutChart__container', 5000)
            .saveScreenshot('./e2e/screenshots/landlordDocumentsTab.png')
            .call(done);
    });
        
        
    it('should create a Tenant Transaction', (done) => {
        client
            // Click the create new Tenant Transaction Button
            .click('div.MainNavBar__logo-container a.logo')
            .waitForExist('.TransactionList__link.btn', 5000)
            .click('.TransactionList__link.btn')
            .waitForExist('.TransactionList__dropdown-menu a.Tenant', 5000)
            .click('.TransactionList__dropdown-menu a.Tenant')
            // Fill out Notes tab
            .waitForExist('[id*="Listing_Agreement_Commencement_Date__c"]', 5000)
            .addValue('[id*="Listing_Agreement_Commencement_Date__c"]', '01012016')
            .addValue('[id*="Listing_Agreement_Expiration_Date__c"]', '06302016')
            .setValue('[id*="Agent_Commission__c"]', '5')
            // Notes Search
            .setValue('[id*="Search_Square_Footage__c"]', '2000')
            .addValue('[id*="Search_Property_Type__c"]', 'Retail')
            .setValue('[id*="Search_Market_Submarket__c"]', 'Clothing store')
            
            .setValue('[id*="Search_Yearly_Square_Foot_Rate__c"]', '12.00')
            .setValue('[id*="Search_Yearly_Square_Foot_Rate_Increase__c"]', '1.25')
            .setValue('[id*="Search_Projected_Term_Years__c"]', '5')
            .setValue('[id*="Search_Parking_Spaces__c"]', '50')
            .addValue('[id*="Search_Projected_Occupancy_Date__c_0"]', '07012016')
            .setValue('[id*="Search_Additional_Notes__c"]', 'They want red walls')
            // Save screenshots, then go to Property tab
            .saveScreenshot('./e2e/screenshots/tenantNotesTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Listing_Agreement_Commencement_Date__c"]', 5000)
            .saveScreenshot('./e2e/screenshots/tenantNotesTabAfterSave.png')
            .click('a.property')
            // Fill out property tab
            .waitForExist('[id*="Type__c"]', 5000)
            .addValue('[id*="Type__c"]', 'Retail')
            .setValue('[id*="input_Name"]', 'A wonderful place to work')
            .setValue('[id*="Address__c"]', '100 Cherokee Blvd #320')
            .setValue('[id*="City__c"]', 'Chattanooga')
            .setValue('[id*="State__c"]', 'TN')
            .setValue('[id*="PostalCode__c"]', '37405')
            .setValue('[id*="Zoning__c"]', 'Commercial / Retail')
            .setValue('[id*="Tax_ID_Number__c"]', '10123C')
            .setValue('[id*="Ownership_Name_Legal_Entity__c"]', 'CodeScience')
            .setValue('[id*="Parking_Available__c"]', '500')
            .setValue('[id*="Description__c"]', 'A fantastic property with spacious offices')
            .setValue('[id*="Total_Building_Size__c"]', '500000')
            .setValue('[id*="Floors__c"]', '3')
            .setValue('[id*="Year_Built__c"]', '1945')
            .setValue('[id*="Common_Area_Factor__c"]', '20')
            .setValue('[id*="Acreage__c"]', '1.25')
            // Save screenshots, then go to Transaction Details
            .saveScreenshot('./e2e/screenshots/tenantPropertyTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Type__c"]', 5000)
            .saveScreenshot('./e2e/screenshots/tenantPropertyTabAfterSave.png')
            .click('a.details')
            // Fill out details tab
            .waitForExist('#addSuite', 5000).then( () => {
                var addSuite = client.element('#addSuite');
                if(!addSuite.isSelected()){
                    addSuite.click();
                }
            })
            .setValue('[id*="Suite__c"]', '320')
            .setValue('[id*="Suite_Size__c"]', '1000')
            .setValue('[id*="Suite_Description__c"]', 'A beatiful open space with views of downtown Chattanooga')
            
            .addValue('[id*="Lease_Commencement_Date__c"]', '03012016')
            .addValue('[id*="Lease_Expiration_Date__c"]', '02282017')
            .setValue('[id*="Base_Year__c"]', '2016')
            // Security Deposit
            .addValue('[id*="Security_Deposit_Lease__c"]', 'Yes')
            .setValue('[id*="Security_Deposit_Amount__c"]', '15000')
            .setValue('[id*="Security_Deposit_Held_By__c"]', 'John Smith')
            .setValue('[id*="Improvement_Allowance__c"]', '10.00')
            .setValue('[id*="Additional_Concessions__c"]', 'Candy for the kids')
            
            .setValue('[id*="Warn_Commission_Percent__c"]', '10')
            .setValue('[id*="Company_Commission_Percent__c"]', '10')
            .addValue('[id*="Commission_To_Be_Paid_By__c"]', 'Tenant')
            .addValue('[id*="Commission_Notes__c"]', 'Some test notes for the agent')
            // Save screenshots, then go to Documents Tab
            .saveScreenshot('./e2e/screenshots/tenantDetailsTabBeforeSave.png')
            .click('.PropertyView__button-right')
            .waitForExist('[id*="Lease_Commencement_Date__c"]', 7000)
            .saveScreenshot('./e2e/screenshots/tenantDetailsTabAfterSave.png')
            .click('a.documents')
            // Take screenshot of documents tab
            .waitForExist('.DonutChart__container', 5000)
            .saveScreenshot('./e2e/screenshots/tenantDocumentsTab.png')
            .call(done);
    });
        

    after(function (done) {
        client.end(done);
    });
});
