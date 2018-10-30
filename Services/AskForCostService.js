const AskForCostTemplateTests = require('../Tests/Forms/AskForCostTemplateTests');

const AskForCostService = function (OPTIONS, driver) {
    let askForCost = new AskForCostTemplateTests(OPTIONS, driver);

    this.canEnterPage = function () {
        return askForCost.canEnterPageTest();
    };
    this.canSeeSelectedPool = function () {
        return askForCost.canSeeSelectedPoolTest();
    };
    this.canSeeForm = function () {
        return askForCost.canSeeFormTest();
    };
    this.canNotLeaveEmptyForm = function () {
        return askForCost.canNotLeaveEmptyFormTest();
    };
    this.canSeeRequiredFields = function () {
        return askForCost.canSeeRequiredFieldsTest();
    };
    this.emptyUserNameTest = function () {
        return askForCost.emptyUserNameTest();
    };
    this.emptyUserEmail = function () {
        return askForCost.emptyUserEmailTest();
    };
    this.emptyUserPhone = function () {
        return askForCost.emptyUserPhoneTest();
    };
    this.canRequestCost = function () {
        return askForCost.canRequestCostTest();
    };
    this.canSeeMap = function () {
        return askForCost.canSeeMapTest();
    };

};
module.exports = AskForCostService;