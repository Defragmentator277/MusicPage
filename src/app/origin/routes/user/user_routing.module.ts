// modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
// component`s
import { UserComponent } from './user.component';
// // routes
import { MainComponent } from "./components/middle/routes/main/main.component";
import { Top100Component } from "./components/middle/routes/top_100/top_100.component";
import { YourMusicComponent } from "./components/middle/routes/your_music/your_music.component";
import { ArtistPageComponent } from './components/middle/routes/artist/artist_page.component';
import { AlbumPageComponent } from './components/middle/routes/album/album_page.component';
// // //support
import { ExpandContainer } from './components/expand_container/expand_container.component';

const routes: Routes = [
    { path: 'user', component: UserComponent, 
        children: [
        { path: 'main', component: MainComponent },
        { path: 'top_100', component: Top100Component },
        { path: 'your_music', component: YourMusicComponent },

        { path: 'artist/:idArtist', component: ArtistPageComponent },
        { path: 'artist/:idArtist/album/:idAlbum', component: AlbumPageComponent }
    ]},
    // { path: '**', redirectTo: 'user/main' }
];
//
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class UserRoutingModule {}