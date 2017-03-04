# Banno-Boot-Camp-Application-Assignment
### Author: Keith A Cissell
### Last Updated: 3/4/2017

# OVERVIEW
This programming project is the first step in the application process for the JHBanno summer internship.
The goal of this assignment is to retrieve HTML data from Banno.com through HTTP. 
Once the data has been received, there are five analytical functions that the program must perform on the data:
- A count of the number of Platform Features offered.
- The top 3 occuring alphanumeric characters contained in the HTML, and how many times each occurs.
- The number of .png images in the HTML.
- BannoJHA’s Twitter handle: this should work if the Twitter name were to change.
- The number of times the term “financial institution” occurs in text.

# REQUIREMENTS
Node.js must be installed to run this program. It can be downloaded here https://nodejs.org/en/download/
This repository must be cloned or downloaded onto your local machine.

# SETUP
- Clone or download: https://github.com/KeithCissell/Banno-Boot-Camp-Application-Assignment.git 
- Open a terminal window
- Navigate to ./Banno-Boot-Camp-Application-Assignment/ of your local copy
- Run command: npm install
- Run command: npm start

# USAGE
Once the app has been launched you can use the HTML Analyzer on any site you wish.
### HTML Analyzer
In the URL text input field you can enter a valid URL and then click the 'Submit' button to analyze this site's HTML.
You can also click the link below the URL input field to analyze Banno's site.
The data collected from the analysis will then be displayed below in the Data Analysis area.
### Data Analysis
Overview of Site: This section looks for headers within the site's HTML and displays them as a condensed overview of the page.
Top 3 Alphanumeric Characters: finds the 3 most used anum characters and the number of times they're used.
Images on the Page: finds the number of .png, .jpg and .gif images on the page.
Special Banno Data!: displays data specific to Banno's site only
### Search for a Phrase
Once a site has been selected for analysis, you can look for a phrase within the site's HTML.
Use the phrase text input field to type in a phrase you want to search for and click the 'Search' button.
The number of times the entered phrase was found is then displayed to the user.