
var socket;
let leftscore = 0;
let rightscore = 0;
var winner = "";
var highScore = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    ball = new Ball();
    left = new Paddle(true);
    right = new Paddle(false);

    socket = io.connect('/');

    // When we recieve data from socket
    socket.on('mouse1', function (data) {
        left.move(data.x);
    });
    socket.on('mouse2', function (data) {
        right.move(-data.x);
    });
    // if we get resetsketch reset every data to 0 and new game
    socket.on('resetSketch', function (data) {
        console.log("sketch has been reset: " + data);
        ball.newGame();
        winner = "";
        leftscore = 0;
        rightscore = 0;
        // totalHits = 0;
    });

    // get high score from text file to present in the buttom left corner
    socket.on('sendHighScore', function (data) {
        highScore = data;
    });
}

function draw() {
    background(color(255, 253, 208));
    textFont('Cute Font');

    ball.checkPaddleRight(right);
    ball.checkPaddleLeft(left);

    left.show();
    right.show();
    left.update();
    right.update();

    ball.update();
    ball.edges();
    ball.show();

    fill(color(49, 57, 60));
    textSize(76);
    text(leftscore, 80, 80);
    text(rightscore, width - 80, 80);

    // Display winner
    if (leftscore == 10) {
        winner = "Player 1 Won!";
        ball.endGame();
    } else if (rightscore == 10) {
        winner = "Player 2 Won!"
        ball.endGame();
    }
    fill(0);
    textSize(124);
    textAlign(CENTER);
    text(winner, (windowWidth / 2), (windowHeight / 2));

    // show rally on screen
    // totalHits = ball.getHits();
    // fill(0);
    // textSize(140);
    // textAlign(CENTER);
    // text(totalHits, (windowWidth / 2), 100);

    // show highScore on screen
    fill(color(132, 28, 38));
    textSize(60);
    textAlign(CENTER);
    text("top rally: " + highScore, 180, windowHeight - 50);

    text(".socketPong.", windowWidth - 160, windowHeight - 50);

    // if new high score
    // if (totalHits > highScore) {
    //     // call sendHighScore() outside the loop!
    //     sendHighScore(totalHits);
    //     highScore = totalHits;
    // }

    // Show scores on client screen
    data = {
        LS: leftscore,
        RS: rightscore
    };
    console.log(data);
    socket.emit('clientScore', data);
}

// send high score to server
// function sendHighScore(hits) {
//     socket.emit('resetHighHitScore', hits);
// }
