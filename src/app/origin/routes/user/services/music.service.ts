import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
//
import { Variables } from 'src/app/origin/global'

@Injectable()
export class MusicService {
    url: string = Variables.urlServer + Variables.apiMusic

    constructor(private http: HttpClient) {}

    postFindSongs(cond: any) {
        //cond: { type: 'forSongBlock' | 'custom', match: ..., pipelines: [...] }
        return this.http.post(this.url + '/song/find', cond)
    }
    //
    postFindArtists(cond: any) {
        //cond: { match: ..., pipelines: [...] }
        return this.http.post(this.url + '/find', cond)
    }

    postFindArtistById(cond: any) {
        //cond: { id: ... }
        return this.http.post(this.url + '/findById', cond)
    }
}
