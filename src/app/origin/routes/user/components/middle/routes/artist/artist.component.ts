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

        this.srcCover = Functions.artistCover('/' + artistInfo._id)
        //convert information from server to 
        const arr: any[] = []
        artistInfo.albums?.forEach(album => {
            album.songs?.forEach(song => {
                arr.push({ ...artistInfo, albums: undefined, album: { ...album, songs: undefined, song: { ...song } }})
            });
        });
        arr.sort((a, b) => (b.album.song.likes || 0) - (a.album.song.likes || 0))
        this.songsOrderPopularity = arr
    }
    get artistInfo(): ArtistModel {
        return this._artistInfo
    }
    //set from setter
    srcCover: string = ''
    songsOrderPopularity: ArtistModel[] = []
    // //state variables
    expandSongs: boolean = false
    expandReleases: boolean = false

    constructor(private route: ActivatedRoute, private musicService: MusicService) { }

    //
    ngOnInit() {
        const id = this.route.snapshot.params['id']

        this.musicService.postFindArtistById({ id: id })
        .subscribe(Functions.serverResponse((artist: ArtistModel) => this.artistInfo = artist))
    }
}