class Persona
{
    constructor (p_id, p_nombre, p_apellido)
    {
        this.id = p_id;
        this.nombre = p_nombre;
        this.apellido = p_apellido;
    }
}

class Cliente extends Persona
{
    constructor (c_id, c_nombre, c_apellido, c_sexo, c_edad)
    {
        super(c_id, c_nombre, c_apellido);
        this.sexo = c_sexo;
        this.edad = c_edad;
    }
}

class Aplication
{
    static lista;

    static $(id)
    {
        return document.getElementById(id);
    }

    static async ObtenerElementos()
    {
        try
        {
            let respuesta = await fetch ("http://localhost:3001/clientes", {method:'GET', headers:{ 'Content-Type': 'application/json'}});
            
            if (respuesta.status.toString() == "200")
            {
                await respuesta.json().then(array=>Aplication.CargarLista(array));
                Aplication.CargarFilas(Aplication.lista);
            } 
        
        }catch
        {
            alert("Error al traer los elementos");
        }

        Aplication.$("btnAgregar").addEventListener("click", Aplication.AgregarCliente);
        Aplication.$("btnEliminar").addEventListener("click", Aplication.EliminarElemento);
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
        Aplication.lista = listaObjetos;
    }

    static CargarFilas(lista)
    {
        var tabla = Aplication.$("table");
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

            fila.addEventListener("click", Aplication.CargarElementoForm)

            tabla.appendChild(fila);
        }
    }

    static AgregarCliente()
    {
        let nombre = Aplication.$("inputNombre").value;
        let apellido = Aplication.$("inputApellido").value;
        let sexo = Aplication.$("rFemenino").checked = true ? "Female" : "Male";

        let id = Aplication.lista.reduce((acum, actual)=>{ if (actual.id>acum.id){ 
                return actual
            } else
            {
                return acum
            } 
        })
        console.log(id.id);
        Aplication.lista.push(new Cliente(id.id+1, nombre, apellido, sexo))
        Aplication.CargarFilas(Aplication.lista);
    }

    static CargarElementoForm(event)
    {
        let fila = event.target.parentNode; 

        Aplication.$("inputId").value = fila.childNodes[0].childNodes[0].nodeValue;
        Aplication.$("inputNombre").value = fila.childNodes[1].childNodes[0].nodeValue;
        Aplication.$("inputApellido").value = fila.childNodes[2].childNodes[0].nodeValue;
        Aplication.$("inputEdad").value = fila.childNodes[3].childNodes[0].nodeValue;
        fila.childNodes[4].childNodes[0].nodeValue == "Male" ? Aplication.$("rMasculino").checked = "true" : Aplication.$("rFemenino").checked = "true";
    }

    static EliminarElemento()
    {
        let id = Aplication.$("inputId").value;
        console.log(id);
        Aplication.lista = Aplication.lista.filter(element => element.id != Aplication.$("inputId").value);
        Aplication.CargarFilas(Aplication.lista);
    }

}

window.addEventListener("load", Aplication.ObtenerElementos());
