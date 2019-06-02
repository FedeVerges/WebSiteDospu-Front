class Item {
    constructor(nombre, link) {
        this.nombre = nombre;
        this.link = link;
    }
}

function createElementNavBar(item) {
    const li = document.createElement("li");
    const contenido = document.createTextNode(item.nombre);
    const ref = document.createElement("a");
    ref.appendChild(contenido);
    ref.setAttribute("href", Item.link);
    li.appendChild(ref);
    return li
}

function createListNavBar(lista) {
    for (let index = 0; index < lista.length; index++) {
        const contenedor = document.createElement("div");
        const contList = document.createElement("ul");
        for (let index2 = 0; index < lista[index].length; index2++) {
            const elem = createElementNavBar(lista[index][index2]);
            contList.appendChild(elem);
        }
        contenedor.appendChild(contList);
    }
    return contenedor;

}

/* para cambiar de pasos*/
let form= document.querySelector('.form-orden'); 
let progressOption= document.querySelectorAll('.progressbar_option')

form.addEventListener('click',function(e){
    let element= e.target;
    let isButtonNext= element.contList.contains('step_button-next');
    let isButtonBack= element.contList.contains('step_button-back');
    if(isButtonNext || isButtonBack){
        let currentStep= document.getElementById('step-'+ element.dataset.step);
        let jumptStep= document.getElementById('step-'+ element.dataset.to_step);
        currentStep.addEventListener('animationend',function callback(){
            currentStep.classList.remove('active');
            jumptStep.classList.add('active');
            if(isButtonNext){
                currentStep.classList.add('to-left');
                progressOption[element.dataset.to_step -1].classList.add('active');
            }
            else{
                jumptStep.classList.remove('to-left');
                progressOption[element.dataset.step -1].classList.remove('active');
            }
            currentStep.removeEventListener('animationend',callback);
        })
        currentStep.classList.add('inactive');
        jumptStep.classList.remove('inactive');
    }

})




