function handleSubmit(event) {
    event.preventDefault();
    
    let userUrl = document.getElementById('name').value;
    console.log(userUrl);
    if (Client.checkUrl(userUrl)==true){
        fetch('http://localhost:8081/analysis',{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:8081/"
            },
            body: JSON.stringify({url:userUrl})
        })
        .then(res => res.json())
        .then(function(res){
            document.getElementById('polarity').innerHTML = res.polarity
            document.getElementById('subjectivity').innerHTML = res.subjectivity
            document.getElementById('polarity-confidence').innerHTML = res.polarity_confidence
            document.getElementById('subjectivity-confidence').innerHTML = res.subjectivity_confidence
        })
    } else {
        console.log('URL is invalid');
    }
}

export { handleSubmit }