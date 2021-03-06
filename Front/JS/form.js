class Lender {
    constructor(name, surname, cuil) {
        this.name = name;
        this.surname = surname;
        this.cuil = cuil;
    }
}

class Partner {
    constructor(name, surname, dni, type, id) {
        this.name = name;
        this.surname = surname;
        this.dni = dni;
        this.type = type;
        this.id = id;
    }
}


class OrderType {
    constructor(id, type, orderCost) {
        this.orderTypeID = id;
        this.type = type;
        this.orderCost = orderCost;
    }
}


function getLenders() {
    const select = document.getElementById("tipo-orden");
    select.addEventListener('change', async () => {
        const response = await fetch('http://localhost:9000/api/lenders/' + select.options[select.selectedIndex].value);
        if (response.status !== 202) {
            alert("No se han podido cargar los prestadores.")
            
        } else {
            lenders = await response.json();
            putLenders(lenders);
        }
    })
}
/* End get Lenders */
// 29388541

/* Get Partners */
function getPartner() {
    const siguiente = document.getElementById("button-search");

    siguiente.addEventListener('click', async () => {
        const DNI = document.getElementById("i-dni").value;
        const response = await fetch('http://localhost:9000/api/partners/' + DNI);
        if (response.status !== 202) {
            alert("No se ha podido verificar el beneficiario.")
        } else {
            const myJson = await response.json();
            showPartner(myJson)
        }
    })
}

/* End Get Partners */

const arregloOrdenes = [
    new OrderType(1, "Consulta médica", 50),
    new OrderType(2, "Consulta psicológica", 100),
    new OrderType(3, "Sesión de psicoterapia individual", 150),
    new OrderType(4, "Práctica odontológica", 200)
];

let lenders;

TakeOrder(arregloOrdenes);
showOrderCost(arregloOrdenes);

getLenders();
getPartner();
showInformation();
pushOrder();
getDnitoHistorial();
CreateOrderList();
camposVacios();

function getDnitoHistorial() {
    const historial_button = document.getElementById("button-Historial");
    historial_button.onclick = () => {
        const DNI = document.getElementById("i-dni").value;
        document.location.href = "Historial.html?dni=" + DNI;
    }
}

function TakeOrder(arregloOrdenes) {
    const selector = document.getElementById("tipo-orden");

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
    removeOptions(selector);
    for (let index = 0; index < arregloPrestadores.length; index++) {
        const orderElement = document.createElement("option");
        orderElement.setAttribute("value", arregloPrestadores[index].Name);
        const texto = document.createTextNode(arregloPrestadores[index].Name + ' ' + arregloPrestadores[index].Surname);
        orderElement.appendChild(texto);
        selector.appendChild(orderElement);
    }
}

function removeOptions(selectbox) {
    for (let i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}

function pushOrder() {
        const next_button = document.getElementById("finish-order");
        const afiliado = new Partner("-", "-", "-", "-", "-");
        const tipoOrden = new OrderType("-", "-", 0);
        const lender = new Lender("-", "-", "-");

        next_button.onclick = async () => {
            const resultado = camposVacios();
            if (resultado) {
                alert("Tipo de Orden y/o Prestador esta/n vacio/s. Seleccione uno para continuar");
            }
            else {
                afiliado.name = document.getElementById("nombre-afiliado-show").value;
                afiliado.surname = document.getElementById("apellido-afiliado-show").value;
                afiliado.dni = document.getElementById("DNI-afiliado-show").value;
                lender.name = document.getElementById("prestador-show").value;
                lender.cuil = giveMeLender(lender.name);
                tipoOrden.type = document.getElementById("tipo-orden-show").value;
                tipoOrden.orderCost = document.getElementById("valor-show").value;
                tipoOrden.orderTypeID = getOrderID(tipoOrden.type);

                const requestBody = JSON.stringify({
                    PartnerDNI: parseInt(afiliado.dni),
                    PartnerName: afiliado.name,
                    PartnerSurname: afiliado.surname,
                    LenderCuil: lender.cuil,
                    OrderType: {
                        OrderTypeId: tipoOrden.orderTypeID,
                        Type: tipoOrden.type,
                        OrderCost: parseFloat(tipoOrden.orderCost)
                    }
                });

                fetch("http://localhost:9000/api/weborder", {
                    method: 'post',
                    /* Agregar mode: "no-cors" rompe el backend. No se por que */
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: requestBody
                }).then(handleWebOrderPost)

                const response = await fetch('http://localhost:9000/api/partners/weborders/' + afiliado.dni)
                const myJson = await response.json();
                document.location.href = "http://localhost:9000/api/pdf/order-" + myJson[myJson.length - 1].OrderNumber + ".pdf"
            }
        }
}


function getOrderID(tipoOrden) {
    for (const key in arregloOrdenes) {
        if (arregloOrdenes[key].type === tipoOrden) {
            return arregloOrdenes[key].orderTypeID;
        }
    }
}

function giveMeLender(name) {
    for (const lender in lenders) {
        if (lenders[lender].Name === name) {
            return lenders[lender].Cuil;
        }
    }
}

async function handleWebOrderPost(response) {
    const statusCode = response.status;
    if (statusCode === 202) {
        alert("Se ha procesado correctamente su Orden.")
    } else {
        switch (statusCode) {
            case 404:
                alert("Error en los datos de entrada.");
                break;
            case 500:
                alert("Error en la base de datos. Contacte a un técnico.");
                break;
            default:
                alert("Error desconocido.");
                break;
        }
    }
    return await response.json();
}


/*Formulario */
function showOrderCost(arrayOrder) {
    const select = document.getElementById("tipo-orden");
    select.addEventListener('change',
        function () {
            const selectedOption = this.options[select.selectedIndex];
            for (let i = 0; i < arrayOrder.length; i++) {
                if (arrayOrder[i].type === selectedOption.text) {
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

function showInformation() {
    const buttonNext = document.getElementById("button-Next2");
    buttonNext.addEventListener("click", () => {
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
        if (arrayPartner[i].dni === DNI) {
            return arrayPartner[i];
        } else {
            return null;
        }
    }
}

function camposVacios() {
    const tipoOrden = document.getElementById("tipo-orden-show").value;
    const prestador = document.getElementById("prestador-show").value;
    return (tipoOrden === "..." || prestador === "...");
}
