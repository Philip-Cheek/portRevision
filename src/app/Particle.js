"use strict";
var Particle = (function () {
    function Particle(speed, sz, w, h) {
        this.x = Math.random() * w * 1.2;
        this.y = Math.random() * h * 1.2;
        this.velocity = [];
        this.m = [1, 1];
        this.size = sz;
        this.speed = speed;
        this.seed = speed;
        this.angle = (Math.random() * 360) * (Math.PI / 180);
        this.velocity[0] = speed * Math.cos(this.angle);
        this.velocity[1] = speed * Math.sin(this.angle);
        for (var i = 0; i < 3; i++)
            this.velocity[i] *= Math.random() > .5 ? 1 : -1;
    }
    Particle.prototype.draw = function (ctx, center) {
        var xDist = Math.abs(this.x - center[0]), yDist = Math.abs(this.y - center[1]), dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)), spot = .5 * Math.pow((dist * .001), 2), sz = this.size * spot < 100 ? this.size * spot : 100;
        this.speed = this.seed * (sz / this.size);
        if (this.speed < .1)
            this.speed = .1;
        if (this.speed > .5)
            this.speed = .5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, sz, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    };
    Particle.prototype.update = function (w, h, scale) {
        var vX = this.speed * Math.cos(this.angle), vY = this.speed * Math.sin(this.angle);
        this.velocity[0] = vX;
        this.velocity[1] = vY;
        if (this.x < 0) {
            this.m[0] *= -1;
            if (this.velocity[0] * this.m[0] < 0) {
                this.m[0] *= -1;
            }
        }
        else if (this.y < 0) {
            this.m[1] *= -1;
            if (this.velocity[1] * this.m[1] < 0) {
                this.m[1] *= -1;
            }
        }
        if (this.x > w) {
            this.m[0] *= -1;
            if (this.velocity[0] * this.m[0] > 0) {
                this.m[0] *= -1;
            }
        }
        else if (this.y > h) {
            this.m[1] *= -1;
            if (this.velocity[1] * this.m[1] > 0) {
                this.m[1] *= -1;
            }
        }
        this.x += this.velocity[0] * this.m[0];
        this.y += this.velocity[1] * this.m[1];
    };
    return Particle;
}());
exports.Particle = Particle;
//# sourceMappingURL=Particle.js.map