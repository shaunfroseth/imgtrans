Instructions on how to run this app.

1. Install npm and yarn
2. cd into client folder and run command "npm run serve"
3. cd into server folder and run command "yarn dev"
4. Some variables inside code may need to be adjusted to generated live server dev URL that
is given by Vue. 

Please note: My API is NOT included in this package. I cannot give my key because I am billed
per use of said APIs. You may create your own Google Cloud Platform account and create your
own API key if you would wish. The program will not run with out it.

Inside package.json in server folder:
"dev": "env GOOGLE_APPLICATION_CREDENTIALS=\"<ADD PATH TO API KEY HERE>\" nodemon server/index.js"
