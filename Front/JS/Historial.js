/* function getWebOrdersFromPartner(){
    const historial_button = document.getElementById('button-Historial')

    historial_button.addEventListener('click',async()=>{
        const DNI = document.getElementById("i-dni").value;
       
        CreateOrderList(myJson)
    })
} */


CreateOrderList();

function CreateOrderList() {
    const dni = window.location.search.split('=')[1]

    window.onload =  async () => {
        const response = await fetch('http://localhost:9000/api/partners/weborders/' + dni)
        const myJson = await response.json();
        const list = document.getElementById("Order-List")
        for (const key in myJson) {

            const list_element = document.createElement("li");
            const link = document.createElement("a");
            link.setAttribute("href", "http://localhost:9000/api/pdf/order-"+ myJson[key].OrderNumber+".pdf")
            const text = document.createTextNode('Orden Numero:  ' + myJson[key].OrderNumber + ' Tipo de orden: ' + myJson[key].Type + ' Fecha: ' + myJson[key].Date.slice(0,11))
            link.appendChild(text)
            list_element.appendChild(link)
            list.appendChild(list_element);
        }
    }


}