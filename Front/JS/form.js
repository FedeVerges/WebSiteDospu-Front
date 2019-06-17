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

/* get Lenders */

function getLenders() {
    const siguiente = document.getElementById("button-Next1")
    const status = 0
    const lenderArray = []
    siguiente.addEventListener('click', async () => {
        
        const response = await fetch('http://localhost:9000/api/lenders/Consulta%20m%C3%A9dica/');
        handleResponseBackend(response)
        const myJson = await response.json(); //extract JSON from the http response
        console.log(myJson)
        putLenders(myJson)
    })
}
/* End get Lenders */


/* Get Partners */
function getPartner() {
    const siguiente = document.getElementById("button-search")
    

    siguiente.addEventListener('click', async () => {
        const DNI = document.getElementById("i-dni").value;
        const response = await fetch('http://localhost:9000/api/partners/' + DNI);
        handleResponseBackend(response);
        const myJson = await response.json(); //extract JSON from the http response 
        showPartner(myJson)
    })
}

/* End Get Partners */


/* Partners */
// const p1 = new Partner("Federico", "Verges", "41221778", "5/5/2019", "Titular", "12312312");
// const p2 = new Partner("Alfredo", "Verges", "41221777", "10/5/2019", "Titular", "22312312");


/* OrderType */

const ot1 = new OrderType("50c", "Consulta Médica", 50)
const ot2 = new OrderType("50d", "Consulta Psicológica", 100)
const ot3 = new OrderType("50e", "Sesion de Psicoterapia Individual", 150)
const ot4 = new OrderType("50f", "Practica Odontológica", 200)


/* OrderWeb */
/* 
const ow1 = new WebOrder ("111",ot1,l1,p1)
const ow2 = new WebOrder ("222",ot2,l2,p2)
 */
const arregloOrdenes = []
const arregloPrestadores= []
const arregloAfiliados= []
const arregloOrdenesWeb = []
/* 
arregloOrdenesWeb.push(ow1);
arregloAfiliados.push(ow2);

arregloAfiliados.push(p1);
arregloAfiliados.push(p2); 

arregloOrdenes.push(ot1);
arregloOrdenes.push(ot2);
arregloOrdenes.push(ot3);
arregloOrdenes.push(ot4);
 */
TakeOrder(arregloOrdenes);
//showPerson(arregloAfiliados);
showOrderCost(arregloOrdenes);
getLenders();

getPartner();

showInformation();
pushOrder();
showHistorial(arregloOrdenesWeb);

camposVacios();


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

    for (let index = 0; index < arregloPrestadores.length; index++) {
        const orderElement = document.createElement("option");
        orderElement.setAttribute("value", arregloPrestadores[index].Name);
        const texto = document.createTextNode(arregloPrestadores[index].Name + ' ' +arregloPrestadores[index].Surname );
        orderElement.appendChild(texto);
        selector.appendChild(orderElement);
    }
}

function pushOrder() {
    const resultado= camposVacios();
    if (resultado){
        alert("Tipo de Orden y/o Prestador esta/n vacio/s. Seleccione uno para continuar");
    }
    else{
        const next_button = document.getElementById("finish-order");
        const afiliado = new Partner("-", "-", "-", "-", "-", "-");
        const tipoOrden = new OrderType("-", "-", 0);
        const lender = new Lender("-", "-", "-");
        const webOrder = new WebOrder(0, "5/5/2019", "123512asdasd", 1231231232, '-', '-', '-');
    
        next_button.onclick = () => {
            afiliado.name = document.getElementById("nombre-afiliado-show").value;
            afiliado.surname = document.getElementById("apellido-afiliado-show").value;
            afiliado.dni = document.getElementById("DNI-afiliado-show").value;
            lender.name = document.getElementById("prestador-show").value;
            tipoOrden.type = document.getElementById("tipo-orden-show").value;
            tipoOrden.orderCost = document.getElementById("valor-show").value;
    
            webOrder.orderType = tipoOrden.type;
            webOrder.lender = lender;
            webOrder.partner = afiliado;
    
            fetch("http://localhost:9000/api/weborder", {
                    method: 'post',
                    mode: "no-cors",
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    body: JSON.stringify({
                        PartnerDni: afiliado.dni,
                        PartnerName: afiliado.name,
                        PartnerSurname: afiliado.surname,
                        LenderCuil: lender.cuil,
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


/* HandleResponse */
function handleWebOrderResponse(response) {
    const statusCode = response.status
    if (statusCode === 200) {
        // The order has been processed correctly
        console.log("Ok response");
        alert("The order has been processed correctly");
    } else {
        // Diferent types of errors.        
        switch (statusCode) {
            case 404:
                alert("WebForm error, please check values")
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


function handleResponseBackend(response) {
    const statusCode = response.status
    if (statusCode === 200) {
        console.log("Success")
    } else {
        // Diferent types of errors.        
        switch (statusCode) {
            case 404:
                alert("Entry error, please check values (404)")
                break;
            case 500:
                alert("Database error, please call technical support (500)")
                break;
            default:
                alert("Default Error")
                break;
        }
        response.json()
            .then(errorMap => console.log(errorMap))
    }
}
/*Formulario */

function showOrderCost(arrayOrder) {
    const select = document.getElementById("tipo-orden");
    select.addEventListener('change',
        function () {
            const selectedOption = this.options[select.selectedIndex];
            for (let i = 0; i < arrayOrder.length; i++) {
                if (arrayOrder[i].type == selectedOption.text) {
                    document.getElementById("valor").value = arrayOrder[i].orderCost;
                }
            }
        });
}

function showPartner(result) {
            document.getElementById("nombre-afiliado").value = result.Name;
            document.getElementById("apellido-afiliado").value = result.Surname;
            document.getElementById("button-Next1").disabled = false; 
            document.getElementById("button-Historial").disabled = false; 
}

/* function showPerson(array) {
    const buttonSearch = document.getElementById("button-search");
    buttonSearch.addEventListener('click', function (e) {
        const result = givePerson(array);
        if (result != null) {
            document.getElementById("nombre-afiliado").value=result.name;
            document.getElementById("apellido-afiliado").value=result.surname;
            document.getElementById("button-Next1").disabled=false;
        }
        else{
            alert("El DNI ingresado no se cuentra en la Base de Datos");
        }
}
} */


function showInformation() {
    const buttonNext = document.getElementById("button-Next2");
    buttonNext.addEventListener("click", function (e) {
        document.getElementById("nombre-afiliado-show").value = document.getElementById("nombre-afiliado").value;
        document.getElementById("apellido-afiliado-show").value = document.getElementById("apellido-afiliado").value;
        document.getElementById("DNI-afiliado-show").value = document.getElementById("i-dni").value;

        document.getElementById("tipo-orden-show").value = document.getElementById("tipo-orden").value;
        document.getElementById("prestador-show").value = document.getElementById("prestador").value;

        document.getElementById("valor-show").value = document.getElementById("valor").value;
    });
}

function givePerson(arrayPartner) {
    const DNI = document.getElementById("i-dni").value;
    for (let i = 0; i < arrayPartner.length; i++) {
        if (arrayPartner[i].dni == DNI) {
            return arrayPartner[i];
        } else {
            return null;
        }
    }
}

function showHistorial(arrayWebOrders){
    const buttonHistorial = document.getElementById("button-Historial");
    buttonHistorial.addEventListener('click', function (e){
        if (arrayWebOrders == null){
            alert("No se encuentran ordenes del beneficiario");
        }
        else{
            document.location.href="Historial.html";
            for (let index = 0; index < arrayWebOrders.length; index++) {
                const element = arrayWebOrders[index];
            }
        }
    });
}

function camposVacios(){
    const tipoOrden= document.getElementById("tipo-orden-show").value;
    const prestador= document.getElementById("prestador-show").value;
    if(tipoOrden=="..." & prestador=="..."){
        return true;
    }
    else{
        return false;
    }
}


