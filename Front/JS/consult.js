class Suggestion {
    constructor(name, surname, email, message, date, id) {
        this.name = name
        this.surname = surname
        this.email = email
        this.message = message
        this.date = date
        this.id = id
    }
}

sendSuggestion()

function sendSuggestion() {
    const sendButton = document.getElementById('suggestion-send-button')

    sendButton.onclick = () => {
        const name = document.getElementById('suggestion-name').value
        const surname = document.getElementById('suggestion-surname').value
        const email = document.getElementById('suggestion-email').value
        const consult = document.getElementById('suggestion-suggestion').value

        const suggestion1 = new Suggestion(name, surname, email, consult,"2/05/2019","123123asdasd")

        fetch("http://localhost:9000/api/suggestions", {
            method: 'post',
            mode: "cors",
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({
                Name: suggestion1.name,
                Surname: suggestion1.surname,
                Email: suggestion1.email,
                Message: suggestion1.message,
                Date: suggestion1.date,
                Id: suggestion1.id,

            })

        }).then(handleSuggestionResponse)
    }


}


function handleSuggestionResponse(response) {
    const statusCode = response.status
    if (statusCode === 200) {
        // The order has been processed correctly
        console.log("Ok response");
        alert("The suggestion has been processed correctly");
    } else {
        // Diferent types of errors.        
        switch (statusCode) {
            case 400:
                alert("Suggestion error, please check values")
                break;
            case 500:
                alert("Database error, please call technical support")
                break;
            default:
                alert("Default Error")
                break;
        }
        response.json()
            .then(errorMap => console.log(errorMap))
    }
}
