import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MouseAnimService }     from './mouse-anim.service';
import { PhysicsAnimService }     from './physics-anim.service';


import { AppComponent } from './app.component';
import { TitleComponent }  from './title.component';
import { SkillsComponent }  from './skills.component';


import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	AppRoutingModule
   ],
  declarations: [
   AppComponent,
   TitleComponent,
   SkillsComponent
   ],
  providers: [ MouseAnimService, PhysicsAnimService ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
