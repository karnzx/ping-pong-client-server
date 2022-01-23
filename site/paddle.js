class Paddle {                  //ส่วนของการกำหนดค่าให้ paddle
    constructor(isLeft) {       //การตั้งค่าตำแหน่งและขนาดของ paddle
        this.y = height / 2;    //ตำแหน่งของ paddle คือนำ height หาร 2
        // console.log("y is: " + this.y);
        this.w = 30;            //กำหนดความกว้างของ paddle คือ 30
        this.h = 300;           //กำหนดความยาวของ paddle คือ 300
        this.ychange = 0;       //กำหนดค่าเริ่มต่นของ ychange เป็น 0
        this.previousSteps = 0; //กำหนดค่าเริ่มต่นของ previousSteps เป็น 0

        if (isLeft) {
            this.x = this.w;   //ตำแหน่งของ paddle ด้านซ้ายคือ ค่า w    
        } else {
            this.x = width - this.w;    //ตำแหน่งของ paddle ด้านขวาคือ ความกว้างจอ - ค่า w
        }
    }

    update() {
        this.y += this.ychange;     //อัปเดทตำแหน่งของ paddle ด้วยค่า ychange
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);    //กำหนดลิมิตของ paddle ด้วยค่า this.y, this.h / 2 และ height - this.h / 2
    }

    move(currentSteps) {
        this.ychange = (currentSteps - this.previousSteps);     //อัปเดทตำแหน่งของ paddle ด้วยค่า currentSteps - this.previousSteps
        this.previousSteps = currentSteps;      //ให้ค่า previousSteps คือค่า  currentSteps
    }

    show() {
        fill(color(153, 76, 0));        //กำหนดสีให้ paddle
        rectMode(CENTER);       //กำหนดตำแหน่งที่โชว์ของ paddle ให้อยู่ตรงกลาง
        rect(this.x, this.y, this.w, this.h, 8, 8, 8, 8);       //กำหนดตำแหน่งการแสดงผลของ paddle จากพารามิเตอร์ด้านบน
    }
}
