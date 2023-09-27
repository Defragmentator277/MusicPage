import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
// //
import { ArtistModel, ArtistModel as SongInfo } from "src/app/origin/models/artist.model"
//
import { MusicService } from "../../../../services/music.service"
// 
import { Functions, Variables } from "src/app/origin/global"

@Component({
    selector: 'artist-comp',
    templateUrl: './artist_page.component.html',
    styleUrls: [ './artist_page.component.sass' ]
})

export class ArtistPageComponent implements OnInit {
    _artistInfo: ArtistModel = new ArtistModel();
    set artistInfo(artistInfo: ArtistModel) {
        this._artistInfo = artistInfo

        this.srcCover = Functions.artistCover('/' + artistInfo._id)
        //convert information about songs to make order
        const songs: SongInfo[] = Functions.convertFromArtistDownToSong(artistInfo);
        //sort by likes
        songs.sort((a, b) => (b.album?.song?.likes || 0) - (a.album?.song?.likes || 0))
        this.songsOrderPopularity = songs
    }
    get artistInfo(): ArtistModel {
        return this._artistInfo
    }
    //set from setter
    srcCover: string = Variables.srcDefaultCover
    songsOrderPopularity: SongInfo[] = []
    // //state variables
    expandSongs: boolean = false
    expandReleases: boolean = false

    constructor(private route: ActivatedRoute, private musicService: MusicService) { }

    //
    ngOnInit() {
        const id = this.route.snapshot.params['idArtist']

        this.musicService.postFindArtistById({ idArtist: id })
        .subscribe(Functions.serverResponse((artist: ArtistModel) => this.artistInfo = artist))
    }
}