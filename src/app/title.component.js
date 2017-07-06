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
var router_1 = require("@angular/router");
var mouse_anim_service_1 = require("./mouse-anim.service");
var TitleComponent = (function () {
    function TitleComponent(mAnimService, router) {
        this.mAnimService = mAnimService;
        this.router = router;
    }
    TitleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mAnimService.enableAnimService('card', 'canvas', 100, 38, 190, 4);
        this.router.events.subscribe(function (e) {
            if (e instanceof router_1.NavigationStart)
                _this.mAnimService.cancelService();
        });
    };
    return TitleComponent;
}());
TitleComponent = __decorate([
    core_1.Component({
        selector: 'my-title',
        template: "\n\n  \t<canvas id = 'canvas'></canvas>\n\n  \t<div id = 'cardContainer'>\n\t\t<div id = \"card\">\n\t\t\t<div class = 'outline'>\n\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t<p class = 'phil'>Philip Cheek</p>\n\t\t\t\t\t<a id = 'git' class = 'git'>\n\t\t\t\t\t\t<i class=\"fa fa-github\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<p class = 'other'>super cool dev dude</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n  ",
        styleUrls: ['app/title.component.css']
    }),
    __metadata("design:paramtypes", [mouse_anim_service_1.MouseAnimService, router_1.Router])
], TitleComponent);
exports.TitleComponent = TitleComponent;
//# sourceMappingURL=title.component.js.map