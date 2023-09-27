import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
//
import { Variables } from 'src/app/origin/global'

@Injectable()
export class MusicService {
    url: string = Variables.urlServer + Variables.apiMusic

    constructor(private http: HttpClient) {}

    postFindSongs(cond: any) {
        //cond: { type: 'forSongBlock' | 'custom', pipelines: [...] }
        return this.http.post(this.url + '/song/find', cond)
    }
    //
    postFindAlbumById(cond: any) {
        //cond: { idArtist: ..., idAlbum: ..., type: 'forAlbumPage' | 'custom' }
        return this.http.post(this.url + '/album/findById', cond);
    }
    //
    postFindArtists(cond: any) {
        //cond: { pipelines: [...] }
        return this.http.post(this.url + '/find', cond)
    }

    postFindArtistById(cond: any) {
        //cond: { idArtist: ... }
        return this.http.post(this.url + '/findById', cond)
    }
}
