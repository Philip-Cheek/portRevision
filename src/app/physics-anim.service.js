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
var PhysicsAnimService = (function () {
    function PhysicsAnimService(zone) {
        this.zone = zone;
    }
    ;
    PhysicsAnimService.prototype.enableAnimService = function (skills, sRate) {
        var _this = this;
        if (sRate === void 0) { sRate = 1000; }
        this.zone.runOutsideAngular(function () {
            var canvas = document.getElementById('canvas'), context = canvas.getContext('2d'), width = document.getElementById('pContainer').offsetWidth, height = document.getElementById('pContainer').offsetHeight;
            _this.listeners = {};
            _this.sRate = sRate;
            _this.matter = Matter;
            _this.setRender(canvas, context, width, height);
            _this.setWorld();
            _this.addWalls(width, height);
            _this.addSkills(skills);
            _this.cWidth = width;
            _this.addResizeHandler();
            var update = function () {
                window.requestAnimationFrame(update.bind(_this));
                var w = document.getElementById('pContainer').offsetWidth, h = document.getElementById('pContainer').offsetHeight, scale = w / _this.sRate;
                canvas.height = h;
                canvas.width = w;
                _this.scaleWalls(w, h, scale);
                _this.render.context.scale(scale, scale);
                _this.matter.Mouse.setScale(_this.render.mouse, { x: 1 / scale, y: 1 / scale });
                _this.detectMouseCollision();
                _this.matter.Render.world(_this.render);
                if (!_this.sizeDown && !_this.sizeUp)
                    _this.matter.Engine.update(_this.engine);
                else if (_this.sizeUp)
                    _this.adjustHeight(scale);
            };
            _this.listeners['u'] = window.requestAnimationFrame(update.bind(_this));
        });
    };
    PhysicsAnimService.prototype.addResizeHandler = function () {
        this.listeners['r'] = this.handleResize.bind(this);
        window.addEventListener('resize', this.listeners['r'], true);
    };
    PhysicsAnimService.prototype.handleResize = function () {
        var _this = this;
        if (this.promise)
            clearTimeout(this.promise);
        var w = document.getElementById('pContainer').offsetWidth;
        this.sizeDown = w < this.cWidth;
        this.sizeUp = !this.sizeDown;
        this.cWidth = w;
        this.promise = setTimeout(function () {
            _this.sizeUp = false;
            _this.sizeDown = false;
        }, 300);
    };
    PhysicsAnimService.prototype.setRender = function (c, ctx, w, h) {
        c.width = w;
        c.height = h;
        this.engine = this.matter.Engine.create();
        this.render = this.matter.Render.create({
            canvas: c,
            context: ctx,
            engine: this.engine,
            options: {
                width: w,
                height: h,
                background: 'none',
                showAngleIndicator: false,
                wireframes: false
            }
        });
    };
    PhysicsAnimService.prototype.detectMouseCollision = function () {
        if (this.mStyle == "grabbing")
            return;
        var bodies = this.matter.Composite.allBodies(this.world), mouseVector = this.render.mouse.position, col = this.matter.Query.point(bodies, mouseVector);
        if (col.length > 0) {
            var fFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            document.body.style.cursor = fFox ? "grab" : "-webkit-grab";
            this.mStyle = "grab";
        }
        else {
            this.mStyle = "default";
            document.body.style.cursor = "default";
        }
    };
    PhysicsAnimService.prototype.setWorld = function () {
        this.world = this.engine.world;
        this.mouse = this.matter.Mouse.create(this.render.canvas);
        var self = this, mouseConstraint = this.matter.MouseConstraint.create(this.engine, {
            mouse: this.mouse,
            constraint: {
                stiffness: .5,
                render: { visible: true }
            }
        });
        this.matter.World.add(this.world, mouseConstraint);
        this.render.mouse = this.mouse;
        this.world.bodies = [];
        this.matter.Events.on(mouseConstraint, "startdrag", function () {
            self.mStyle = "grabbing";
            var fFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            document.body.style.cursor = fFox ? "grabbing" : "-webkit-grabbing";
        });
        this.matter.Events.on(mouseConstraint, "enddrag", function () {
            self.mStyle = undefined;
        });
    };
    PhysicsAnimService.prototype.scaleWalls = function (w, h, scale) {
        h /= scale;
        w /= scale;
        var options = { isStatic: true }, walls = [
            this.matter.Bodies.rectangle(w / 2, h + 40, w, 80, options),
            this.matter.Bodies.rectangle(-20, 0, 10, h * 2, options),
            this.matter.Bodies.rectangle(w + 20, 0, 20, h * 2, options)
        ];
        this.matter.World.add(this.world, walls);
        this.matter.World.remove(this.world, this.walls);
        this.walls = walls;
    };
    PhysicsAnimService.prototype.addWalls = function (w, h) {
        var options = {
            isStatic: true
        }, scale = w / this.sRate;
        w /= scale;
        h /= scale;
        this.walls = [
            this.matter.Bodies.rectangle(w / 2, h + 40, w, 80, options),
            this.matter.Bodies.rectangle(-20, 0, 10, h * 2, options),
            this.matter.Bodies.rectangle(w + 20, 0, 20, h * 2, options)
        ];
        this.matter.World.add(this.world, this.walls);
    };
    PhysicsAnimService.prototype.addSkills = function (skills) {
        for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
            var skillType = skills_1[_i];
            for (var _a = 0, _b = skillType.entries; _a < _b.length; _a++) {
                var skill = _b[_a];
                var p = skill.physics, tUrl = 'https://s3.amazonaws.com/prosepair/' + p.n + '.png';
                if (p.t == 'circle') {
                    this.addCircle(p.n, p.r, p.c, {
                        'texture': tUrl,
                        'xScale': p.s,
                        'yScale': p.s
                    });
                }
                else if (p.t == 'rect') {
                    this.addRectangle(p.n, p.d, p.c, {
                        'texture': tUrl,
                        'xScale': p.s,
                        'yScale': p.s
                    });
                }
            }
        }
    };
    PhysicsAnimService.prototype.addCircle = function (key, radius, coord, spriteRender, density) {
        if (density === void 0) { density = 1; }
        if (!spriteRender)
            return;
        var options = {
            visible: false,
            isStatic: false,
            density: density,
            restitution: .8,
            friction: 1.01,
        };
        options['render'] = {
            'strokeStyle': '#333333',
            'sprite': spriteRender
        };
        var c = this.getRandomCoord(), circle = this.matter.Bodies
            .circle(c[0], c[1], radius, options);
        this.matter.World.add(this.world, circle);
    };
    PhysicsAnimService.prototype.adjustHeight = function (scale) {
        var maxY = this.world.bodies[0].position.y;
        var floorY = this.walls[0]['position'].y;
        for (var i = 1; i < this.world.bodies.length; i++) {
            if (this.world.bodies[i].position.y > maxY)
                maxY = this.world.bodies[i].position.y;
        }
        if (maxY > floorY) {
            var diff = maxY - floorY;
            for (var i = 0; i < this.world.bodies.length; i++) {
                var oldY = this.world.bodies[i].position.y;
                if (oldY - diff > -100) {
                    var newPos = {
                        'x': this.world.bodies[i].position.x,
                        'y': this.world.bodies[i].position.y - diff - (20 / scale)
                    };
                    this.matter.Body.setPosition(this.world.bodies[i], newPos);
                }
            }
        }
    };
    PhysicsAnimService.prototype.addRectangle = function (key, dimen, coord, spriteRender, density) {
        if (density === void 0) { density = 1; }
        var options = {
            visible: false,
            isStatic: false,
            density: density,
            restitution: .8,
            friction: 1.01,
        };
        if (spriteRender) {
            options['render'] = {
                'strokeStyle': '#333333',
                'sprite': spriteRender
            };
            var c = this.getRandomCoord(), rect = this.matter.Bodies
                .rectangle(c[0], c[1], dimen[0], dimen[1], options);
            this.matter.World.add(this.world, rect);
        }
    };
    PhysicsAnimService.prototype.getRandomCoord = function () {
        var scale = window.innerWidth / this.sRate, width = window.innerWidth / scale, height = window.innerHeight / scale;
        return [
            Math.random() * (width * .9 - width * .1) + width * .1,
            Math.random() * (height - (-height * 3)) - height * 3
        ];
    };
    return PhysicsAnimService;
}());
PhysicsAnimService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], PhysicsAnimService);
exports.PhysicsAnimService = PhysicsAnimService;
// var Engine:any, = Matter.Engine, World = Matter.World,
//    Body = Matter.Body, Bodies = Matter.Bodies,
//    Common = Matter.Common, Composites = Matter.Composites,
//    MouseConstraint = Matter.MouseConstraint, 
//    Constraint = Matter.Constraint;
//  function e() {
//     b.init(), b.run(), j(), f(), b.updateWorldQueue()
// }
// function f() {
//     var a = b.dimen.height,
//         c = .95 * b.dimen.width;
//     b.addRectangle("mongo", {
//         width: 400,
//         height: 75
//     }, {
//         x: c / 2,
//         y: a / 1.3
//     }, {
//         texture: "https://s3.amazonaws.com/prosepair/mlogo.png"
//     }, 2), b.addConstraint("mongo", c / 2 - 50, a - 20), b.addConstraint("mongo", c / 2 + 50, a - 20)
// }
// function g() {
//     d = !0;
//     var a = document.getElementById("legib");
//     (a.style.opacity = 1) && (a.style.opacity = 0)
// }
// function h() {
//     function f() {
//         c.style.opacity = b, b <= 1 && !d ? window.requestAnimationFrame(f) : ("Legible" == a.view && d && (c.style.opacity = 0), d = !1), b += .007
//     }
//     var b = 0,
//         c = document.getElementById("legib"),
//         e = window.requestAnimationFrame(f);
//     window.cancelAnimationFrame(e), setTimeout(function() {
//         d = !1, f()
//     }, 700)
// }
// function i() {
//     var a = c.isCacheComplete(),
//         b = document.getElementById("loadSkills");
//     a ? (b.style.visibility = "hidden", e(), h()) : (b.style.visibility = "visible", c.onCacheComplete(function() {
//         b.style.visibility = "hidden", e(), h()
//     }))
// }
// function j() {
//     for (var c in a.skills)
//         for (var d = a.skills[c].entries, e = 0; e < d.length; e++)
//             if ("physics" in d[e]) {
//                 var f = d[e].physics,
//                     g = "https://s3.amazonaws.com/prosepair/" + f.n + ".png";
//                 "circle" == f.t ? b.addCircle(f.n, f.r, {
//                     x: f.c[0],
//                     y: f.c[1]
//                 }, {
//                     texture: g,
//                     xScale: f.s,
//                     yScale: f.s
//                 }) : "rect" == f.t && b.addRectangle(f.n, {
//                     width: f.d[0],
//                     height: f.d[1]
//                 }, {
//                     x: f.c[0],
//                     y: f.c[1]
//                 }, {
//                     texture: g,
//                     xScale: f.s,
//                     yScale: f.s
//                 })
//             }
// }
// function k() {
//     a.skills = [{
//         type: "Languages",
//         entries: [{
//             name: "Swift",
//             level: "Experienced",
//             physics: {
//                 t: "circle",
//                 n: "swiftball",
//                 r: 50,
//                 c: [205, -350],
//                 s: 50 / 107.5
//             }
//         }, {
//             name: "Javascript",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "javascript",
//                 d: [150, 150],
//                 c: [540, 0],
//                 s: .5
//             }
//         }, {
//             name: "Python",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "python",
//                 d: [120.4, 182.4],
//                 c: [220, 0],
//                 s: .4
//             }
//         }, {
//             name: "Objective C",
//             level: "Apprentice",
//             physics: {
//                 t: "circle",
//                 n: "ObjectiveC",
//                 r: 45,
//                 c: [605, -320],
//                 s: .3
//             }
//         }]
//     }, {
//         type: "Databases",
//         entries: [{
//             name: "MongoDB",
//             level: "Experienced"
//         }, {
//             name: "MySql",
//             level: "Experienced",
//             physics: {
//                 t: "circle",
//                 n: "sqlng",
//                 r: 70,
//                 c: [520, -300],
//                 s: 70 / 231.5
//             }
//         }]
//     }, {
//         type: "Frameworks",
//         entries: [{
//             name: "AngularJS",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "angular",
//                 d: [460, 75],
//                 c: [400, -600],
//                 s: .5
//             }
//         }, {
//             name: "Django",
//             level: "Experienced",
//             physics: {
//                 t: "circle",
//                 n: "django",
//                 r: 87,
//                 c: [590, -850],
//                 s: .5
//             }
//         }, {
//             name: "Flask",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "flask",
//                 d: [120, 74],
//                 c: [205, -420],
//                 s: 1
//             }
//         }, {
//             name: "Node.js (runtime)",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "node",
//                 d: [483 * .8, 106.4],
//                 c: [545, -800],
//                 s: .8
//             }
//         }]
//     }, {
//         type: "Libraries",
//         entries: [{
//             name: "React",
//             level: "Apprentice",
//             physics: {
//                 t: "circle",
//                 n: "react",
//                 r: 64,
//                 c: [290, -850],
//                 s: .5
//             }
//         }, {
//             name: "Socket.IO",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "socket",
//                 d: [394 * .3, 134 * .3],
//                 c: [290, -850],
//                 s: .3
//             }
//         }]
//     }, {
//         type: "Misc.",
//         entries: [{
//             name: "HTML",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "html",
//                 d: [81.2, 60],
//                 c: [720, -40],
//                 s: .4
//             }
//         }, {
//             name: "CSS",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "css",
//                 d: [85.2, 60],
//                 c: [320, -890],
//                 s: .4
//             }
//         }, {
//             name: "Git",
//             level: "Experienced",
//             physics: {
//                 t: "rect",
//                 n: "git",
//                 d: [96.4, 97.2],
//                 c: [120, -264],
//                 s: .4
//             }
//         }]
//     }]
// }
// var d = !1;
// a.skills = [], a.view = "Legible", k(), i(), a.legibleToggle = function() {
//     d = !1, "Legible" == a.view ? (a.view = "Physics", b.clear()) : (g(), a.view = "Legible", k(), e(), h())
//  function r(a) {
//     var c = {
//         isStatic: !0,
//         render: {
//             visible: !0
//         }
//     };
//     return [m.rectangle(a.width / 2, -1500, a.width, 1, c), m.rectangle(a.width / 2, a.height - 10, a.width, 1, c), m.rectangle(0, a.height / 2, 1, a.height, c), m.rectangle(a.width, a.height / 2, 1, a.height, c)]
// }
// function s(a) {
//     return j.create(f, {
//         render: {
//             canvas: g,
//             options: {
//                 showAngleIndicator: !0,
//                 wireframes: !0,
//                 width: a.width,
//                 height: a.height
//             }
//         }
//     })
// }
// function t(a) {
//     var b = e.getBoundingClientRect();
//     a({
//         height: b.height,
//         width: b.width
//     })
// }
// function u() {
//     var a = h.render.options;
//     a.background = "none", a.showAngleIndicator = !1, a.wireframes = !1, a.showCollsions = !1, a.showVelocity = !1
// }
// function v(a) {
//     g = document.getElementById("canvas"), g.height = a.height, g.width = .975 * a.width, g.style.display = "initial"
// }
// function w() {
//     var a = g.getContext("2d");
//     a.clearRect(0, 0, g.height, g.width), g.style.display = "none"
// }
// function x() {
//     e = document.getElementById("main"), f = document.getElementById("sHome")
// }
// var a = {},
//     b = {},
//     c = [],
//     d = [];
// initial = !1;
// var e, f, g, h, i, j = Matter.Engine,
//     k = Matter.World,
//     m = (Matter.Body, Matter.Bodies),
//     p = (Matter.Common, Matter.Composites, Matter.MouseConstraint),
//     q = Matter.Constraint;
// return a.init = function() {
//     var a = this;
//     initial || (initial = !0), x(), t(function(b) {
//         a.dimen = b, v(b), h = s(b), h.world.bodies = [], d = r(b), i = p.create(h), k.add(h.world, i), k.add(h.world, d)
//     }), window.addEventListener("resize", function() {
//         t(function(b) {
//             a.dimen = b, d.length > 0 && (k.remove(h.world, [d[0], d[1], d[2], d[3]]), d = r(b), v(b), h.world.bounds.max.x = b.width, h.world.bounds.max.y = b.height, k.add(h.world, d))
//         })
//     })
// }, a.run = function() {
//     u(), j.run(h)
// }, a.clear = function() {
//     initial && (k.clear(h.world), j.clear(h), w())
// }, a.updateWorldQueue = function() {
//     var a = [],
//         d = [];
//     for (var e in b) {
//         var f = b[e];
//         f.world || (a.push(f.obj), b[e].world = !1)
//     }
//     k.add(h.world, a);
//     for (var g = c.length - 1; g >= 0; g--) d.push(c.pop());
//     k.add(h.world, d)
// }, a.addConstraint = function(a, d, e) {
//     c.push(q.create({
//         bodyA: b[a].obj,
//         pointB: {
//             x: d,
//             y: e
//         }
//     }))
// }, a.addCircle = function(a, c, d, e, f) {
//     f || (f = 1);
//     var g = {
//         visible: !1,
//         isStatic: !1,
//         density: f,
//         restitution: .8,
//         friction: 1.01
//     };
//     e && (g.render = {
//         strokeStyle: "#333333",
//         sprite: e
//     }), b[a] = {
//         world: !1,
//         obj: m.circle(d.x, d.y, c, g)
//     }
// }, a.addRectangle = function(a, c, d, e, f) {
//     f || (f = 1);
//     var g = {
//         visible: !1,
//         isStatic: !1,
//         density: f,
//         restitution: .8,
//         friction: 1.01
//     };
//     e && (g.render = {
//         strokeStyle: "#333333",
//         sprite: e
//     }), b[a] = {
//         world: !1,
//         obj: m.rectangle(d.x, d.y, c.width, c.height, g)
//     }
// }, a 
//# sourceMappingURL=physics-anim.service.js.map