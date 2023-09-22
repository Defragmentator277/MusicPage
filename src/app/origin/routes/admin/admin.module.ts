//module`s
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
// //my own
import { AdminRoutingModule } from './admin_routing.module'
//component`s
import { AdminComponent } from './admin.component'
import { ArtistComponent } from './routes/artist/artist.component'
// //common
import { OperationsComponent } from './components/operations/operations.component'


@NgModule({
    imports: [ CommonModule, FormsModule, AdminRoutingModule ],
    declarations: [
        AdminComponent,
            //routes ^
            ArtistComponent,
            // //
            OperationsComponent
    ],
    exports: [ ]
})

export class AdminModule {}