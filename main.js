const {crawlPage} = require('./crawl');
const {printReport} = require('./report');


async function main(){
    //Makes sure only starting link is passed in when started
    if (process.argv.length !== 3){
        throw "Use only 1 input argument";
    }
    url = process.argv[2];
    console.log(`The web crawler will start at ${url}`)

    const report = await crawlPage(url, url, {});
    printReport(report);
}

main();