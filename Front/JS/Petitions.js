class News {
    constructor(Title, Body, Links, Date, Id) {
        this.Title = Title
        this.Body = Body
        this.Links = Links
        this.Date = Date
        this.Id = Id
    }
}

function getLenders() {
    const siguiente = document.getElementById("nav-bar-news")

    const newsArray = []
    siguiente.addEventListener('click', async () => {

        const response = await fetch('http://localhost:9000/api/lenders/Consulta%20m%C3%A9dica/');
        const myJson = await response.json(); //extract JSON from the http response
        console.log(myJson)
    })
}

function putNews(arrayNews){
    for (key in arrayNews){
        const parent_div = document.getElementsByClassName("nav-bar")
        
        const title = document.createElement("h2")
        const date = document.createElement("h3")
        const body = document.createElement("p")
        const link =  document.createElement("a")
        /*  create the new  */
        
        const text = document.createTextNode(arrayNews.Title)
        title.appendChild(text)
        parent_div[0].appendChild(title)


        


    }


}