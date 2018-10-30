const HomePageTests = require('../Tests/HomePage/HomePageTemplatesTests');

const HomePageService = function (OPTIONS, driver) {
    let homePage = new HomePageTests(OPTIONS, driver);

    this.headerButton = function () {
        return homePage.headerButtonTest();
    };
    this.footerButton = function () {
        return homePage.footerButtonTest();
    };
    this.canSeeMap = function () {
        return homePage.canSeeMapTest();
    };
    this.canSeeVideo = function () {
        return homePage.canSeeVideoTest();
    };
    this.smallButton = function () {
        return homePage.smallButtonTest();
    };
    this.linkButton = function () {
        return homePage.linkButtonTest();
    };
    this.swipeButton = function () {
        return homePage.swipeButtonTest();
    };
    this.teamImage = function () {
        return homePage.teamImageTest();
    };
    this.workerOnTeamImage = function () {
        return homePage.workerOnTeamImageTest();
    };
    this.canSeeForm = function () {
        return homePage.canSeeFormTest();
    };


};
module.exports = HomePageService;