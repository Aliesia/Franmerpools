const TopMenuTests = require('../Tests/TopMenu/NavigationTests');
const ModelsTemplateTests = require('../Tests/TopMenu/ModelsTemplateTests');
const GalleryTemplateTests = require('../Tests/TopMenu/GalleryTemplateTests');
const AboutUsTemplateTests = require('../Tests/TopMenu/AboutUsTemplateTests');
const QuestionTemplateTests = require('../Tests/TopMenu/QuestionsTemplateTests');
const ContactsTemplateTests = require('../Tests/TopMenu/ContactsTemplateTests');


const TopMenuService = function (OPTIONS, driver) {
    let topMenu = new TopMenuTests(OPTIONS, driver);
    let topMenuModels = new ModelsTemplateTests(OPTIONS, driver);
    let topMenuGallery = new GalleryTemplateTests(OPTIONS, driver);
    let topMenuAboutUs = new AboutUsTemplateTests(OPTIONS, driver);
    let topMenuQuestions = new QuestionTemplateTests(OPTIONS, driver);
    let topMenuContacts = new ContactsTemplateTests(OPTIONS, driver);

    this.canSeeTopMenu = function () {
        return topMenu.canSeeTopMenuTest();
    };
    this.canEnterModels = function(){
        return topMenu.canEnterModelsTest();
    };
    this.canSeeFilter = function(){
        return topMenuModels.canSeeFilterTest();
    };
    this.canSeeModels = function(){
        return topMenuModels.canSeeModelsTest();
    };
    this.canEnterDetails = function(){
        return topMenuModels.canEnterDetailsTest();
    };
    this.canSwipe = function(){
        return topMenuModels.canSwipeTest();
    };
    this.canSeeColors = function(){
        return topMenuModels.canSeeColorsTest();
    };
    this.canSeeThesis = function(){
        return topMenuModels.canSeeThesisTest();
    };
    this.canAskCost = function(){
        return topMenuModels.canAskCostTest();
    };



    this.canEnterGallery = function(){
        return topMenu.canEnterGalleryTest();
    };
    this.canSeePictures = function(){
        return topMenuGallery.canSeePicturesTest();
    };
    this.canSeeAllPictures = function(){
        return topMenuGallery.canSeeAllPicturesTest();
    };



    this.canEnterAboutUs = function(){
        return topMenu.canEnterAboutUsTest();
    };
    this.canSeeFilter = function(){
        return topMenuAboutUs.canSeeFilterTest();
    };
    this.canSeeText = function(){
        return topMenuAboutUs.canSeeTextTest();
    };
    this.canSeePicture = function(){
        return topMenuAboutUs.canSeePictureTest();
    };
    this.canSeeTextTemplate = function(){
        return topMenuAboutUs.canSeeTextTemplateTest();
    };
    this.canSeePictureInTextTemplate = function(){
        return topMenuAboutUs.canSeePictureInTextTemplateTest();
    };
    this.canSeeMap = function(){
        return topMenuAboutUs.canSeeMapTest();
    };



    this.canEnterQuestions = function(){
        return topMenu.canEnterQuestionsTest();
    };
    this.canSeeAnswers = function(){
        return topMenuQuestions.canSeeAnswersTest();
    };



    this.canEnterContacts = function(){
        return topMenu.canEnterContactsTest();
    };
    this.canSeeFilter = function(){
        return topMenuContacts.canSeeFilterTest();
    };
    this.canSeeShowroom = function(){
        return topMenuContacts.canSeeShowroomTest();
    };
    this.canSeeSlider = function(){
        return topMenuContacts.canSeeSliderTest();
    };
    this.canSeeMap = function(){
        return topMenuContacts.canSeeMapTest();
    };



    this.canReturnStartPage = function(){
        return topMenu.canReturnStartPageTest();
    };
};
module.exports = TopMenuService;