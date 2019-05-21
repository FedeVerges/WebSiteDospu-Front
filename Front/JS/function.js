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






