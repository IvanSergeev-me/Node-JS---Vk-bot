//node index.js
const {VK, Keyboard} = require("vk-io"),
config = require("./config.json"),
vk = new VK({
    token: config.token,
    pollingGroupId: config.group_id,
    apiMode: "parallel"
});
function log(text){
    console.log(`[LOGS] ${text}`);
}
var itterator=0;
//var isNewUser = true;
//Надо сделать значение иттератора для каждого пользователя отдельным. Брать msg.senderId и проверять его на уникальность.
vk.updates.use((msg, next) =>{
    
    if (msg.senderType !== 'user') return false;
    msg.send("Ща кину анек")
    var tress = require('tress');
    var cheerio = require('cheerio');
    var needle = require('needle');
    var fs = require('fs');
    var URL = 'https://www.anekdot.ru/';
    var results = [];
    
    var q = tress(function(url, callback){

        //тут мы обрабатываем страницу с адресом url
        needle.get(url, function(err, res){
            if (err) throw err;
            var $ = cheerio.load(res.body);
            for(let i = 0; i<$(".topicbox").length; i++){
                try{
                    results.push(
                        $(".topicbox .text").eq(i).text()
                    );
                }
                catch(e){

                }
            }
            
            if (results[itterator]!=""){
                msg.send(results[itterator]);
                msg.send("Ну тупа ржака да?))00)))");
            }
            else{
                msg.send("Ну все, хватит анеков на сегодня")
            }
            itterator++;
            callback();
        });
    }); 
    q.drain = function(){
        require('fs').writeFileSync('./data.json', JSON.stringify(results, null, 4));
    }
    q.push(URL);
    next();
})
//Обратите внимание на вызов next() выше. 
//Вызов этой функции активирует следующую функцию промежуточной обработки в приложении. 
//Функция next() не является частью Node.js или Express API, но представляет собой третий аргумент, 
//передаваемый в функцию промежуточного обработчика. Функция next() могла бы иметь любое имя, но, согласно стандарту, 
//она всегда называется “next”. Во избежание путаницы, рекомендуется всегда придерживаться данного стандарта.
async function start(){
    log("Starting...");
    vk.updates.startPolling();
    log("Activated!");
}
start();