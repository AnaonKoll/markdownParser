const {Storage} = require('@google-cloud/storage');
const storage = new Storage({projectId: "markdown-parser-242020"});
const bucket = storage.bucket("markdown-parser-bucket");
const fs = require('fs');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.parser = (req, res) => {


    let file = bucket.file('template.html');
    file.download()
        .then((data) => {
            res.status(200).setHeader('Content-Disposition: attachment; filename="parsed.html"').send(data[0]);
        })
        .catch((err) => {
            res.status(404).send('KO');
        })
    ;
};
