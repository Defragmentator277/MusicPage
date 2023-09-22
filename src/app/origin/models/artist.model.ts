
export class SongModel {
    id: string | undefined
    title: string | undefined
    // src: string | undefined
    likes?: number
}
//
export class AlbumModel {
    id: string | undefined
    title: string | undefined
    year?: number

    songs?: SongModel[]
    //
    song?: SongModel
}

export class ArtistModel {
    _id: string | undefined
    title: string | undefined
    likes?: number 
    description?: string
    year?: number

    albums?: AlbumModel[]
    //
    album?: AlbumModel
}