module.exports = class suppFunc
{
    static getAnswer(ans, ifSuccess = true) {
        return {
            status: ifSuccess ? 'success' : 'failed',
            answer: ans,
        };
    }

    static getError(err) {
        console.log('Get ERROR!');
        console.log(err);

        return {
            status: 'error',
            answer: err
        }
    }
    
    static renameToSingleAlbumsAndSongs(albums_rename = true, songs_rename = true) {
        const cond = []

        if(albums_rename)
            cond.push({ $set: { 'album': '$albums' } }, { $unset: 'albums' });

        if(songs_rename)
            cond.push({ $set: { 'album.song': '$album.songs' } }, { $unset: 'album.songs' });

        return cond;

    }
}