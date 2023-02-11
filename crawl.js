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

async function crawlPage(baseURL, currentURL, pages){
    try{
        let response = await fetch(baseURL);
        if(response.status>399){
            console.log(`Recieved HTTP Error, Error Code ${response.status}`);
            return;
        }
        const content = response.headers.get('content-type');
        if (!content.includes('text/html')){
            console.log('Invalid Content Type');
            return;
        }
        console.log(await response.text());
        } catch(err) {
            console.log(err.message);
        }
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  };