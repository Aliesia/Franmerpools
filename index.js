const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const OPTIONS = {
    site: 'https://www.franmerpools.ru/',
    screen:{
        width: 1280,
        height: 720
    }
};

let chromeCapabilities = webdriver.Capabilities.chrome();
let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
let driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();


driver.get(OPTIONS.site)
    .then(_=> console.log('entered site'))
    .then (_=> driver.quit(driver));