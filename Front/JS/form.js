class WebOrder {
    constructor(number, date, AuthCode, BarsCode, orderType, lender, partner) {
        this.orderNumber = number,
            this.date = date,
            this.authCode = AuthCode,
            this.BarsCode = BarsCode,
            this.orderType = orderType,
            this.lender = lender,
            this.partner = partner;
    }
}
class Lender {
    constructor(name, surname, cuil) {
        this.name = name,
            this.surname = surname,
            this.cuil = cuil;
    }
}

class Partner {
    constructor(name, surname, dni, birthdate, type, id) {
        this.name = name,
            this.surname = surname,
            this.dni = dni,
            this.birthdate = birthdate,
            this.type = type,
            this.id = id
    }
}


class OrderType {
    constructor(id, type, orderCost) {
        this.orderTypeID = id,
            this.type = type,
            this.orderCost = orderCost;
    }
}
/* Partners */
const p1 = new Partner("Federico", "Verges", "41221778", "5/5/2019", "Titular", "12312312");
const p2 = new Partner("Alfredo", "Verges", "41221777", "10/5/2019", "Titular", "22312312");


/* Lenders  */
const l1 = new Lender("Facundo", "Decena", "20121231238")
const l2 = new Lender("Facundo", "Pereira", "20121231233")

/* OrderType */

const ot1 = new OrderType("50c", "tipo1", 50)
const ot2 = new OrderType("50d", "tipo2", 150)


const arregloOrdenes = []
const arregloPrestadores = []
arregloOrdenes.push(ot1);
arregloOrdenes.push(ot2);

arregloPrestadores.push(l1);
arregloPrestadores.push(l2);

TakeOrder(arregloOrdenes);
putLenders(arregloPrestadores);
pushOrder();


function TakeOrder(arregloOrdenes) {
    const selector = document.getElementById("tipo-orden");
    console.log(selector);

    for (let index = 0; index < arregloOrdenes.length; index++) {
        const orderElement = document.createElement("option");
        orderElement.setAttribute("value", arregloOrdenes[index].type);
        const texto = document.createTextNode(arregloOrdenes[index].type);
        orderElement.appendChild(texto);
        selector.appendChild(orderElement);
    }
}

function putLenders(arregloPrestadores) {
    const selector = document.getElementById("prestador");
    console.log(selector);

    for (let index = 0; index < arregloOrdenes.length; index++) {
        const orderElement = document.createElement("option");
        orderElement.setAttribute("value", arregloPrestadores[index].name);
        const texto = document.createTextNode(arregloPrestadores[index].name);
        orderElement.appendChild(texto);
        selector.appendChild(orderElement);
    }
}
/* 
function putValue (){
    const selector = document.getElementById("tipo-orden");
    
} */

function pushOrder() {
    const next_button = document.getElementById("finish-order");
    const afiliado = new Partner("-", "-", "-", "-", "-", "-");
    const tipoOrden = new OrderType("-", "-", 0);
    const lender = new Lender("-", "-", "-");
    const webOrder = new WebOrder(0, "5/5/2019", "123512asdasd", 1231231232, '-', '-', '-');

    next_button.onclick = () => {
        afiliado.name = document.getElementById("nombre-afiliado").value;
        afiliado.surname = document.getElementById("apellido-afiliado").value;
        afiliado.dni = document.getElementById("DNI-afiliado").value;
        lender.name = document.getElementById("prestador").value;
        tipoOrden.type = document.getElementById("tipo-orden").value;
        tipoOrden.orderCost = document.getElementById("valor").value;

        webOrder.orderType = tipoOrden.type;
        webOrder.lender = lender;
        webOrder.partner = afiliado;

        fetch("http://localhost:9000/api/weborder", {
                method: 'post',
                mode: "cors",
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({

                    OrderNumber: webOrder.orderNumber,
                    Date: webOrder.date,
                    AuthCode: webOrder.authCode,
                    BarsCode: webOrder.BarsCode,
                    Lender: {
                        Name: lender.name,
                        Surname: lender.surname,
                        Cuil: lender.cuil
                    },
                    Partner: {
                        Name: afiliado.name,
                        Surname: afiliado.surname,
                        Dni: afiliado.dni,
                        Birthdate: afiliado.birthdate,
                        Type: afiliado.type,
                        Id: afiliado.id
                    },
                    OrderType: {
                        orderTypeId: tipoOrden.orderTypeID,
                        Type: tipoOrden.type,
                        orderCost: tipoOrden.orderCost
                    }

                })
            })
            .then(handleWebOrderResponse)
    }
}



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

function handleWebOrderResponse(response) {
    // TODO: Añadir la lógica de manejo de respuesta
    const statusCode = response.status
    if (statusCode === 200) {
        // La webOrder fue procesada correctamente en el servidor. Todo Ok!
        console.log("Ok response");
    } else {
        // Existio un error en el procesamiento de la webOrder
        // Ver en la API (.../api) que significa cada código de error (mal formato, error de servidor, etc)
        console.log("Response code: ", response);
    }
}