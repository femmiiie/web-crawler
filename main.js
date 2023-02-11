

function main(){
    if (process.argv.length !== 3){
        throw "Use only 1 input argument";
    }
    console.log(`The web crawler will start at ${process.argv[2]}`)
}

main();