import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
// //
import { ArtistModel } from "src/app/origin/models/artist.model"
//
import { MusicService } from "../../../../services/music.service"
// 
import { Functions } from "src/app/origin/global"

@Component({
    selector: 'artist-comp',
    templateUrl: './artist.component.html',
    styleUrls: [ './artist.component.sass' ]
})

export class ArtistComponent implements OnInit {
    _artistInfo: ArtistModel = new ArtistModel();
    set artistInfo(artistInfo: ArtistModel) {
        this._artistInfo = artistInfo
        this.srcCover = Functions.artistCover('/' + artistInfo.src)
    }
    //
    srcCover: string = ''

    constructor(private route: ActivatedRoute, private musicService: MusicService) { }

    //
    ngOnInit() {
        const id = this.route.snapshot.params['id']

        this.musicService.postFindArtist({ _id: id })
        .subscribe(Functions.serverResponse((artist: ArtistModel) => this.artistInfo = artist))
    }
}