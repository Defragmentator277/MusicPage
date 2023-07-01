import { Injectable } from "@angular/core"
//
import { ArtistModel as SongInfo } from "src/app/origin/models/artist.model"
import { Variables } from "src/app/origin/global"

class SongInPlayer {
    readonly songInfo: SongInfo = new SongInfo;
    readonly src: string = ''

    constructor(songInfo: SongInfo) {
        this.songInfo = songInfo
        this.src = Variables.srcArtist + '/' + songInfo.src + '/' + songInfo.album?.src + '/' + songInfo.album?.song?.src
    }
}

@Injectable()
export class PlayerService {
    songInPlayer: SongInPlayer = new SongInPlayer(new SongInfo())
    orderOfSongs: SongInfo[] = []
    //linked components
    compPlayer: any | undefined
    compThatCanPlay: any[] = []
    //
    readonly audio: HTMLAudioElement = new Audio()
    //ref to timer which every second transfer progress to player component
    timerDuration: any | undefined

    constructor() {
        //attach event handlers
        this.audio.onended = () => {
            //clear timer
            if(this.timerDuration)
                clearInterval(this.timerDuration)
            
            this.refreshCompPlayState(false)
            //play next song in order
            if(this.orderOfSongs)
            {
                const index = this.orderOfSongs.indexOf(this.songInPlayer.songInfo);
                if(index < this.orderOfSongs.length)
                    this.setSong(this.orderOfSongs[index + 1], true)
            }
        }
    }
    
    refreshCompPlayState(playing: boolean) {
        //comp must have property src: string and playing: boolean
        this.compThatCanPlay.forEach((comp) => { comp.playing = playing && comp.src == this.songInPlayer?.src })
        //chainge player state chainge
        if(this.compPlayer)
            this.compPlayer.playing = playing
    } 
    // 
    setSong(song_info: SongInfo, play: boolean = true) {
        //clear timer
        if(this.timerDuration)
            clearInterval(this.timerDuration)
        
        this.songInPlayer = new SongInPlayer(song_info)
        //
        this.audio.src = this.songInPlayer.src
        this.audio.load()

        if(this.compPlayer)
            this.compPlayer.songInfo = this.songInPlayer.songInfo
        this.audio.onloadeddata = () => {   
            //On loaded audio transfered duration string
            let seconds = Math.floor(this.audio.duration % 60).toString();
            this.compPlayer.duration = Math.floor(this.audio.duration / 60) + ':' + seconds + (seconds.length > 1 ? '' : '0')
        };
        
        this.refreshCompPlayState(true)
        if(play)
            this.play();
    }

    setOrderOfSongs(orderOfSongs: SongInfo[]) {
        this.orderOfSongs = orderOfSongs
        //set songs order in player component
        this.compPlayer.orderOfSongs = this.orderOfSongs
    }

    play() {
        this.timerDuration = setInterval(() => {
            this.compPlayer.progress = this.audio.currentTime / this.audio.duration * 100
        }, 100)

        this.refreshCompPlayState(true)
        this.audio.play()
    }

    pause() {
        if(this.timerDuration)
            clearInterval(this.timerDuration)

        this.refreshCompPlayState(false)
        this.audio.pause()
    }
}