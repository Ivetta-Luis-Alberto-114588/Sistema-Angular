import { enviroment } from '../../enviroments/enviroment'

const base_url = enviroment.base_url

export class Usuario {
    
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ){}


    //este metodo me va a armar la direccion para mostrar la imagen del usuario en el header
    get obtenerImagenUrl(){
        // base_url/upload/usuarios/869a15e7-29d7-408e-93c8-a9baf0a54c2d.jpg

        //aca estoy viendo de poner la imagen de google
        if(this.img?.includes('https')){
                return this.img
        }

        // si la imagen no es nula, armo toda la direccion para devolverra
        if( this.img ){
            const url_usuario = `${base_url}/upload/usuarios/${this.img}`
            return url_usuario

            //si no hay ninguna imagen devuelvo un nombre de imagen que no existe para que no ponga nada
        } else {
            return 'no-image'
        }

        
    }
}