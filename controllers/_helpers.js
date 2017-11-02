module.exports = {
    created(res, result) {
        res.status(201).send(result);
    },

    success(res, result) {
        res.status(200).send(result);
    },
    
    error(res, err) {
        res.status(400).send(err);
    },
    
    notFound(res) {
        res.status(404).send('Not Found');
    }
}