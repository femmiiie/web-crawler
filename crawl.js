//const { format } = require('node:path');
//const url = require('node:url');
const {JSDOM} = require('jsdom');
//const { link } = require('node:fs');

function normalizeURL(inUrl){
    inUrl.toLowerCase()
    try{
        formatUrl = new URL(inUrl);
    } catch(Err) {
        return 'Invalid URL';
    }
    if (formatUrl.pathname === '/'){
        //console.log(formatUrl.pathname);
        return formatUrl.host;
    }
    returnStr = formatUrl.host + formatUrl.pathname;
    return returnStr.slice(0, returnStr.length-1);
}

function getURLsFromHTML(htmlBody, baseURL){
    if (htmlBody[0] !== '<'){
        return 'Invalid HTML Body';
    }
    let dom = new JSDOM(htmlBody);
    let linkArr = dom.window.document.querySelectorAll('a');
    let returnArr = []
    linkArr.forEach(item => {
        console.log(returnArr);
        if (item.getAttribute('href')[0] === '/') {
            //console.log(item.getAttribute('href'));
            returnArr.push(baseURL + item.getAttribute('href'));
        } else {
            returnArr.push(item.getAttribute('href'));
        }
        console.log(returnArr);
    });
    console.log(returnArr);
    return returnArr;
}

async function crawlPage(baseURL){
    await fetch(baseURL)
    .then(response => {
        if(response.headers['content-type'] !== 'text/html'){
            throw 'Content type of Webpage is incorrect!';
        } else if (response.status !== 200) {
            throw 'Error Connecting to the Webpage!';
        }
        return response.text();
    
    })
    .then(null, response =>{
        return;
    });
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  };