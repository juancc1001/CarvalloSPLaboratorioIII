import Cliente from './clases.js';

var _lista = [];
window.addEventListener("load", ObtenerElementos());


function $(id)
{
        return document.getElementById(id);
}

async function ObtenerElementos()
{
    try
    {
        let respuesta = await fetch ("http://localhost:3001/clientes", {method:'GET', headers:{ 'Content-Type': 'application/json'}});
        
        if (respuesta.status.toString() == "200")
        {
            await respuesta.json().then(array=>CargarLista(array));
            CargarFilas(_lista);
        } 
    
    }catch
    {
        alert("Error al traer los elementos");
    }

    $("btnAgregar").addEventListener("click", AgregarCliente);
    $("btnEliminar").addEventListener("click", EliminarElemento);
}

function CargarLista(listaJson)
{
    let listaObjetos = new Array();
    listaJson.map(
        function(cliente)
        {
            listaObjetos.push(new Cliente(cliente.id, cliente.nombre, cliente.apellido, cliente.sexo, cliente.edad))
        }
    )
    _lista = listaObjetos;
}

function CargarFilas(lista)
{
    var tabla = $("table-body");
    vaciarTabla();
    for (let i = 0; i < lista.length; i++)
    {
        let fila = document.createElement("tr");

        let cId = document.createElement("td");
        let cNombre = document.createElement("td");
        let cApellido = document.createElement("td");
        let cEdad = document.createElement("td");
        let cSexo = document.createElement("td");

        let tId = document.createTextNode(lista[i].id);
        let tNombre = document.createTextNode(lista[i].nombre);
        let tApellido = document.createTextNode(lista[i].apellido);
        let tEdad = document.createTextNode(lista[i].edad);
        let tSexo = document.createTextNode(lista[i].sexo);

        cId.appendChild(tId);
        cNombre.appendChild(tNombre);
        cApellido.appendChild(tApellido);
        cEdad.appendChild(tEdad);
        cSexo.appendChild(tSexo);
        
        fila.appendChild(cId);
        fila.appendChild(cNombre);
        fila.appendChild(cApellido);
        fila.appendChild(cEdad);
        fila.appendChild(cSexo);

        fila.addEventListener("click", CargarElementoForm)

        tabla.appendChild(fila);
    }
}

function CargarElementoForm(event)
    {
        let fila = event.target.parentNode; 

        $("inputId").value = fila.childNodes[0].childNodes[0].nodeValue;
        $("inputNombre").value = fila.childNodes[1].childNodes[0].nodeValue;
        $("inputApellido").value = fila.childNodes[2].childNodes[0].nodeValue;
        $("inputEdad").value = fila.childNodes[3].childNodes[0].nodeValue;
        fila.childNodes[4].childNodes[0].nodeValue == "Male" ? $("rMasculino").checked = "true" : $("rFemenino").checked = "true";
    }

function AgregarCliente()
{
    let nombre = $("inputNombre").value;
    let apellido = $("inputApellido").value;
    let edad = $("inputEdad").value;
    let sexo = $("rFemenino").checked == "true" ? "Female" : "Male";

    let cliente_ultimoid = _lista.reduce((acum, actual)=>{ if (actual.id>acum.id){ 
            return actual
        } else
        {
            return acum
        } 
    })
    console.log(cliente_ultimoid.id);
    _lista.push(new Cliente(cliente_ultimoid.id+1, nombre, apellido, sexo, edad))
    CargarFilas(_lista);
}

function EliminarElemento()
{
    let id = $("inputId").value;
    _lista = _lista.filter(element => element.id != id);
    CargarFilas(_lista);
}


function vaciarTabla() {
    let node = document.getElementById("table-body");
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}
  

/*class Aplication
{
    static lista;

    

    static async ObtenerElementos()
    {
        try
        {
            let respuesta = await fetch ("http://localhost:3001/clientes", {method:'GET', headers:{ 'Content-Type': 'application/json'}});
            
            if (respuesta.status.toString() == "200")
            {
                await respuesta.json().then(array=>CargarLista(array));
                CargarFilas(lista);
            } 
        
        }catch
        {
            alert("Error al traer los elementos");
        }

        $("btnAgregar").addEventListener("click", AgregarCliente);
        $("btnEliminar").addEventListener("click", EliminarElemento);
    }

    static CargarLista(listaJson)
    {
        let listaObjetos = new Array();
        listaJson.map(
            function(cliente)
            {
                listaObjetos.push(new Cliente(cliente.id, cliente.nombre, cliente.apellido, cliente.sexo, cliente.edad))
            }
        )
        lista = listaObjetos;
    }

    static CargarFilas(lista)
    {
        var tabla = $("table");
        for (let i = 0; i < lista.length; i++)
        {
            let fila = document.createElement("tr");

            let cId = document.createElement("td");
            let cNombre = document.createElement("td");
            let cApellido = document.createElement("td");
            let cEdad = document.createElement("td");
            let cSexo = document.createElement("td");

            let tId = document.createTextNode(lista[i].id);
            let tNombre = document.createTextNode(lista[i].nombre);
            let tApellido = document.createTextNode(lista[i].apellido);
            let tEdad = document.createTextNode(lista[i].edad);
            let tSexo = document.createTextNode(lista[i].sexo);

            cId.appendChild(tId);
            cNombre.appendChild(tNombre);
            cApellido.appendChild(tApellido);
            cEdad.appendChild(tEdad);
            cSexo.appendChild(tSexo);
            
            fila.appendChild(cId);
            fila.appendChild(cNombre);
            fila.appendChild(cApellido);
            fila.appendChild(cEdad);
            fila.appendChild(cSexo);

            fila.addEventListener("click", CargarElementoForm)

            tabla.appendChild(fila);
        }
    }

    static AgregarCliente()
    {
        let nombre = $("inputNombre").value;
        let apellido = $("inputApellido").value;
        let sexo = $("rFemenino").checked = true ? "Female" : "Male";

        let id = lista.reduce((acum, actual)=>{ if (actual.id>acum.id){ 
                return actual
            } else
            {
                return acum
            } 
        })
        console.log(id.id);
        lista.push(new Cliente(id.id+1, nombre, apellido, sexo))
        CargarFilas(lista);
    }

    static CargarElementoForm(event)
    {
        let fila = event.target.parentNode; 

        $("inputId").value = fila.childNodes[0].childNodes[0].nodeValue;
        $("inputNombre").value = fila.childNodes[1].childNodes[0].nodeValue;
        $("inputApellido").value = fila.childNodes[2].childNodes[0].nodeValue;
        $("inputEdad").value = fila.childNodes[3].childNodes[0].nodeValue;
        fila.childNodes[4].childNodes[0].nodeValue == "Male" ? $("rMasculino").checked == "true" : $("rFemenino").checked = "true";
    }

    static EliminarElemento()
    {
        let id = $("inputId").value;
        console.log(id);
        lista = lista.filter(element => element.id != $("inputId").value);
        CargarFilas(lista);
    }

}

window.addEventListener("load", ObtenerElementos());*/
