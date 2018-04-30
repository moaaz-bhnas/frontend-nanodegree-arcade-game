/* --- Enemy Class --- */
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.roadYPositions = [60, 143, 227];
        this.x = -101;
        this.y = this.roadYPositions[Math.floor(Math.random() * 3)];
        this.velocity = (Math.random() * 200) + 50;
    }
    
    update(dt) {
        this.x += this.velocity * dt;
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

/* --- Enemies Instances --- */
const allEnemies = [];

const generateBugs = () => {
    const randomNumber = Math.floor((Math.random() * 2) + 3);
    for (let i = 0; i < randomNumber; i++) {
        allEnemies.push(new Enemy());
    }
}

generateBugs();
setInterval(generateBugs, 3000);


/* --- Player Class --- */
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;  
        this.initialX = this.x;
        this.initialY = this.y;
        this.step = 30;
    }
    
    handleInput(direction) {
        switch (direction) {
            case 'up':
                this.y -= this.step;
                break;
            case 'down':
                this.y += (this.y + this.step < 440) ? this.step : 0;
                break;
            case 'right':
                this.x += (this.x + this.step < 415) ? this.step : 0;
                break;
            case 'left':
                this.x -= (this.x - this.step > -15) ? this.step : 0;
                break;
        }
    } 
    
    update() {
        if ((this.y + 171/2) < 83) {
            setTimeout(() => {
                this.reset();
            }, 200);
        }
        
        this.detectCollision();
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    detectCollision() {
        for (const enemy of allEnemies) {
            if (getDistance(this.x, this.y, enemy.x, enemy.y) < 78) {
                setTimeout(() => {
                    this.reset();
                }, 5);
            }
        }
    }
    
    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
    }
}

/* --- Player Object --- */
const player = new Player(); 

/* --- Pythagorean Theorem --- */
const getDistance = (x1, y1, x2, y2) => {
    const xDistance = x2 - x1,
          yDistance = y2 - y1;
    
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
    
/* --- Key Presses event listener --- */
document.addEventListener('keyup', event => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[event.keyCode]);
});