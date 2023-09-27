import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
// //
import { AlbumModel, ArtistModel as AlbumInfo, ArtistModel as SongInfo} from "src/app/origin/models/artist.model"
//
import { MusicService } from "../../../../services/music.service"
//
import { Functions, Variables } from "src/app/origin/global";

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
        console.log(songs);
        this.songsOrder = songs
    }
    get albumInfo(): AlbumInfo {
        return this._albumInfo;
    }
    //
    srcCover: string = Variables.srcDefaultCover
    songsOrder: SongInfo[] = []
    
    constructor(private route: ActivatedRoute, private musicService: MusicService) { }

    //
    ngOnInit() {
        const idArtist = this.route.snapshot.params['idArtist']
        const idAlbum = this.route.snapshot.params['idAlbum']

        this.musicService.postFindAlbumById({ idArtist: idArtist, idAlbum: idAlbum })
        .subscribe(Functions.serverResponse((album: AlbumInfo) => this.albumInfo = album))
    }
}