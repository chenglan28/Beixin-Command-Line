
var fs = require("fs");
global.user = "root";
global.path = "./";

console._log = console.log;
console.log = function(x){
    var t = "";
    for(var i = 0;i<arguments.length;i++){
        t+=arguments[i] + " ";
    }
    fs.writeFileSync("log.txt",t + "\n",{flag:"a+"})
    console._log(t);
}
var setup = JSON.parse(fs.readFileSync("data/setup.json").toString());
setup.forEach((x)=>{
    if(fs.existsSync("data/setup/" + x.name))eval(fs.readFileSync("data/setup/" + x.name).toString());
    else console.log(`\x1B[31m没有找到启动项: ${x.name}\x1B[37m`)
});

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function getCmd(){
    rl.question(`\x1B[35m${global.path} \x1B[32m${global.user}@ \x1B[37m`, cmd => {
        fs.writeFileSync("log.txt",`${global.path} ${global.user}@ ${cmd}\n`,{flag:"a+"})
        cmd = cmd.split(" ");
        if(fs.existsSync(`./cmd/${cmd[0]}`) == true){
            if(cmd[0]){
                require(`./cmd/${cmd[0]}`)(cmd);
            }
        }
        else console.log(`没有找到 ${cmd[0]}`);
        getCmd();
    });
}
getCmd();

