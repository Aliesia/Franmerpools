const webdriver = require('selenium-webdriver');
const {describe,it,afterEach,beforeEach} = require('mocha');
const chrome = require('selenium-webdriver/chrome');
const OPTIONS = {
    site: 'http://franmer.breakdownfx.com/',
    screen:{
        width: 1280,
        height: 720
    }
};
const TopMenuService = require('../Services/TopMenuService');
const HomePageService = require('../Services/HomePageService');
const AskForCallService = require('../Services/AskForCallService');
const AskForCostService = require('../Services/AskForCostService');


describe('Main navigation check',function(){
    let topMenuService;
    let driver;
    this.timeout(10 * 1000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
        topMenuService = new TopMenuService(OPTIONS, driver);
    });

    afterEach(function () {
       driver.close();
    });

    it('Can see top menu', function () {
        return topMenuService.canSeeTopMenu();
    });
    it('Can enter model series', function () {
       return topMenuService.canEnterModels();
    });
    it('Can enter gallery', function () {
        return topMenuService.canEnterGallery();
    });
    it('Can enter aboutUs', function () {
       return topMenuService.canEnterAboutUs();
    });
    it('Can enter questions', function () {
        return topMenuService.canEnterQuestions();
    });
    it('Can enter contacts', function () {
        return topMenuService.canEnterContacts();
    });
    it('Can return on MainPage', function () {
        return topMenuService.canReturnStartPage();
    });
});

describe('Home page functionality',function() {
    let driver;
    let homePageService;
    this.timeout(50000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
        homePageService = new HomePageService(OPTIONS, driver);
    });
    afterEach(function () {
        driver.close();
    });

    it('Header button on first template is working properly', function () {
        return homePageService.headerButton();
    });
    it('Footer svg-button on first template move to next template', function () {
        return homePageService.footerButton();
    });
    it('Can see map on second template', function(){
        return homePageService.canSeeMap();
    });
    it('Can see video on template 3', function () {
       return homePageService.canSeeVideo();
    });
    it('Smaller button on template 3 is working properly', function () {
        return homePageService.smallButton();
    });
    it('Button on template 4 is working properly', function () {
        return homePageService.linkButton();
    });
    it('Can swipe to another picture from template 4', function(){
        return homePageService.swipeButton();
    });
    it('Can see image on template 5', function () {
        return homePageService.teamImage();
    });
    it('Can select a worker on template 5', function(){
        return homePageService.workerOnTeamImage();
    });
    it('Can see form on template 6', function () {
        return homePageService.canSeeForm();
    });
});


describe('Main navigation templates',function(){
    let driver;
    let topMenuService;
    this.timeout(30000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
        topMenuService = new TopMenuService(OPTIONS, driver);
    });
    afterEach(function () {
        driver.close();
    });

    it('Can see filter of models', function () {
        return topMenuService.canSeeFilter();
    });
    it('Can see models on model series', function () {
        return topMenuService.canSeeModels();
    });
    it('Can enter details', function () {
        return topMenuService.canEnterDetails();
    });
    it('Can swipe pictures', function () {
       return topMenuService.canSwipe();
    });
    it('Can see available colors of selected model', function () {
        return topMenuService.canSeeColors();
    });
    it('Can see thesis', function () {
        return topMenuService.canSeeThesis();
    });
    it('Can ask project cost', function () {
        return topMenuService.canAskCost();
    });


    it('Can see picture in Gallery', function(){
        return topMenuService.canSeePictures();
    });
    it('Can see all pictures in Gallery', function(){
        return topMenuService.canSeeAllPictures();
    });
    it('Can see filter of information about us', function () {
        return topMenuService.canSeeFilter();
    });
    it('Can see text in about us', function () {
        return topMenuService.canSeeText();
    });
    it('Can see picture in about us', function () {
        return topMenuService.canSeePicture();
    });
    it('Can see text template in about us', function () {
        return topMenuService.canSeeTextTemplate();
    });
    it('Can see text template with picture in about us', function () {
        return topMenuService.canSeePictureInTextTemplate();
    });
    it('Can see map in about us', function () {
        return topMenuService.canSeeMap();
    });
    it('Can see answers on questions', function () {
        return topMenuService.canSeeAnswers();
    });
    it('Can see filter of places in contacts', function () {
        return topMenuService.canSeeFilter();
    });
    it('Can see selected showroom in contacts', function () {
        return topMenuService.canSeeShowroom();
    });
    it('Can see slider of selected showroom in contacts', function () {
        return topMenuService.canSeeSlider();
    });
    it('Can see map of showrooms in contacts', function () {
        return topMenuService.canSeeMap();
    });
});


describe('Ask for a call form',function() {
    let driver;
    let askForCallService;
    this.timeout(50000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
        askForCallService = new AskForCallService(OPTIONS, driver);

    });
    afterEach(function () {
        driver.close();
    });

    it('Can see form template on main page', function(){
        return askForCallService.canSeeForm();
    });
    it('Can not leave empty fields in form', function () {
        return askForCallService.canNotLeaveEmptyForm();
    });
    it('User phone is required', function () {
        return askForCallService.emptyUserPhone();
    });
    it('User name is required', function () {
        return askForCallService.emptyUserName();
    });
    it('User successfully ask for a call', function() {
        return askForCallService.canSuccessfullyAskForCall();
    });
});

describe('Can ask for a cost of selected pool',function() {
    let driver;
    let askForCostService;
    this.timeout(50000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
        askForCostService = new AskForCostService(OPTIONS, driver);
    });
    afterEach(function () {
        driver.close();
    });

    it('Can enter page with pool cost', function () {
        return askForCostService.canEnterPage();

    });
    it('Can see selected pool on page with cost calculate', function () {
        return askForCostService.canSeeSelectedPool();
    });
    it('Can see form on page with cost calculate', function () {
        return askForCostService.canSeeForm();
    });
    it('Can not leave empty fields in form', function () {
        return askForCostService.canNotLeaveEmptyForm();
    });
    it('Can find required attribute in form',function () {
        return askForCostService.canSeeRequiredFields();
    });
    it('User name is required',function () {
        return askForCostService.emptyUserNameTest();
    });
    it('User email is required',function () {
        return askForCostService.emptyUserEmail();
    });
    it('User phone is required',function () {
        return askForCostService.emptyUserPhone();
    });
    it('Can order payment cost of selected pool',function () {
        return askForCostService.canRequestCost();
    });
    it('Can find map on page with cost calculate', function () {
        return askForCostService.canSeeMap();
    });

});