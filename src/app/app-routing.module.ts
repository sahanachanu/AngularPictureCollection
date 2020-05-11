import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { EditImageComponent } from './edit-image/edit-image.component';
import { NewEditImageComponent } from './new-edit-image/new-edit-image.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomepageComponent},
  /**change component to EditImageComponent if  the old version is needed */
  {path:'edit/:url', component:NewEditImageComponent}
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
