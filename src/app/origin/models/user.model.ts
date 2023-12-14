type SavedSimple =  { 
    artists: [{ 
        id: string
    }],
    albums: [{ 
        id: string,//album

        artist_id: string,
    }],
    songs: [{
        id: string,//song

        artist_id: string
    }],
    playlists: [{
        id: string,
        
        title: string,
        songs: [{
            id: string, //song

            artist_id: string,
            album_id: string
        }],
    }]  
}
//
type ExpandedSong = {
    id: string,
    title: string,
    likes: number,
    ext: string
}
type ExpandedAlbum = {
    id: string, 
    title: string,
    likes: number,
    songs: [ExpandedSong]
}
type SavedExpanded = { 
    artists: [{ 
        id: string
    }],
    albums: [{ 
        //artist info
        id: string,
        title: string,
        year: number

        album: ExpandedAlbum
    }],
    songs: [{
        //artist info
        id: string,
        title: string,

        album: {
            //album info
            id: string,
            title: string,

            song: ExpandedSong
        }
    }],
    playlists: [{
        id: string,
        
        title: string,
        songs: [{
            id: string, //song

            artist_id: string,
            album_id: string
        }],
    }]  
}

export class UserModel {
    _id: string | undefined
    username: string | undefined 
    password: string | undefined 
    name: string | undefined

    saved: SavedSimple | undefined
}

export class UserModelExpanded {
    saved: SavedExpanded | undefined
}