function checkUrl(inputText) {
    let check = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if(check.test(inputText)) {  //Check to see if URL is valid
        return true;
        console.log('Valid URL');
    } else {
        return false;
        console.log('Invalid URL');
    }
}

export { checkUrl }