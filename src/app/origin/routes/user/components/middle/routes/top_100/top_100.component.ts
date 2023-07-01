import { Component, OnInit } from "@angular/core"
//
import { ArtistModel as SongInfo } from "src/app/origin/models/artist.model"
//
import { MusicService } from "../../../../services/music.service"
//
import { Functions } from "src/app/origin/global"

@Component({
    selector: 'top-100-comp',
    templateUrl: './top_100.component.html',
    styleUrls: [ './top_100.component.sass' ]
})

export class Top100Component implements OnInit {
    songs: SongInfo[] = []

    constructor(private musicService: MusicService) {}

    ngOnInit() {
        this.musicService
        .postFindSongs({ type: 'forSongBlock', pipelines: [{ $sort: { 'album.song.likes': -1 } }] })
        //Set Songs
        .subscribe(Functions.serverResponse((songs: SongInfo[]) => this.songs = songs))
    }
}