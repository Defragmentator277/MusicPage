export class Variables {
    static urlServer: string = 'http://localhost:3000'

    static srcArtist: string = '/assets/artist'
    //
    static apiUser: string = '/api/user'
    static apiMusic: string = '/api/artist'
}

export class Functions {
    static serverResponse(nextFunc: Function) {
        return {
            next: (songs: any) => {
                if(songs.status == 'success')
                {
                    console.log('Success get from server:');
                    nextFunc(songs.answer);
                }
                else
                    console.log('Failed get from server:');
                console.log(songs);
            },
            error: (err: any) => {
                console.log('Get Error');
                console.log(err);
            }
        };
    } 

    static albumCover(cover_path: string): string {
        //function to set albumcover
        //cover path: /artist_id/album_id
        return Variables.srcArtist + cover_path + '/album_cover.jpg';
    }

    static artistCover(cover_path: string): string {
        return Variables.srcArtist + cover_path + '/artist_cover.jpg'
    }
}