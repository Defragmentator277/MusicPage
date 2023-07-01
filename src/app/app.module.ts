import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// //
import { AppRoutingModule } from './app-routing.module';
// Components
import { OriginComponent } from './origin/origin.component';
// Modules
import { UserModule } from './origin/routes/user/user.module';
// //
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 
    UserModule
  ],
  declarations: [
    OriginComponent
  ],
  // providers: [],
  bootstrap: [OriginComponent]
})

export class AppModule { }
