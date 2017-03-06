window.$ = window.jQuery = require('jquery');
const fetch = require('node-fetch');

// Globals
let URL = "";
let HTML = document.createElement('html');
let TEXT = "";

// Input Fields
const tryBanno = document.getElementById("try-banno");
const inputURL = document.getElementById("input-url");
const submitURL = document.getElementById("submit-url");
const inputPhrase = document.getElementById("phrase-input");
const searchPhrase = document.getElementById("search-phrase");
tryBanno.addEventListener('click', useBanno, false);
submitURL.addEventListener('click', fetchSite, false);
searchPhrase.addEventListener('click', findPhrase, false);

// Output Fields
const overviewTitle = document.getElementById("overview-title");
const overview = document.getElementById("overview");
const anums = document.getElementById("anums");
const topAnums = anums.getElementsByTagName("span");
const images = document.getElementById("images");
const imgTypes = images.getElementsByTagName("span");
const bannoData = document.getElementById("banno-data");
const phraseResult = document.getElementById("phrase-result");

// Set overview height acording to screen size
let totalHeight = screen.height;
let ovHeight = Math.round(totalHeight * .3);
let height = ovHeight + "px";
console.log(height);
overview.style.maxHeight = height;


// Grabs input site, analyzes and outputs data
function fetchSite(callback) {
    let URL = inputURL.value;
    fetch(URL).then(function(resp) {
        return resp.text()
    }, function(err) {
        alert("Could not fetch " + URL);
        return false;
    }).then(function(text) {
        if (text) {
            TEXT = text;
            HTML.innerHTML = text;
            cleanPage();
            generateOverview();
            charUsage();
            findIMGs();
        }
        return true;
    }).then(function(done) {
        if (done && URL === "https://banno.com") {
            findFeatures();
            inputPhrase.value = "financial institution";
            findPhrase();
        };
    }).catch(function(err) {
        console.log(err);
    });
}

// Cleans data from previous results
function cleanPage() {
    overviewTitle.innerHTML = "Site";
    overview.innerHTML = "";
    overview.style.border = "";
    phraseResult.innerHTML = "";
    inputPhrase.value = "";
    bannoData.innerHTML = "";
    for (let i in topAnums) {
        topAnums[i].innerHTML = "";
    }
    for (let i in imgTypes) {
        imgTypes[i].innerHTML = "";
    }
}

// Grab H1, H2, and H3 tags to create an overview of site
function generateOverview() {
    let title = HTML.getElementsByTagName("title")[0];
    overviewTitle.innerHTML = title.innerText;
    let heads = HTML.querySelectorAll("h1, h2, h3");
    for (let h = 0; h < heads.length; h++) {
        let lvl = heads[h].tagName;
        let head = document.createElement('h6');
        head.innerText = heads[h].innerText.trim();
        if (lvl === "H1") {
            head.className = "header1";
        } else if (lvl === "H2") {
            head.className = "header2";
        } else if (lvl === "H3") {
            head.className = "header3";
        }
        overview.appendChild(head);
    }
    overview.style.border = "3px solid dodgerblue";
}

// Find the topo 3 anum characters used
function charUsage() {
    // Convert html to lowercase and remove all non-alphanumerics
    let text = TEXT.toUpperCase().replace(/[^a-z0-9]/gi, '');
    let charDict = {};
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (charDict[c] == undefined) {
            charDict[c] = 1;
        } else {
            charDict[c] += 1;
        }
    }
    // Find the 3 most used characters
    let first = ['', 0];
    let second = ['', 0];
    let third = ['', 0];
    for (c in charDict) {
        if (charDict[c] > first[1]) {
            third[0] = second[0];
            third[1] = second[1];
            second[0] = first[0];
            second[1] = first[1];
            first[0] = c;
            first[1] = charDict[c];
        } else if (charDict[c] > second[1]) {
            third[0] = second[0];
            third[1] = second[1];
            second[0] = c;
            second[1] = charDict[c];
        } else if (charDict[c] > third[1]) {
            third[0] = c;
            third[1] = charDict[c];
        }
    }
    // Display data to user
    topAnums[0].innerHTML = first[0] + " scored " + first[1];
    topAnums[1].innerHTML = second[0] + " scored " + second[1];
    topAnums[2].innerHTML = third[0] + " scored " + third[1];
}

// Searches from number of png images in html
function findIMGs() {
    let pngs = 0;
    let jpgs = 0;
    let gifs = 0;
    let imgs = HTML.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        let src = imgs[i].src.toString();
        if (src.match(/.*\.png/)) {
            pngs += 1;
        } else if (src.match(/.*\.jpg/)) {
            jpgs += 1;
        } else if (src.match(/.*\.gif/)) {
            gifs += 1;
        }
    }
    imgTypes[0].innerHTML = pngs;
    imgTypes[1].innerHTML = jpgs;
    imgTypes[2].innerHTML = gifs;
}

// Searches for a phrase in html
function findPhrase() {
    let phrase = inputPhrase.value;
    let re = new RegExp(phrase, "g");
    let matches = TEXT.match(re);
    let result = "";
    if (matches) {
        result = phrase + " was found " + matches.length + " times.";
    } else {
        result = phrase + " was not found.";
    }
    phraseResult.innerHTML = result;
}

// Test page on Banno's site
function useBanno() {
    inputURL.value = "https://banno.com";
    fetchSite();
}

// Special for Banno page analysis
function createBannoDiv(featuresResult) {
    let head = document.createElement('h3');
    head.innerText = "Special Banno Data!";
    bannoData.appendChild(head);
    let twitter = document.createElement('h4');
    let handle = twitterHandle();
    let twt = "Twitter Handle: <span>" + handle + "</span>";
    twitter.innerHTML = twt;
    bannoData.appendChild(twitter);
    let features = document.createElement('h4');
    let ft = "Platform Features: <span>" + featuresResult + "</span>";
    features.innerHTML = ft;
    bannoData.appendChild(features);
}

// Finds the meta tag containing twitter handle
function twitterHandle() {
    let metaTags = HTML.getElementsByTagName("meta");
    let handle = "";
    for (var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].name == "twitter:site") {
            handle = metaTags[i].content;
        }
    }
    return handle;
}

// Finds the number of platform features offered by Banno
function findFeatures() {
    let featHTML = document.createElement('html');
    fetch("https://banno.com/features").then(function(resp) {
        return resp.text();
    }, function(err) {
        throw new Error("Could Not Retrieve Banno Features");
        return false;
    }).then(function(text) {
        let result = "";
        if (text) {
            featHTML.innerHTML = text;
            let features = featHTML.getElementsByTagName('h5');
            for (let f = 0; f < features.length; f++) {
                result += features[f].innerText;
                if (f + 1 < features.length) {
                    result += ", ";
                }
            }
        }
        return result;
    }).then(function(result) {
        createBannoDiv(result);
    }).catch(function(err) {
        console.log(err);
    })
}