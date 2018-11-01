# SetUp Gide for Windows 10
## GUI tests on Chrome
1.Clone repository to a local folder. In console(terminal):
```
git clone https://github.com/Aliesia/Franmerpools.git
```
2.Install NodeJs.
Windows: 
Download the Windows installer from Nodejs.org.(find LTS Windows Installer (.msi) for 64-bit)
Run the installer (the .msi file you downloaded in the previous step.)
Follow the prompts in the installer (Accept the license agreement, click the NEXT button a bunch of times and accept the default installation settings).
---> check the NodeJs was installed(In terminal):
```
node -v
```
3.Download Selenium Webdriver for selected browser:
Install via npm (Or grab the source and node ./install.js)
```
npm install chromedriver 
```
4. Download Chrome WebDriver. ChromeDriver v2.43.*
Windows: 
Download ChromeDriver v2.43.* from the storage 
```
http://chromedriver.storage.googleapis.com/index.html
```
select latest version than download 
```
file:chromedriver_win32.zip
```
Move Chromedriver to Windows folder
---> check the Chromedriver was installed(In terminal):
```
chromedriver -v
```
5.Install Mocha(a feature-rich JavaScript test framework)
Install with npm globally(In terminal):
```
npm install --global mocha
```
or as a development dependency for your project:
```
npm install --save-dev mocha
```
---> check the Mocha was installed(In terminal):
```
mocha-v
```
6.Install Chai(an assertion library,)
type in Terminal:
```
npm install chai
```
---> check the Chai was installed(In terminal):
```
chai -v
```
7.Set up your test
Start project for Chrome (Controllers/AllTestsChromeContoller.js)run command(choose):
```
npm run testAllChrome
npm run testNavigation
npm run testHomePage 
npm run testTopMenu
npm run testCallForm
npm run testCostForm
```
*npm run testEdge - not available yet
