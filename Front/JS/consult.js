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

        })
    }


}