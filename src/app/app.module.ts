import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
// //Components
import { OriginComponent } from './origin/origin.component'
// //Modules
import { UserModule } from './origin/routes/user/user.module'
import { AdminModule } from './origin/routes/admin/admin.module'
// //services
import { ModalWindowService } from './origin/routes/services/modal_window.service'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    // 
    AppRoutingModule,

    UserModule,
    AdminModule
  ],
  declarations: [
    OriginComponent
  ],
  providers: [ ModalWindowService ],
  bootstrap: [ OriginComponent ]
})

export class AppModule { }
