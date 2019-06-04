class WebOrder{
    constructor(number,date,AuthCode,BarsCode,orderType,lender,partner){
        this.orderNumber = number,
        this.date = date,
        this.authCode = AuthCode,
        this.BarsCode = long,
        this.orderType = orderType,
        this.lender = lender,
        this.partner = partner;
    }
}
class Lender {
    constructor (name,surname,cuil){
    this.name = name,
    this.surname = surname,
    this.cuil = cuil;
    }
}

class Partner {
    constructor (name,surname,dni,birthdate,type,id){
        this.name = name,
        this.surname = surname,
        this.dni = dni,
        this.birthdate = birthdate,
        this.type = type,
        this.id = id
    }
}


class OrderType {
    constructor(id,type, orderCost) {
            this.orderTypeID = id,
            this.type = type,
            this.orderCost = orderCost;
    }
}
/* Partners */
const p1 = new Partner("Federico","Verges","41221778","5/5/2019","Titular","12312312");
const p2 = new Partner("Alfredo","Verges","41221777","10/5/2019","Titular","22312312");


/* Lenders  */
const l1 = new lender("Facundo", "Decena","20121231238")
const l2 = new lender("Facundo", "Pereira","20121231233")

/* OrderType */

const ot1 = new orderType ("50c","tipo1",50)
const ot2 = new orderType ("50d","tipo2",150)


const arregloOrdenes = []
const arregloPrestadores= []
arregloOrdenes.push(ot1);
arregloOrdenes.push(ot2);

arregloPrestadores.push(l1);
arregloPrestadores.push(l2);

TakeOrder(arregloOrdenes);


function TakeOrder (arregloOrdenes){
    const selector = document.getElementById("tipo-orden");
    console.log(selector);

    for (let index = 0; index < arregloOrdenes.length; index++) {
        const orderElement = document.createElement("option");
        orderElement.setAttribute("value",arregloOrdenes[index].type);
        const texto = document.createTextNode(arregloOrdenes[index].type);
        orderElement.appendChild(texto);
        selector.appendChild(orderElement);
    }
}

function putLenders (arregloPrestadores){
    const selector = document.getElementById("prestador");
    console.log(selector);

    for (let index = 0; index < arregloOrdenes.length; index++) {
        const orderElement = document.createElement("option");
        orderElement.setAttribute("value",arregloOrdenes[index].name);
        const texto = document.createTextNode(arregloOrdenes[index].name);
        orderElement.appendChild(texto);
        selector.appendChild(orderElement);
    }
}

// function pushOrder () {}



/* This method send the dni number to the DOSPU's API and then 
it give me a confirmation and the name and surname of the  beneficiaries */
function getBeneficiary() {
    const myForm = document.getElementById("Formulario-paso-1");
    myForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const datos = new FormData(myForm);
        const dni = datos.get('dni-beneficiario');
    });


    // return nombre,apellido; 
}
// getBeneficiary();

/* 
function getTypeOfOrder() {
    const api_url = "https://api.wheretheiss.at/v1/satellites";
    async function getData() {
        const request = await fetch(api_url)
        const data = await request.json();
        console.log(data);
        const {
            name,
            id
        } = data;

        console.log(name);
        console.log(id);

    }
    getData();
}

getTypeOfOrder(); */