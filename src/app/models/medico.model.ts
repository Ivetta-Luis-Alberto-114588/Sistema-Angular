interface Hospital {
    _id: string,
    nombre: string,
    img : string
}

interface Usuario {
    _id: string,
    nombre: string,
    img: string
}

export class Medico {
    _id: string;
    nombre: string;
    usuario: Usuario;
    img: string;
    hospital: Hospital;
  
    constructor(_id: string, nombre: string, usuario: Usuario, img: string, hospital: Hospital) {
      this._id = _id;
      this.nombre = nombre;
      this.usuario = usuario;
      this.img = img;
      this.hospital = hospital;
    }
  }