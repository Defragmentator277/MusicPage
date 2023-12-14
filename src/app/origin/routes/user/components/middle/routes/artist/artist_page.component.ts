import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
// //
import { ArtistModel, ArtistModel as SongInfo } from "src/app/origin/models/artist.model"
//
import { MusicService } from "../../../../services/music.service"
// 
import { Functions, Variables } from "src/app/origin/global"
import { switchMap } from "rxjs"

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

    constructor(private activatedRoute: ActivatedRoute, private musicService: MusicService) { }

    //
    ngOnInit() {
        //it`s needed for refreshering page, even if it`s same url (but different params)
        this.activatedRoute.paramMap
        .pipe(switchMap(params => 
            this.musicService.postFindArtistById({ idArtist: params.get('idArtist') })
        ))
        .subscribe(Functions.serverResponse((artist: ArtistModel) => this.artistInfo = artist))
    }
}