const backendApi = (obj, url, data) => {
    let formData = {
        input: data
    };

    return obj.$http.post(url, formData, {emulateJSON: true});
}