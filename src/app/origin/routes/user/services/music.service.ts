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

    postFindArtist(cond: any) {
        //cond: { _id: ... }
        return this.http.post(this.url + '/find', cond)
    }
}
