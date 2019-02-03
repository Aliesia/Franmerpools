const AskForCallTemplateTests = require('../Tests/Forms/AskForCallTemplateTests');
const AskForCallService = function (OPTIONS, driver) {
    let askForCall = new AskForCallTemplateTests(OPTIONS, driver);

    this.canSeeForm = function () {
        return askForCall.canSeeFormTest();
    };
    this.canNotLeaveEmptyForm = function () {
         return askForCall.canNotLeaveEmptyFormTest()
    };
    this.emptyUserPhone = function () {
        return askForCall.emptyUserPhoneTest();
    };
    this.emptyUserName = function () {
        return askForCall.emptyUserNameTest();
    };
    this.canSuccessfullyAskForCall = function () {
        return askForCall.canSuccessfullyAskForCallTest();
    };

};
module.exports = AskForCallService;