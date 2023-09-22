import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
//
import { AppRoutingModule } from './app-routing.module'
// //Components
import { OriginComponent } from './origin/origin.component'
// //Modules
import { UserModule } from './origin/routes/user/user.module'
import { AdminModule } from './origin/routes/admin/admin.module'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 
    UserModule,
    AdminModule
  ],
  declarations: [
    OriginComponent
  ],
  // providers: [],
  bootstrap: [OriginComponent]
})

export class AppModule { }
