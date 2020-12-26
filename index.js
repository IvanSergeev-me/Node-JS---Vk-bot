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
vk.updates.use((msg, next) =>{
    console.log(msg);
    next();
})
async function start(){
    log("Starting...");
    vk.updates.startPolling();
    log("Activated!");
}
start();