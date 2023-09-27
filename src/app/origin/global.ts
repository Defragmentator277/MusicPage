import { ArtistModel, ArtistModel as SongInfo } from "src/app/origin/models/artist.model"

export class Variables {
    static urlServer: string = 'http://localhost:3000'
    
    static apiUser: string = '/api/user'
    static apiMusic: string = '/api/artist'
    
    static srcArtist: string = '/assets/artist'
    //
    static srcDefaultCover: string = '/assets/common/temporaryCover.png'
    
}

export class Functions {
    static serverResponse(nextFunc: Function) {
        return {
            next: (res: any) => {
                if(res.status == 'success')
                {
                    console.log('Success get from server:');
                    nextFunc(res.answer);
                }
                else
                    console.log('Failed get from server:');

                console.log(res.answer);
            },
            error: (err: any) => {
                console.log('Get Error');
                console.log(err);
            }
        };
    } 
    //
    static albumCover(cover_path: string): string {
        //function to set albumcover
        //cover path: /artist_id/album_id
        //Standart name:album_cover/jpg
        return Variables.srcArtist + cover_path + '/album_cover.jpg'
    }

    static artistCover(cover_path: string): string {
        //Standart name:artist_cover.jpg
        return Variables.srcArtist + cover_path + '/artist_cover.jpg'
    }

    static songSrc(path: SongInfo | string): string {
        if(typeof path === "string")
            return Variables.srcArtist + path;

        //if it`s not primary type then it will be SongInfo object
        path = path as SongInfo;
        return Variables.srcArtist 
        + '/' + path._id 
        + '/' + path.album?.id 
        + '/' + path.album?.song?.id 
        + '.' + path.album?.song?.ext;
    }

    static convertFromArtistDownToSong(artistInfo: ArtistModel) {
        //Convert all info about song from artist down it`s song in single song info object (fedding to SongBlock reguraly)
        const songs: ArtistModel[] = []

        if(artistInfo.albums)
        {
            artistInfo.albums.forEach(album => {
                album.songs?.forEach(song => {
                    const new_song = {  ...artistInfo, album: { ...album, song: { ...song } }};
                    delete new_song['albums']
                    delete new_song['album']['songs']
                    songs.push(new_song)
                });
            });
        }
        else if(artistInfo.album)
        {
            artistInfo.album.songs?.forEach(song => {
                const new_song = {  ...artistInfo, album: { ...artistInfo.album, song: { ...song } }};
                delete new_song['album']['songs']
                songs.push(<ArtistModel>new_song)
            });
        }

        return songs;

    }
}