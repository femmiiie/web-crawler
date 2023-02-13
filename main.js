const {crawlPage} = require('./crawl');
const {printReport} = require('./report');


async function main(){
    if (process.argv.length !== 3){
        throw "Use only 1 input argument";
    }
    url = process.argv[2];
    console.log(`The web crawler will start at ${url}`)
    printReport(await crawlPage(url, url, {}));
}

main();