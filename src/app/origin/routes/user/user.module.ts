//modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { UserRoutingModule } from './user_routing.module'
//services
import { LoginService } from './services/login.service'
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
import { YourMusicComponent } from './components/middle/routes/your_music/your_music.component'
// //common component
import { SongBlockComponent } from './components/song_block/song_block.component'
import { ContextMenuComponent } from './components/context_menu/context_menu.component'
// //
import { PlayerComponent } from './components/player/player.component'


@NgModule({
    imports: [ CommonModule, HttpClientModule, UserRoutingModule ],
    declarations: [ 
        //main component
        UserComponent, 

        HeaderComponent,
        MiddleComponent,
        //routes ^
            MainComponent,
            Top100Component,
            YourMusicComponent,
        FooterComponent,
        //common components
        SongBlockComponent,
        ContextMenuComponent,
        //
        PlayerComponent
    ],
    providers: [ LoginService, MusicService, PlayerService ],
    exports: [ UserComponent ]
})

export class UserModule { }