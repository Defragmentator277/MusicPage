import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
//
import { AdminComponent } from './admin.component'
import { ArtistComponent } from './routes/artist/artist.component'

const routes: Routes = [
    { path: 'admin', component: AdminComponent, children: [
        { path: 'artist', component: ArtistComponent }
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class AdminRoutingModule {}