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
const l1 = new Lender("Facundo", "Decena","20121231238")
const l2 = new Lender("Facundo", "Pereira","20121231233")

/* OrderType */

const ot1 = new OrderType ("50c","tipo1",50)
const ot2 = new OrderType ("50d","tipo2",150)


const arregloOrdenes = []
const arregloPrestadores= []
const arregloAfiliados= []

arregloAfiliados.push(p1);
arregloAfiliados.push(p2);

arregloOrdenes.push(ot1);
arregloOrdenes.push(ot2);

arregloPrestadores.push(l1);
arregloPrestadores.push(l2);

TakeOrder(arregloOrdenes);
showPerson(arregloAfiliados);
putLenders(arregloPrestadores);
showOrderCost(arregloOrdenes);
showInformation();

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

    for (let index = 0; index < arregloPrestadores.length; index++) {
        const orderElement = document.createElement("option");
        orderElement.setAttribute("value",arregloPrestadores[index].name);
        const texto = document.createTextNode(arregloPrestadores[index].name);
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

/*Formulario */

function showOrderCost(arrayOrder){
    const select= document.getElementById("tipo-orden");
    select.addEventListener('change',
    function(){
        const selectedOption = this.options[select.selectedIndex];
        for (let i = 0; i < arrayOrder.length; i++) {
            if (arrayOrder[i].type == selectedOption.text) {
                document.getElementById("valor").value= arrayOrder[i].orderCost;
            }
        } 
    });
}

function showPerson(array){
    const buttonSearch = document.getElementById("button-search");
    buttonSearch.addEventListener('click', function(e){
        const result= givePerson(array);
        if (result != null) {
            document.getElementById("nombre-afiliado").value=result.name;
            document.getElementById("apellido-afiliado").value=result.surname;
            document.getElementById("button-Next1").disabled=false;
        }
        else{
            alert("El DNI ingresado no se cuentra en la Base de Datos");
        }
    });
}

function showInformation(){
    const buttonNext = document.getElementById("button-Next2");
    buttonNext.addEventListener("click",function(e){
        document.getElementById("nombre-afiliado-show").value = document.getElementById("nombre-afiliado").value;
        document.getElementById("apellido-afiliado-show").value = document.getElementById("apellido-afiliado").value;
        document.getElementById("DNI-afiliado-show").value = document.getElementById("i-dni").value;
        
        document.getElementById("tipo-orden-show").value = document.getElementById("tipo-orden").value;
        document.getElementById("prestador-show").value = document.getElementById("prestador").value;
        
        document.getElementById("valor-show").value= document.getElementById("valor").value;
    });
}

function givePerson(arrayPartner){
    const DNI = document.getElementById("i-dni").value;
    for (let i = 0; i < arrayPartner.length; i++) {
        if (arrayPartner[i].dni == DNI) {
            return arrayPartner[i];
        }
        else{
            return null;
        }
    }
}