export class Persona
{
    constructor (p_id, p_nombre, p_apellido)
    {
        this.id = p_id;
        this.nombre = p_nombre;
        this.apellido = p_apellido;
    }
}

export default class Cliente extends Persona
{
    constructor (c_id, c_nombre, c_apellido, c_sexo, c_edad)
    {
        super(c_id, c_nombre, c_apellido);
        this.sexo = c_sexo;
        this.edad = c_edad;
    }
}
