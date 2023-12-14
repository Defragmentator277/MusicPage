import { Component, Input, OnInit, OnDestroy } from "@angular/core"

import { PlayerService } from "../../services/player.service";
import { UserService } from "../../services/user.service";
//
import { ArtistModel as SongInfo } from "src/app/origin/models/artist.model"
import { UserModel } from "src/app/origin/models/user.model";
// 
import { Variables, Functions } from "src/app/origin/global";

@Component({
    selector: 'song-block-comp',
    templateUrl: './song_block.component.html',
    styleUrls: [ './song_block.component.sass' ]
})

export class SongBlockComponent implements OnInit, OnDestroy { 
    // idUser?: string
    songAdd: boolean = false

    @Input() disableArtistLink: boolean = false
    @Input() disableAlbumLink: boolean = false
    // 
    @Input() orderOfSongs: SongInfo[] = []
    @Input() serial_number: number = 1
    // //
    _songInfo: SongInfo = new SongInfo()
    @Input() set songInfo(songInfo: SongInfo) {
        this._songInfo = songInfo
        //set src for fast access
        this.src = Functions.songSrc(this.songInfo)
        this.srcCover = Functions.albumCover('/' + this.songInfo._id + '/' + this.songInfo.album?.id)
    }
    get songInfo() : SongInfo { return this._songInfo }

    //set from setter
    src: string = ''
    srcCover: string = Variables.srcDefaultCover;
    //
    playing: boolean = false
    showContextMenu: boolean = false

    constructor(private playerService: PlayerService, private userService: UserService) { }

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

    clickAddSong() {
        this.userService.postAddSongFavorite({
            idArtist: this.songInfo._id as string,
            idAlbum: this.songInfo.album?.id as string,
            idSong: this.songInfo.album?.song?.id as string
        })
        .subscribe(() => this.userService.refreshUserState());
    }

    clickDelSong() {
        this.userService.postDelSongFavorite({
            idSong: this.songInfo.album?.song?.id as string
        })
        .subscribe(() => this.userService.refreshUserState());
    }

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

        //get user for knowledge he add song or not
        this.userService.getUserSubscription()
        .subscribe((user) => {
            console.log('Chainge User in SongBlock')
            this.songAdd = user?.saved?.songs.some((song) => song.id == this.songInfo.album?.song?.id) || false
        })
    }

    ngOnDestroy() {
        //delete this element from array on destroy
        let arr = this.playerService.compThatCanPlay;
        arr.splice(arr.indexOf(this), 1)
    }   
}