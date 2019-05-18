window.onload = main;
function main(){
    const farmacias = new Item("Farmacias", "Farmacias.html");
    const noticias = new Item("Noticias", "Noticias.html");
    const perros = new Item("Perros", "perros.html");
    const list1 = []
    const list2 = []
    list1.push(farmacias);
    list2.push(noticias);
    list2.push(perros);

    const bar = []
    bar.push(list1)
    bar.push(list2)

    document.body.append(createListNavBar(bar));

}