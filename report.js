
function printReport(pages){
    console.log('Starting Report of the website:');

    for (let key of Object.keys(pages)){
        console.log(`The domain ${key} appeared ${pages[key]} times.`);
    }
}


module.exports = {
    printReport
};