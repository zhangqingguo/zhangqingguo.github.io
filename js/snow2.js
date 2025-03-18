/* 
Snow 使用说明
1. 创建 Snow 对象：
   let snow = new Snow(canvasID, width, height);

2. 启动雪花效果：
   snow.start();

*/




var _requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };





/**
 * 类Snow的构造函数参数.
 * @param canvasID : string     canvas元素的id标识符
 * @param width : number  默认值：window.innerWidth       画面的宽度;
 * @param height : number    默认值: window.innerHeight      画面的高度
 * @param flakeCount : number  默认值是：500     雪花的数量  
 * @param minFlakeRadius : number 默认值:1     雪花的最小半径
 * @param maxFlakeRadius : number 默认值:3       雪花的最大半径
 * @param minSpeed : number   默认值: 0.5    雪花下落的最小速度
 * @param maxSpeed : number   默认值: 2.5    雪花下落的最大速度
 * @param affect : bool   默认值: false        是否开启触摸影响雪花 
 * @param affectRadius : number  默认值: 100     影响半径 
 */
class Snow {
    constructor(canvasID, width, height, flakeCount = 500,minFlakeRadius = 1,maxFlakeRadius = 3,minSpeed=0.5,maxSpeed=2.5,affect=false,affectRadius=100) {

        this._snow = this._snow.bind(this);

        this.canvasID = canvasID;
        this.width = width || window.innerWidth;
        this.height = height || window.innerHeight;
        this.flakeCount = flakeCount;
        this.mX = -100;
        this.mY = -100;
        this.affect = affect;

        this.minFlakeRadius = minFlakeRadius;
        this.maxFlakeRadius = maxFlakeRadius;

        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;

        this.opacityBaseRadius = 0.3;
        this.opacityExpandRange = 0.5;

        this.flakes = [];
        this.affectRadius = affectRadius;

    }

    get speedBaseRadius(){
        return this.minSpeed;
    }

    get speedExpandRange(){
        let speedExpandRange = this.maxSpeed - this.minSpeed;
        speedExpandRange = speedExpandRange > 0 ? speedExpandRange : 0;
        return speedExpandRange;
    }


    get canvas(){
        if (!(this._canvas)){
            this._canvas = document.getElementById(this.canvasID);
        }
        return this._canvas;
    }


    get flakeBaseRadius(){
        return this.minFlakeRadius;
    }

    get flakeExpandRange(){
        let flakeExpandRange = this.maxFlakeRadius - this.minFlakeRadius;
        flakeExpandRange = flakeExpandRange > 0 ? flakeExpandRange : 0;
        return flakeExpandRange;
    }



    start() {

        let canvas = this.canvas;
        canvas.width = this.width;
        canvas.height = this.height;
       
        this.ctx = canvas.getContext("2d");
        
        if (this.affect){
            canvas.addEventListener("mousemove", (e) => {
                this.mX = e.clientX;
                this.mY = e.clientY;
            });
        }
        
        this._init();
    }


    changeCanvasSize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
    }

    
 


    _snow() {
        let canvas = this.canvas;
        let flakes = this.flakes;
        let ctx = this.ctx;
        let flakeCount = this.flakeCount;
        let mX = this.mX;
        let mY = this.mY;


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let affectRadius = this.affectRadius;

        for (var i = 0; i < flakeCount; i++) {
            var flake = flakes[i],
                x = mX,
                y = mY,
                x2 = flake.x,
                y2 = flake.y;

            var dx = x2 - x;
            var dy = y2 - y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            

            if (this.affect && dist < affectRadius) {
                var force = affectRadius / (dist * dist);
                var xcomp = (-dx) / dist;
                var ycomp = (-dy) / dist;
                var deltaV = force / 2;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;

            } else {
                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }
                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
            }

            ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= canvas.height || flake.y <= 0) {
                this._reset(flake);
            }


            if (flake.x >= canvas.width || flake.x <= 0) {
                this._reset(flake);
            }

            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fill();
        }

        this.flakes = flakes;
        _requestAnimationFrame(this._snow);
    }

    _reset(flake) {

        let random = Math.random;

        flake.x = Math.floor(random() * this.canvas.width);
        flake.y = 0;
        flake.size = (random()) * this.flakeExpandRange + this.flakeBaseRadius;
        flake.speed = (random()) * this.speedExpandRange + this.speedBaseRadius;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = random() * this.opacityExpandRange + this.opacityBaseRadius;
    }

    _init() {

        let flakeCount = this.flakeCount;
        let canvas = this.canvas;
        let flakes = this.flakes;

        let flakeBaseRadius = this.flakeBaseRadius;
        let flakeExpandRange = this.flakeExpandRange;
        let speedBaseRadius = this.speedBaseRadius;
        let speedExpandRange = this.speedExpandRange;

        let opacityBaseRadius = this.opacityBaseRadius;
        let opacityExpandRange = this.opacityExpandRange;

        let random = Math.random;
        let floor = Math.floor;

        for (var i = 0; i < flakeCount; i++) {
            var x = floor(random() * canvas.width),
                y = floor(random() * canvas.height),
                size = random() * flakeExpandRange + flakeBaseRadius,
                speed = random() * speedExpandRange + speedBaseRadius,
                opacity = random() * opacityExpandRange + opacityBaseRadius;

            flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: random() / 20,
                step: random() * Math.PI,
                opacity: opacity
            });
        }

        this.flakes = flakes;

        this._snow();
    }

}


export {Snow};
export default Snow;