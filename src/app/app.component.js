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
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.menu = [
            'Home',
            'Skills',
            'Dude'
        ];
    };
    AppComponent.prototype.style = function () {
        return "url(http://localhost:3000" + this.router.url + "#gradient)";
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n  \t<svg version = '1.1' viewBox=\"0 70 386 186\" height=\"100\" width=\"51\" z-index = \"90\" preserveAspectRatio=\"none\">\n      <defs>\n          <linearGradient id=\"gradient\">\n            <stop class=\"stop1\" offset=\"0%\" stop-color=\"#32485d\"/>\n            <stop class=\"stop2\" offset=\"100%\" stop-color=\"#151f28\"/>\n          </linearGradient>\n        </defs>http://localhost:3000/skills\n        <path x=\"0\" y=\"0\" id =\"p\" d=\"M0 0 L0 360 L 190 360 Q90 180 180 0\" z-index = \"90\" [attr.fill] = \"style()\"/>\n\n  </svg>\n\n  \t<div id = \"menu\">\n  \t\t<div id = 'columnBody' *ngFor = \"let item of menu\">\n\t\t\t<span class = 'square'>\n\t\t\t\t<a class = 'mItem' routerLink=\"/skills\" routerLinkActive=\"active\">\n\t\t\t\t\t{{item}}\n\t\t\t\t</a>\n\t\t\t</span><br> \n\t\t\t<div class = 'manualSpacer'></div>\n  \t\t</div>\n  \t</div>\n  \t<div id = 'pContainer'>\n  \t\t<router-outlet></router-outlet>\n  \t</div>\n    \n  ",
        styleUrls: ['./app.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map