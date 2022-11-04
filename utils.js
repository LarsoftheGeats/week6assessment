
function shuffleArray(array) {
    let arrCopy = [...array]
    for (let i = arrCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }
    return arrCopy
}

function home(req,res) {
    res.sendFile(path.join( __dirname, "./public/index.html"))
}

module.exports = {
    shuffleArray,
    home
}