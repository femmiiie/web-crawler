const {JSDOM} = require('jsdom');

//Takes given URL, makes it lowecase, and makes sure it's only the root path
function normalizeURL(inUrl){
    inUrl.toLowerCase()
    try{
        formatUrl = new URL(inUrl);
    } catch(Err) {
        return 'Invalid URL';
    }

    if (formatUrl.pathname === '/'){
        return formatUrl.host;
    }

    returnStr = formatUrl.host + formatUrl.pathname;
    return returnStr.slice(0, returnStr.length);
}

//Uses JSDOM. Takes all html fetched from webpage, gets all anchors, formats
//all hrefs as a URL, and returns array of them
function getURLsFromHTML(htmlBody, baseURL){
    if (htmlBody[0] !== '<'){
        console.log('Invalid HTML Body');
        return;
    }
    let dom = new JSDOM(htmlBody);
    let linkArr = dom.window.document.querySelectorAll('a');
    let returnArr = []

    linkArr.forEach(item => {
        if (item.getAttribute('href')[0] === '/') {
            returnArr.push(baseURL + item.getAttribute('href'));
        } else {
            returnArr.push(item.getAttribute('href'));
        }
    });
    return returnArr;
}

async function crawlPage(baseURL, currentURL, pages){
    //Bails if domain is diff from search domain
    let formBaseURL = new URL(baseURL);
    try{
        formCurrentURL = new URL(currentURL);
    } catch {
        return;
    }
    if (formBaseURL.hostname !== formCurrentURL.hostname){
        return;
    }

    //Increments pages and returns if URL has been seen before
    currentURL = normalizeURL(currentURL);
    if (pages[currentURL] !== undefined && currentURL !== baseURL){
        pages[currentURL] ++;
        return;
    }

    //Sets initial value of new page
    pages[currentURL] = 1;

    //Tries to get 
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
        let rawUrlArr = await response.text();
        let urlArr = getURLsFromHTML(rawUrlArr, baseURL);
        var promises = [];
        urlArr.forEach(url => {
            promises.push(crawlPage(baseURL, url, pages));
        });
        await Promise.all(promises);

        } catch(err) {
            console.log(err.message);
        }
    return pages;  
}


module.exports = {
    crawlPage
  };