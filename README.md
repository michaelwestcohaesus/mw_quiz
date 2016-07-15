##Multiple choice quiz dynamically populated by JSON data

##Setup Instructions (OSX)
####In terminal, clone to your local machine,
```
git clone https://github.com/michaelwestcohaesus/mw_quiz
```
####Navigate to project directory,
```
cd ~/mw_quiz
```
####Install dependencies,
```
npm install
```
####Start the default gulp task,
```
gulp
```
####Now to run the project you will need to spin up a local server (because the json file is being served locally)
####If you have python2 installed you can
```
python -m SimpleHTTPServer
```
####and for python3
```
python3 -m http.server
```
####You can now access the files in your browser from
```
http://localhost:8000
```
####Or if node.js is your preference
```
npm install -g http-server
http-server -c-1
```
#### Files should be available at
```
http://localhost:8080
```
####Navigate into the dist folder where you will find index.html

####Gulp has been configured to:
- concat all js files
- convert .scss files to .css
- minify js, json, css and html
