import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// 
import { UserComponent } from './origin/routes/user/user.component';
// //
const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// 
export class AppRoutingModule {}
