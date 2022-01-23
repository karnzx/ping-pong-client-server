var express = require('express');

var app = express();

// เจาะจงพอร์ตเป็น 5000 
var server = app.listen(5000, listen);

// callback แสดงผลว่ากำลังทำงานอยู่ที่ไหน
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('site'));

// ทำให้ webscocket ทำงานกับ http
var io = require('socket.io')(server);

// ให้ callback ทำงานเมื่อมีการเชื่อมต่อโดยแต่ละ uset จะแยกออกจากกัน
io.sockets.on('connection',
    // We are given a websocket object in our function
    function (socket) {

        console.log("We have a new client: " + socket.id); // id เฉพาะแต่ละ user

        //  อ่านค่าจาก clients1
        socket.on('mouse1', function (data) {
            // อ่านค่ตำแหน่งของเมาส์
            console.log("Received mouse data from client: " + data.x + " " + data.y);

            // สงข้อมูลไปให้ทุกๆ client
            socket.broadcast.emit('mouse1', data);
        });

        //  อ่านค่าจาก clients2
        socket.on('mouse2', function (data) {
            // อ่านค่ตำแหน่งของเมาส์
            console.log("Received mouse data from client: " + data.x + " " + data.y);

            // สงข้อมูลไปให้ทุกๆ client
            socket.broadcast.emit('mouse2', data);
        });

        // เมื่อยกเลิกการเชื่อมต่อ
        socket.on('disconnect', function () {
            console.log("Client has disconnected");
        });

        // เมื่อ resetSketch ส่งไปบอกตัวอื่นๆด้วย
        socket.on('resetSketch', function (data) {
            console.log("SERVER.js sketch has been reset: " + data);
            socket.broadcast.emit('resetSketch', data);
        });

        // เมื่อมีการถามคะแนน ส่งคะแนนไปให้ทุกคน (ทั้งคน1 และ 2)
        socket.on('clientScore', function (data) {
            socket.broadcast.emit('yourScore', data);
        });

    }
);

