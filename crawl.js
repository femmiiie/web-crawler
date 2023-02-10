const { format } = require('node:path');
const url = require('node:url');

function normalizeURL(inUrl){
    inUrl.toLowerCase()
    try{
        formatUrl = new URL(inUrl);
    } catch(Err) {
        return 'Invalid URL';
    }
    if (formatUrl.pathname === '/'){
        console.log(formatUrl.pathname);
        return formatUrl.host;
    }
    returnStr = formatUrl.host + formatUrl.pathname;
    return returnStr.slice(0, returnStr.length-1);
}



module.exports = {
    normalizeURL
  };