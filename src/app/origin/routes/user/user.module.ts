//modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
// //my own
import { UserRoutingModule } from './user_routing.module'
//services
import { UserService } from './services/user.service'
import { MusicService } from './services/music.service'
import { PlayerService } from './services/player.service'
//component`s
import { UserComponent } from './user.component'
// //
import { HeaderComponent } from './components/header/header.component' 
import { MiddleComponent } from './components/middle/middle.component'
import { FooterComponent } from './components/footer/footer.component'
// //route
import { MainComponent } from './components/middle/routes/main/main.component'
import { Top100Component } from './components/middle/routes/top_100/top_100.component'
// // //
import { YourMusicComponent } from './components/middle/routes/your_music/your_music.component'
import { UserSongsComponent } from './components/middle/routes/your_music/routes/user_songs/user_songs.component'
// // //
import { ArtistPageComponent } from './components/middle/routes/artist/artist_page.component'
import { AlbumPageComponent } from './components/middle/routes/album/album_page.component'
import { EnterComponent } from './components/middle/routes/enter/enter.component'
// //common component
import { SongBlockComponent } from './components/song_block/song_block.component'
import { AlbumBlockComponent } from './components/album_block/album_block.component'
import { ContextMenuComponent } from './components/context_menu/context_menu.component'
import { ExpandContainer } from './components/expand_container/expand_container.component'
// //
import { PlayerComponent } from './components/player/player.component'

@NgModule({
    imports: [ 
        CommonModule, 
        HttpClientModule, 
        FormsModule,

        UserRoutingModule 
    ],
    declarations: [ 
        //main component
        UserComponent, 
        //
        HeaderComponent,
        MiddleComponent,
        //routes ^
            MainComponent,
            Top100Component,
            YourMusicComponent,
            //routes ^
                UserSongsComponent,
            ArtistPageComponent,
            AlbumPageComponent,
            EnterComponent,
        FooterComponent,
        //common 
        SongBlockComponent,
        AlbumBlockComponent,
        ExpandContainer,
        //unique 
        ContextMenuComponent,
        PlayerComponent
    ],
    providers: [ UserService, MusicService, PlayerService ],
    exports: [ UserComponent ]
})

export class UserModule { }