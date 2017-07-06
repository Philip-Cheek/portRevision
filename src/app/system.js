"use strict";
var Particle_1 = require("./Particle");
var System = (function () {
    function System(m, q, sp, sz, w, h) {
        this.max = m;
        this.particles = [];
        for (var i = 0; i < q; i++)
            this.particles.push(new Particle_1.Particle(sp, sz, w, h));
    }
    System.prototype.update = function (ctx, mouse, w, h, scale) {
        var mX = mouse[0] / scale, mY = mouse[1] / scale;
        for (var i = 0; i < this.particles.length; i++) {
            var p1 = this.particles[i];
            p1.draw(ctx, [(w / scale) / 2, (h / scale) / 2]);
            for (var i2 = i + 1; i2 < this.particles.length; i2++) {
                var p2 = this.particles[i2], xDist_1 = p2.x - p1.x, yDist_1 = p2.y - p1.y, dist_1 = Math.sqrt(Math.pow(xDist_1, 2) + Math.pow(yDist_1, 2));
                if (dist_1 < this.max)
                    this.lineDraw(p1.x, p1.y, p2.x, p2.y, dist_1, ctx, this.max);
            }
            var xDist = mX - p1.x, yDist = mY - p1.y, dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            if (dist < 300)
                this.lineDraw(p1.x, p1.y, mX, mY, dist, ctx, 300);
            p1.update(w / scale, h / scale, scale);
        }
    };
    System.prototype.lineDraw = function (x1, y1, x2, y2, d, ctx, max) {
        var hMax = max / 2;
        var alpha = d > hMax ? 1 - ((d - hMax) / hMax) : 1;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.globalAlpha = alpha / 3;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    };
    return System;
}());
exports.System = System;
//# sourceMappingURL=system.js.map