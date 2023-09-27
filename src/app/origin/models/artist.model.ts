export class SongModel {
    id: string | undefined
    title: string | undefined
    src: string | undefined
    ext: string | undefined
    likes?: number
}
//
export class AlbumModel {
    id: string | undefined
    title: string | undefined
    year?: number
    likes?: number

    songs?: SongModel[]
    //
    song?: SongModel
}

export class ArtistModel {
    _id?: string    
    title?: string 
    likes?: number 
    description?: string
    year?: number

    albums?: AlbumModel[]
    //
    album?: AlbumModel
}