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
var physics_anim_service_1 = require("./physics-anim.service");
var skills_1 = require("./skills");
var SkillsComponent = (function () {
    function SkillsComponent(pAnimService) {
        this.pAnimService = pAnimService;
    }
    SkillsComponent.prototype.ngOnInit = function () {
        this.skills = skills_1.Skills;
        this.pAnimService.enableAnimService(this.skills);
    };
    return SkillsComponent;
}());
SkillsComponent = __decorate([
    core_1.Component({
        selector: 'my-skillsheet',
        template: "\n  \t<canvas id = 'canvas'></canvas>\n  ",
        styleUrls: ['app/title.component.css']
    }),
    __metadata("design:paramtypes", [physics_anim_service_1.PhysicsAnimService])
], SkillsComponent);
exports.SkillsComponent = SkillsComponent;
//# sourceMappingURL=skills.component.js.map