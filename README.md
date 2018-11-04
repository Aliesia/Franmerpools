# SetUp Guide for Windows 10
## Requirements (optionaly):
+ Chromedriver
+ NodeJs
1. Install NodeJs.
Windows: 
+ Download the Windows installer from Nodejs.org.(find LTS Windows Installer (.msi) for 64-bit)
+ Run the installer (the .msi file you downloaded in the previous step.)
+ Follow the prompts in the installer (Accept the license agreement, click the NEXT button a bunch of times and accept the default installation settings).
+ Check the NodeJs was installed(In terminal):
```
node -v
```
2. ChromeDriver v2.43. for this project: 
+ Download ChromeDriver v2.43.*: chromedriver_win32.zip 
[Chromedriver v.2.43.* link](https://chromedriver.storage.googleapis.com/index.html?path=2.43/)
+ Unzip chromedriver_win32.zip
+ Move Chromedriver.exe to Windows folder
+ Check the Chromedriver was installed(In terminal):
```
chromedriver -v
```
## Main Project SetUp:
3. Clone repository to a local folder. In console(terminal):
```
git clone https://github.com/Aliesia/Franmerpools.git
```
4. Download project dependencies in folder with the project (In terminal).
```
npm install
```
5. Start tests.
+ For Chrome (Controllers/AllTestsChromeContoller.js) in project directory run any command:
```
npm run testAllChrome
npm run testNavigation
npm run testHomePage 
npm run testTopMenu
npm run testCallForm
npm run testCostForm
```
