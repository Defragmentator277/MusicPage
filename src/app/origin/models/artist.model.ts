
export class SongModel {
    id: string | undefined
    title: string | undefined
    src: string | undefined
    likes?: number
}
//
export class AlbumModel {
    id: string | undefined
    title: string | undefined
    src?: string
    year?: number

    songs?: SongModel[]
    //
    song?: SongModel
}

export class ArtistModel {
    _id: string | undefined
    title: string | undefined
    likes?: number 
    src?: string
    description?: string
    year?: number

    albums?: AlbumModel[]
    //
    album?: AlbumModel
}