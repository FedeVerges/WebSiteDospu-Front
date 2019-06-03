const arregloOrdenes 



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
getBeneficiary();

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


