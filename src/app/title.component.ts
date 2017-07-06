import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MouseAnimService } from './mouse-anim.service';



@Component({
  selector: 'my-title',
  template: `

  	<canvas id = 'canvas'></canvas>

  	<div id = 'cardContainer'>
		<div id = "card">
			<div class = 'outline'>
				<div class="card-content">
					<p class = 'phil'>Philip Cheek</p>
					<a id = 'git' class = 'git'>
						<i class="fa fa-github"></i>
					</a>
					<p class = 'other'>super cool dev dude</p>
				</div>
			</div>
		</div>
	</div>
  `,
  styleUrls: ['app/title.component.css']
})


export class TitleComponent  { 
	constructor(private mAnimService: MouseAnimService, private router: Router) {}

	ngOnInit(){
		this.mAnimService.enableAnimService('card', 'canvas', 100, 38, 190, 4);
		this.router.events.subscribe((e) => {
			if (e instanceof NavigationStart)
				this.mAnimService.cancelService();
		});
	}
}
