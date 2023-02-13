const {normalizeURL, getURLsFromHTML, crawlPage} = require('./crawl');


async function main(){
    if (process.argv.length !== 3){
        throw "Use only 1 input argument";
    }
    url = process.argv[2];
    console.log(`The web crawler will start at ${url}`)
    linkObj = await crawlPage(url, url, {});
    console.log(linkObj);
}

main();