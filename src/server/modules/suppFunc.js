module.exports = {
    getAnswer: (ans, ifSuccess = true) => {
        return {
            status: ifSuccess ? 'success' : 'failed',
            answer: ans,
        };
    },
    getError: (err) => {
        console.log('Get ERROR!');
        console.log(err);

        return {
            status: 'error',
            answer: err
        }
    }
}