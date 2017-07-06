import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'my-app',
  template: `
  	<svg version = '1.1' viewBox="0 70 386 186" height="100" width="51" z-index = "90" preserveAspectRatio="none">
      <defs>
          <linearGradient id="gradient">
            <stop class="stop1" offset="0%" stop-color="#32485d"/>
            <stop class="stop2" offset="100%" stop-color="#151f28"/>
          </linearGradient>
        </defs>http://localhost:3000/skills
        <path x="0" y="0" id ="p" d="M0 0 L0 360 L 190 360 Q90 180 180 0" z-index = "90" [attr.fill] = "style()"/>

  </svg>

  	<div id = "menu">
  		<div id = 'columnBody' *ngFor = "let item of menu">
			<span class = 'square'>
				<a class = 'mItem' routerLink="/skills" routerLinkActive="active">
					{{item}}
				</a>
			</span><br> 
			<div class = 'manualSpacer'></div>
  		</div>
  	</div>
  	<div id = 'pContainer'>
  		<router-outlet></router-outlet>
  	</div>
    
  `,
  styleUrls: ['./app.component.css'],
})

export class AppComponent{
  menu:string[];

  constructor(private router:Router) {}

  ngOnInit():void{
  	this.menu = [
  		'Home',
  		'Skills',
  		'Dude'
  	]
  }

  style():string{
    return "url(http://localhost:3000" + this.router.url + "#gradient)";
  }

}