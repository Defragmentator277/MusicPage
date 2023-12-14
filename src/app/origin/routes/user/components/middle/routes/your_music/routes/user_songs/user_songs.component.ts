import { Component, OnInit } from "@angular/core"
//
import { UserModel } from "src/app/origin/models/user.model"
//
import { MusicService } from "src/app/origin/routes/user/services/music.service"
import { UserService } from "src/app/origin/routes/user/services/user.service"


@Component({
    selector: 'user-songs',
    templateUrl: './user_songs.component.html',
    styleUrls: [ './user_songs.component.sass' ]
})

export class UserSongsComponent implements OnInit {
    user?: UserModel
    
    constructor(private musicService: MusicService,
                private userService: UserService) {

    }

    ngOnInit() {
        //user checking in parent component(your_music)
        this.user = this.userService.getUser();

    }
}