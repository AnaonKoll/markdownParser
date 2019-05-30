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
    const data = req.query;
    console.log('New incoming request:', data);
    var fileToSend = '';
    switch(data.type) {
        case '0':
            console.log('Type html');
            file.download()
                .then((fileContent) => {
                    fileToSend = parser.toHtml(req.body, fileContent);
                    res.setHeader('Content-Disposition', 'attachment; filename="parsed.html"');
                    res.setHeader('Access-Control-Allow-Methods', 'POST');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Headers', [
                        'access-control-allow-headers',
                        'access-control-allow-methods',
                        'access-control-allow-origin',
                        'content-type'
                    ]);
                    res.status(200).send('<html>toussa</html>');
                })
                .catch((err) => {
                    res.status(404).send('KO');
                    console.log(err.message);
                })
            ;
            break;
        case '1':
            console.log('Type mediawiki')
            fileToSend = parser.toMediawiki(req.body);
            res.setHeader('Content-Disposition', 'attachment; filename="parsed.txt"');
            res.status(200).send(fileToSend);
            break;
        default:
            res.status(403).send();
            break;
    }
};
