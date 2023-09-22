import { Component, Input } from '@angular/core'
//
import { AlbumModel as AlbumInfo } from 'src/app/origin/models/artist.model'
//
import { Variables, Functions } from 'src/app/origin/global'

@Component({
    selector: 'album-block-comp',
    templateUrl: './album_block.component.html',
    styleUrls: [ './album_block.component.sass' ]
})

export class AlbumBlockComponent {
    //albumInfo: { id:..., title:..., year:... }
    _albumInfo: AlbumInfo = new AlbumInfo()
    @Input() set albumInfo(albumInfo: AlbumInfo) {
        this._albumInfo = albumInfo

        this.src = Functions.albumCover('/' + this.artistId + '/' + albumInfo.id)
    }   
    get albumInfo(): AlbumInfo { return this._albumInfo }
    //
    @Input() artistId: string | undefined
    @Input() artistTitle: string | undefined
    // //
    src: string = Variables.srcDefaultCoverAlbum

}