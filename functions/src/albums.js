import dbConnect from "./dbConnect.js";

export function getAllAlbums(req, res) {
    const db = dbConnect()
    db.collection('albums').get()
        .then(collection => {
            const albumsArr = collection.docs.map(doc => {
                let album = doc.data()
                album.albumId = doc.id
                return album
            })
            res.send(albumsArr)
        })
        // // .then(collection => {
        // //     const albumsArr = collection.docs.map(doc => {
        // //         let album = doc.data()
        // //         album.albumId = doc.id
        // //         return album
        // //     })
        // })
        .catch(err => res.status(500).send({ success: false, message: err }))
}

export function createNewAlbums(req, res) {
    const db = dbConnect()
    db.collection('albums').add(req.body)
        .then(doc => res.status(201).send({ success: true, message: 'Album created:'}))
        .catch(err => res.status(500).send({ success: false, message: err }))

}
export function deleteAlbum(req, res) {
    const db = dbConnect()
    const { albumId } = req.params
    db.collection('albums').doc(albumId).delete()
        .then(doc => res.status(201).send({ success: true, message: 'Album deleted:' }))
        .catch(err => res.status(500).send({ success: false, message: err }))
}
