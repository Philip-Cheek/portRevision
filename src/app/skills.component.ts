import { Component, OnInit } from '@angular/core';
import { PhysicsAnimService } from './physics-anim.service';
import { Skills } from './skills';
import { SkillType } from './skillType';


@Component({
  selector: 'my-skillsheet',
  template: `
  	<canvas id = 'canvas'></canvas>
  `,
  styleUrls: ['app/title.component.css']
})


export class SkillsComponent  { 
	skills:SkillType[];

	constructor(private pAnimService: PhysicsAnimService) {}

	ngOnInit(){
		this.skills = Skills;
		this.pAnimService.enableAnimService(this.skills);
	}
}