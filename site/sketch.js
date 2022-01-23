
var socket;
let leftscore = 0;
let rightscore = 0;
var winner = "";

function setup() {
    createCanvas(windowWidth, windowHeight);

    ball = new Ball();
    left = new Paddle(true);
    right = new Paddle(false);


    socket = io.connect('/'); // สั่ง connect  เข้ากับ url / หรือ index

    // เมื่อได้รับข้อมูลจาก socket 
    socket.on('mouse1', function (data) {
        left.move(data.x); //ส่ง data ไปยัง paddle ด้านซ้าย 
    });
    socket.on('mouse2', function (data) {
        right.move(-data.x); //ส่ง data ไปยัง paddle ด้านขวา
    });
    // ถ้า socket ได้ข้อมูลมาเป็น resetSketch จะทำคำสั่งต่อไปนี้
    socket.on('resetSketch', function (data) {
        console.log("sketch has been reset: " + data);
        ball.newGame(); // เรียก function newGame ของ ball 
        winner = ""; // reset ชื่อผู้ชนะ
        leftscore = 0;
        rightscore = 0; // reset data ทั้งหมด
        totalHits = 0;
    });

}

function draw() {

    background(color(255, 253, 208));
    //เช็คลูกบอลว่าชนมั้ย
    ball.checkPaddleRight(right);
    ball.checkPaddleLeft(left);
    //วาดแล้วก็ update paddle 
    left.show();
    right.show();
    left.update();
    right.update();
    // update ลูกบอล
    ball.update();
    ball.edges();
    ball.show();
    //โชว์คะแนน ของฝั่งซ้ายและขวา
    fill(color(49, 57, 60));
    textSize(76);
    text(leftscore, 80, 80);
    text(rightscore, width - 80, 80);

    // บอกว่าผู้เล่นคนไหนชนะ
    if (leftscore == 10) {
        winner = "Player 1 Won!";
        ball.endGame(); // สั่งจบเกม
    } else if (rightscore == 10) {
        winner = "Player 2 Won!"
        ball.endGame();  // สั่งจบเกม
    }
    fill(0);
    textSize(124);
    textAlign(CENTER);
    text(winner, (windowWidth / 2), (windowHeight / 2));


    // แสดงคะแนนบนหน้าจอผู้เล่น
    data = {
        LS: leftscore,
        RS: rightscore
    };
    console.log(data);
    socket.emit('clientScore', data); // ส่งข้อมูลไปยัง server
}

