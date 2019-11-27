var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });


client.on("error", function (err) {
    console.log("Error " + err);
});

exports.save = (k, v) => {
    client.set(k, v, redis.print);
}
exports.get = (k) => {
    return new Promise((o,n)=>{
        client.get(k, (error,reply)=>{
            if(error == null){
                o(reply);
            }else{
                n(error);
            }
        });

    })
}
exports.del = (k) => {
    client.del(k, [], redis.print);
}
exports.exists = (k) => {
    client.exists(k, [], redis.print);
}


/*
client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
}); */