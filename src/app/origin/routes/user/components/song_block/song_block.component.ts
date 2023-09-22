import { Component, Input, OnInit, OnDestroy } from "@angular/core"
//
import { PlayerService } from "../../services/player.service";
//
import { ArtistModel as SongInfo } from "src/app/origin/models/artist.model"
import { Variables, Functions } from "src/app/origin/global";

@Component({
    selector: 'song-block-comp',
    templateUrl: './song_block.component.html',
    styleUrls: [ './song_block.component.sass' ]
})

export class SongBlockComponent implements OnInit, OnDestroy { 
    @Input() orderOfSongs: SongInfo[] = [];
    @Input() serial_number: number = 1
    // //
    _songInfo: SongInfo = new SongInfo()
    @Input() set songInfo(songInfo: SongInfo) {
        this._songInfo = songInfo
        //set src for fast access
        this.src = Variables.srcArtist + '/' + this.songInfo._id + '/' + this.songInfo.album?.id + '/' + this.songInfo.album?.song?.id
        this.srcCover = Functions.albumCover('/' + this.songInfo._id + '/' + this.songInfo.album?.id)
    }
    get songInfo() : SongInfo { return this._songInfo }
    //set from setter
    src: string = ''
    srcCover: string = Variables.srcDefaultCoverAlbum
    // //
    playing: boolean = false

    constructor(private playerService: PlayerService) {}

    clickPlayButton() {
        if(!this.playing)
        {
            //if this is the same song just play it 
            if(!this.playerService.songInPlayer || 
               this.playerService.songInPlayer.src != this.src)
            {
                this.playerService.setSong(this.songInfo, false)
                //set order of songs if it has and he are not same
                if(this.orderOfSongs.length > 0 && 
                   this.playerService.orderOfSongs != this.orderOfSongs)
                    this.playerService.setOrderOfSongs(this.orderOfSongs)
            }

            this.playerService.play()
        }
        else
            this.playerService.pause()
    }

    showContextMenu: boolean = false
    clickContextMenu(e: any) {
        //page
        this.showContextMenu = !this.showContextMenu
    }
    //
    ngOnInit() {
        if(this.playerService.songInPlayer && 
           !this.playerService.audio.paused &&
           this.playerService.songInPlayer.src == this.src)
            this.playing = true
        //save all components that can play music, to chainge his playing state
        this.playerService.compThatCanPlay.push(this);
    }

    ngOnDestroy() {
        //delete this element from array on destroy
        let arr = this.playerService.compThatCanPlay;
        arr.splice(arr.indexOf(this), 1)
    }   
}