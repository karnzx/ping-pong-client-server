class Ball {
    constructor() { //กำหนดค่าเริ่มต้น
        this.x = width / 2;
        this.y = height / 2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = 13; //?
        this.speed = 7;
        // this.hit = 0;

        this.reset();
    }

    checkPaddleLeft(p) { //เมื่อบอลชน paddle ซ้าย

        if (this.y - this.r < p.y + p.h / 2 &&
            this.y + this.r > p.y - p.h / 2 &&
            this.x - this.r < p.x + p.w / 2) {

            if (this.x > p.x) {
                // this.hit++;
                let diff = this.y - (p.y - p.h / 2);
                let rad = radians(45);
                let angle = map(diff, 0, p.h, -rad, rad);
                this.speed++;
                this.xspeed = this.speed * cos(angle);
                this.yspeed = this.speed * sin(angle);
                this.x = p.x + p.w / 2 + this.r;
            }

        }
    }
    checkPaddleRight(p) { //เมื่อบอลชน paddle ซ้าย

        if (this.y - this.r < p.y + p.h / 2 &&
            this.y + this.r > p.y - p.h / 2 &&
            this.x + this.r > p.x - p.w / 2) {

            if (this.x < p.x) {
                // this.hit++;
                let diff = this.y - (p.y - p.h / 2);
                let angle = map(diff, 0, p.h, radians(225), radians(135));
                this.speed++;
                this.xspeed = this.speed * cos(angle);
                this.yspeed = this.speed * sin(angle);
                this.x = p.x - p.w / 2 - this.r;
            }
        }
    }

    update() { //อัพเดทตำแหน่งลูกบอล
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    reset() { //รีเซ็ตค่ากลับไปเริ่มต้น
        // this.hit = 0;
        this.x = width / 2;
        this.y = height / 2;
        let angle = random(-PI / 4, PI / 4);
        this.speed = 7;
        this.xspeed = this.speed * Math.cos(angle);
        this.yspeed = this.speed * Math.sin(angle);

        if (random(1) < 0.5) {
            this.xspeed *= -1;
        }
    }

    edges() { //เมื่อบอลชนขอบ ไม่ชน paddle
        if (this.y < 0 || this.y > height) {
            this.yspeed *= -1;
        }

        if (this.x - this.r > width) { //บอลชนขอบซ้าย
            leftscore++; //อัพเดทคะแนน
            this.reset(); //รีเซ็ทบอล
        }

        if (this.x + this.r < 0) { //บอลชนขอบขวา
            rightscore++; //อัพเดทคะแนน
            this.reset();  //รีเซ็ทบอล
        }
    }

    show() { //การแสดงผลลูกบอล
        fill(0); //สีดำ
        ellipse(this.x, this.y, this.r * 2); //ขนาดลูกบอล
    }

    getHits() { //เมื่อชนของให้อัพเดทว่าชน
        return this.hit;
    }

    endGame() { //จบเกม เซ็ทค่าทุกอย่างกลับไปเป็น 0
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = 0;
        this.speed = 0;
    }

    newGame() { //เมื่อกดปุ่ม newGame ให้ทำการเซ็คค่าเป็นค่าเริ่มต้น แล้วแล้วใช้ฟังก์ชัน reset()
        this.x = width / 2;
        this.y = height / 2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = 10;
        this.speed = 7;
        // this.hit = 0;

        this.reset();
    }
}
