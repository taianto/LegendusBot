module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message,args) {
        console.log(args);
        message.channel.send(message);
    }
}