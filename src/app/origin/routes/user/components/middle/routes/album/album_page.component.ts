import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
// //
import { ArtistModel as AlbumInfo, ArtistModel as SongInfo} from "src/app/origin/models/artist.model"
//
import { MusicService } from "../../../../services/music.service"
import { PlayerService } from "../../../../services/player.service"
//
import { Functions, Variables } from "src/app/origin/global";
import { Subscription, switchMap } from "rxjs"

@Component({
    selector: 'album-page-comp',
    templateUrl: './album_page.component.html',
    styleUrls: [ './album_page.component.sass' ]
})

export class AlbumPageComponent implements OnInit {

    _albumInfo: AlbumInfo = new AlbumInfo();
    set albumInfo(albumInfo: AlbumInfo) {
        this._albumInfo = albumInfo
        
        this.srcCover = Functions.albumCover('/' + albumInfo._id + '/' + albumInfo.album?.id);

        const songs = Functions.convertFromArtistDownToSong(albumInfo);

        this.orderOfSongs = songs
    }
    get albumInfo(): AlbumInfo {
        return this._albumInfo;
    }
    //
    srcCover: string = Variables.srcDefaultCover
    orderOfSongs: SongInfo[] = []
    
    constructor(private activatedRoute: ActivatedRoute, private musicService: MusicService, private playerService: PlayerService) { 
        // console.log('create')
        // this.subscription = this.activatedRoute.params
        // .subscribe(params => {
        //     this.musicService
        //     .postFindAlbumById({ idArtist: params['idArtist'], idAlbum: params['idAlbum'] })
        //     .subscribe(album => this.albumInfo = album)
        // })
    }

    clickPlayAlbum() {
        this.playerService.setSong(this.orderOfSongs[0], true)

        if(this.playerService.orderOfSongs != this.orderOfSongs)
            this.playerService.setOrderOfSongs(this.orderOfSongs)
    }

    //
    ngOnInit() {
        const previosId = this.activatedRoute.snapshot.params['idArtist']
        //it`s needed for refreshering page, even if it`s same url (but different params)
        this.activatedRoute.paramMap
        .pipe(switchMap((params) => 
            this.musicService.postFindAlbumById({ idArtist: params.get('idArtist'), idAlbum: params.get('idAlbum') })
        ))
        .subscribe(Functions.serverResponse((album: AlbumInfo) => this.albumInfo = album))
    }
}