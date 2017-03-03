window.$ = window.jQuery = require('jquery');
const fetch = require('node-fetch');
const bannoURL = "https://banno.com";
const bannoHTML = document.createElement('html');
let bannoTEXT = "";

fetch(bannoURL).then((resp) => resp.text())
    .then(function(text) {
        bannoTEXT = text;
        bannoHTML.innerHTML = text;
        // charUsage();
        // findPNGs();
        // twitterHandle();
        findPhrase();
    }).catch(function(err) {
        console.log(err);
    });

function charUsage() {
    // Convert html to lowercase and remove all non-alphanumerics
    let text = bannoTEXT.toLowerCase().replace(/[^a-z0-9]/gi, '');
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
    console.log(first);
    console.log(second);
    console.log(third);
}

// Searches from number of png images in html
function findPNGs() {
    let pngs = 0;
    let imgs = bannoHTML.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        let src = imgs[i].src.toString();
        if (src.match(/.*\.png/)) {
            pngs += 1;
        }
    }
    console.log(pngs);
}

// Finds the meta tag containing twitter handle
function twitterHandle() {
    let metaTags = bannoHTML.getElementsByTagName("meta");
    let twitter = "";
    for (var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].name == "twitter:site") {
            twitter = metaTags[i].content;
        }
    }
    console.log(twitter);
}

// Searches for a phrase in html
function findPhrase() {
    let phrase = "financial institution";
    let re = new RegExp(phrase, "g");
    let matches = bannoTEXT.match(re);
    console.log(matches.length);
}