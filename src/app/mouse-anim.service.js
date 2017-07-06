"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var system_1 = require("./system");
var MouseAnimService = (function () {
    function MouseAnimService(zone) {
        this.zone = zone;
    }
    MouseAnimService.prototype.enableAnimService = function (cardID, canvasID, pQuant, pSize, rD, pSpeed) {
        var _this = this;
        this.gitCol = false;
        this.enable = true;
        this.cardPos = [];
        this.coord = [];
        this.center = [];
        this.events = {};
        this.zone.runOutsideAngular(function () {
            var canvas = window.document.getElementById(canvasID), context = canvas.getContext('2d'), container = window.document.getElementById('pContainer'), winWidth = container.offsetWidth, winHeight = container.offsetHeight, offLeft = container.getBoundingClientRect().left;
            var throttle = true;
            _this.setCvs(true, canvas, context, winWidth, winHeight);
            _this.card = window.document.getElementById(cardID);
            _this.center = [winWidth / 2, winHeight / 2];
            var w = winWidth / _this.scale;
            var h = winHeight / _this.scale;
            _this.system = new system_1.System(rD, pQuant, pSpeed, pSize, w, h);
            var update = function () {
                var w = container.offsetWidth, h = container.offsetHeight;
                _this.center = [w / 2 + offLeft, h / 2];
                _this.manipCard();
                _this.detectCollision();
                _this.center = [window.innerWidth / 2, window.innerHeight / 2];
                if (throttle) {
                    _this.setCvs(false, canvas, context, w, h);
                    context.strokeStyle = "#1F3A93";
                    context.fillStyle = "#1F3A93";
                    context.globalAlpha = .333;
                    var mouse = [
                        _this.coord[0] - offLeft,
                        _this.coord[1]
                    ];
                    _this.system.update(context, mouse, w, h, _this.scale);
                }
                throttle = !throttle;
                if (_this.enable)
                    window.requestAnimationFrame(update.bind(_this));
            };
            _this.events['m'] = _this.setMCoord.bind(_this);
            _this.events['c'] = _this.reDirect.bind(_this);
            _this.events['f'] = window.requestAnimationFrame(update.bind(_this));
            window.document.addEventListener('mousemove', _this.events['m'], true);
            window.document.addEventListener('click', _this.events['c'], true);
        });
    };
    MouseAnimService.prototype.cancelService = function () {
        var _this = this;
        this.enable = false;
        this.zone.runOutsideAngular(function () {
            window.cancelAnimationFrame(_this.events['f']);
            window.document.removeEventListener('mousemove', _this.events['m'], true);
            window.document.removeEventListener('click', _this.events['c'], true);
        });
    };
    MouseAnimService.prototype.reDirect = function () {
        var g = document.getElementById('git');
        if (!g)
            return;
        var gRect = g.getBoundingClientRect(), wH = this.coord[1] > gRect.top && this.coord[1] < gRect.bottom, wW = this.coord[0] > gRect.left && this.coord[0] < gRect.right;
        if (wH && wW)
            window.location.href = "http://www.philipcheek.com";
    };
    MouseAnimService.prototype.setMCoord = function (e) {
        this.coord = [e.pageX, e.pageY];
    };
    MouseAnimService.prototype.setCvs = function (init, cvs, ctx, w, h) {
        if (init) {
            cvs.style.position = 'absolute';
            cvs.style.top = "0";
        }
        this.scale = w < h ? w / 1200 : h / 1200;
        cvs.width = w;
        cvs.height = h;
        ctx.scale(this.scale, this.scale);
    };
    MouseAnimService.prototype.detectCollision = function () {
        var g = document.getElementById('git');
        if (!g)
            return;
        var gRect = g.getBoundingClientRect(), wH = this.coord[1] > gRect.top && this.coord[1] < gRect.bottom, wW = this.coord[0] > gRect.left && this.coord[0] < gRect.right;
        if (wH && wW) {
            g.style.color = "#81b3d2";
            window.document.body.style.cursor = "pointer";
        }
        else if (this.gitCol) {
            g.style.color = "black";
            window.document.body.style.cursor = "initial";
        }
        this.gitCol = wH && wH;
    };
    MouseAnimService.prototype.manipCard = function () {
        var c = this.coord.length > 0, l = this.cardPos.length > 0, mX = l && this.cardPos[0] == this.coord[0], mY = l && this.cardPos[1] == this.coord[1], match = mX && mY;
        if (c && match)
            return;
        var w = this.center[0], h = this.center[1], x = (w - this.coord[0]) / (-15), y = (h - this.coord[1]) / 15, r = "rotateY(" + x + "deg) rotateX(" + y + "deg)", s = ["transform", "webkitTranform", "mozTransform"];
        for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
            var i = s_1[_i];
            this.card.style[i] = r;
            this.cardPos = [this.coord[0], this.coord[1]];
        }
    };
    return MouseAnimService;
}());
MouseAnimService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], MouseAnimService);
exports.MouseAnimService = MouseAnimService;
//# sourceMappingURL=mouse-anim.service.js.map