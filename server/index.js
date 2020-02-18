const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const redis = require('redis');

// Create new redis database client -> if you need other connection options, please specify here
const redisClient = redis.createClient({
    url: "redis://default:gai689ypykqx0fjj@dhbw-wwi-ndbk-do-user-883655-0.db.ondigitalocean.com:25061",
    tls: {},
});

app.get('/', (req, res) => {
    res.send('It works!');
});

io.on('connection', socket => {
    console.log('a user connected');

    //comment in to delete all posts
    //redisClient.del('11-wwi-tweety-posts');

    // After initial connection, send all existing posts to the user
    redisClient.lrange('11-wwi-tweety-posts', 0, -1, (err, postJsonStrings) => {
        if (err) {
            console.error(err);
            return;
        }

        // Parse all JSON strings, emit to client
        const objects = postJsonStrings.map(string => JSON.parse(string));
        socket.emit('previous posts', JSON.stringify(objects));
    });

    socket.on('post', postAsJson => {
        const post = JSON.parse(postAsJson);

        var maxid = 0;
        //get all current entrys
        redisClient.lrange('11-wwi-tweety-posts', 0, -1, (err, postJsonStrings) => {
            if (err) {
                console.error(err);
                return;
            }

            // Parse all JSON strings, emit to client
            var objects = postJsonStrings.map(string => JSON.parse(string));
            //console.log('Anzahl alter Posts' + objects.length);
            objects.forEach(element => {
                //console.log('Aktuelle ID: ' + element.id);
                if (element.id >= maxid) {
                    maxid = element.id;
                }
            });
            maxid = maxid + 1;

            console.log('new MaxID: ' + maxid);

            post.id = maxid;

            console.log(post);

            // Save post in redis
            redisClient.rpush('11-wwi-tweety-posts', JSON.stringify(post));

            // Send Post to everyone
            io.emit('post', JSON.stringify(post));
        });

    });

    socket.on('like', id => {
        console.log("like-function für id " + id + " aufgerufen");

        //Load all posts
        redisClient.lrange('11-wwi-tweety-posts', 0, -1, (err, postJsonStrings) => {
            if (err) {
                console.error(err);
                return;
            }

            // Parse all JSON strings
            var objects = postJsonStrings.map(string => JSON.parse(string));
            var counter = 0;
            var index = 0;
            var likedPost;
            // console.log('Objects vor: ');
            // console.log(objects);

            objects.forEach(element => {
                if (element.id === id) {
                    console.log('liked content: ' + element.content);
                    index = counter;
                    likedPost = element;
                }
                counter++;
            });
            //increment amount of likes by one
            likedPost.likes +=1;

            //save the liked post
            redisClient.lset('11-wwi-tweety-posts', index, JSON.stringify(likedPost));
            
            //send update to all clients
            io.emit('previous posts', JSON.stringify(objects));
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
