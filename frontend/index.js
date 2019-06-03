var editor = new Vue({
    el: '#editor',
    data: {
        input: '# hello world',
        url: 'https://europe-west1-markdown-parser-242020.cloudfunctions.net/markdown-parser'
    },
    computed: {
        parsedMarkdown: function () {
            return markdownParser(this.input);
        }
    },
    methods: {
        update: function (e) {
            this.input = e.target.value;
        },
        downloadHTML: function (e) {
             backendApi(this, this.url + '?type=0', this.input)
                .then(response => {
                    fileDownloader(response.data, 'parsed.html');
                })
                .catch(error => {});
        },
        downloadMediaWiki: function (e) {
            backendApi(this, this.url + '?type=1', this.input)
                .then(response => {
                    fileDownloader(response.data, 'parsed.txt');
                })
                .catch(error => {});
        }
    }
})
