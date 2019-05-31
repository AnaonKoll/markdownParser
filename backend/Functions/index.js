const {Storage} = require('@google-cloud/storage');
const storage = new Storage({projectId: "markdown-parser-242020"});
const bucket = storage.bucket("markdown-parser-bucket");
const fs = require('fs');
const file = bucket.file('template.html');
const parser = require('./parser/parser');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.parser = (req, res) => {
    const data = req.body;
    console.log('New incoming request:', data);
    console.log('from :', req.query);
    console.log('content type : ', req.get('content-type'));
    var fileToSend = '';
    res.setHeader('Content-Disposition', 'attachment; filename="parsed.html"');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', [
        'access-control-allow-headers',
        'access-control-allow-methods',
        'access-control-allow-origin',
        'content-type'
    ]);
    switch(req.query.type) {
        case '0':
            console.log('Type html');
            file.download()
                .then((fileContent) => {
                    console.log('data to parse : ', data.input);
                    fileToSend = parser.toHtml(data.input, fileContent);

                    res.status(200).send(fileToSend);
                })
                .catch((err) => {
                    res.status(404).send('KO');
                    console.log(err.message);
                })
            ;
            break;
        case '1':
            console.log('Type mediawiki');
            fileToSend = parser.toMediawiki(data.input);
            res.setHeader('Content-Disposition', 'attachment; filename="parsed.txt"');
            res.status(200).send(fileToSend);
            break;
        default:
            console.log('Type unknown');
            res.status(403).send();
            break;
    }
};
