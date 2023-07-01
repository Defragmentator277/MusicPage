import { Component, OnInit } from '@angular/core'
//
import { SongBlockComponent } from '../song_block/song_block.component';
//
import { PlayerService } from '../../services/player.service';
//
import { ArtistModel as SongInfo } from 'src/app/origin/models/artist.model';
import { Variables, Functions } from 'src/app/origin/global';

@Component({
    selector: 'player-comp',
    templateUrl: './player.component.html',
    styleUrls: [ './player.component.sass' ]
})

export class PlayerComponent implements OnInit {
    _songInfo: SongInfo = new SongInfo();
    set songInfo(songInfo: SongInfo) {
        this._songInfo = songInfo

        this.src = Variables.srcArtist + '/' + this.songInfo.src + '/' + this.songInfo.album?.src + '/' + this.songInfo.album?.song?.src
        this.srcCover = Functions.albumCover('/' + this.songInfo.src + '/' + this.songInfo.album?.src)
    }
    get songInfo(): SongInfo { return this._songInfo }
    // //set from setter
    src: string = ''
    srcCover: string = ''
    //set from service
    orderOfSongs: SongInfo[] = []
    duration: string = ''
    playing: boolean = false
    progress: number = 0 

    constructor(private playerService: PlayerService) {}

    showOrderOfSongs: boolean = false
    clickOrderOfSongs() {
        this.showOrderOfSongs = !this.showOrderOfSongs
    }
    //
    clickPlayButton() {
        if(!this.playing)
            this.playerService.play()
        else
            this.playerService.pause()
    }

    clickPreviousSong() {
        if(this.orderOfSongs)
        {
            const index = this.orderOfSongs.indexOf(this.songInfo);
            if(index > 0)
                this.playerService.setSong(this.orderOfSongs[index - 1]);
        }
    }

    clickNextSong() {
        if(this.orderOfSongs)
        {
            const index = this.orderOfSongs.indexOf(this.songInfo);
            if(index < this.orderOfSongs.length)
                this.playerService.setSong(this.orderOfSongs[index + 1]);
        }
        
    }
    //
    private pressOnStrip: boolean = false
    mouseDownOnStrip(e: any) {
        this.playerService.pause()

        this.pressOnStrip = true
    }

    mouseMoveStrip(e: any) {
        if(this.pressOnStrip)
            this.progress = e.clientX / window.innerWidth * 100
    }

    mouseUpOnStrip(e: any) {
        if(this.pressOnStrip)
        {
            this.playerService.audio.currentTime = e.clientX / window.innerWidth * this.playerService.audio.duration;
            this.playerService.play()

            this.pressOnStrip = false
        }
    }
    // //
    ngOnInit() {
        //connect with service by property to chainge song information
        this.playerService.compPlayer = this
    }
}