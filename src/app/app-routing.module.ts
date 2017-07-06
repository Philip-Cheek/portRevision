import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TitleComponent } from './title.component';
import { SkillsComponent } from './skills.component';


const routes: Routes = [
  { path: '',  component: TitleComponent },
  { path: 'skills', component: SkillsComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}