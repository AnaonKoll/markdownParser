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
            axios.post(this.url + "?type=0", { params: { input: this.input }})
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'parsed.html');
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(error => {});
        },
        downloadMediaWiki: function (e) {

        }
    }
})
