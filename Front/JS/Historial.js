function getWebOrdersFromPartner(){
    const historial_button = document.getElementById('button-Historial')

    historial_button.addEventListener('click',async()=>{
        const DNI = document.getElementById("i-dni").value;
        const response = await fetch('http://localhost:9000/api/partners/weborders/' + DNI)
        const myJson = await response.json();

        CreateOrderList(myJson)
        
    })
}

function CreateOrderList(ListOfOrders){
    const list = document.getElementById('Order-List')

    for (const key in ListOfOrders) {
    
    const list_element = document.createElement("li");
    const link = document.createElement("a");
    const text = document.createTextNode('Orden Numero:  '+ ListOfOrders[key].OrderNumber + ' ' + ListOfOrders[key].Type + ' ' + ListOfOrders[key].Date)
    link.appendChild(text)
    list_element.appendChild(link)
    list.appendChild(list_element);
    }
}