import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
//
import { Variables } from 'src/app/origin/global'

@Injectable()
export class MusicService {
    url: string = Variables.urlServer + Variables.apiMusic

    constructor(private http: HttpClient) {}

    postFindSongs(cond: { type: 'forSongBlock' | 'custom', pipelines?: any[] }) {
        //cond: { type: 'forSongBlock' | 'custom', pipelines: [...] }
        return this.http.post(this.url + '/song/find', cond)
    }
    //
    postFindAlbumById(cond: { idArtist: string | null, idAlbum: string | null, type?: 'forAlbumPage' | 'custom' }) {
        //cond: { idArtist: ..., idAlbum: ..., type: 'forAlbumPage' | 'custom' }
        return this.http.post(this.url + '/album/findById', cond);
    }
    //
    postFindArtists(cond: { pipelines?: any[] }) {
        //cond: { pipelines: [...] }
        return this.http.post(this.url + '/find', cond)
    }

    postFindArtistById(cond: { idArtist: string | null }) {
        //cond: { idArtist: ... }
        return this.http.post(this.url + '/findById', cond)
    }
}
