var editor = new Vue({
    el: '#editor',
    data: {
        input: '# hello world',
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

        },
        downloadMediaWiki: function (e) {

        }
    }
})