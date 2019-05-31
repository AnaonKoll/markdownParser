const parser = () => {
    return {
        toHtml: (data, template) => {
            data = data.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
            data = data.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
            data = data.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
            data = data.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
            data = data.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
            data = data.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
            data = data.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
            data = data.replace(/\n/g, '<br>');
            let dataParsed = template.toString().replace('{{ parsedData }}', data);
            return dataParsed;
        },

        toMediawiki: (data) => {
            data = data.replace(/[\'\_]{2}/g, '<b>$1</b>');
            data = data.replace(/[\=]{6}(.+)/g, '<h6>$1</h6>');
            data = data.replace(/[\=]{5}(.+)/g, '<h5>$1</h5>');
            data = data.replace(/[\=]{4}(.+)/g, '<h4>$1</h4>');
            data = data.replace(/[\=]{3}(.+)/g, '<h3>$1</h3>');
            data = data.replace(/[\=]{2}(.+)/g, '<h2>$1</h2>');
            data = data.replace(/\n/g, '</br>');
            return data;
        }
    }
};

module.exports = parser();