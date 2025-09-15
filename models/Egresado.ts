export interface Egresado {
  id_egresado: number;
  id_usuario: number;
  nombre: string;
  apellido_m: string;
  apellido_p: string;
  correo: string;
  genero: "Masculino" | "Femenino" | "Otro";
  bio: string;
  curp: string;
  fecha_egreso: number;
  
  // telefono: string;
  // direccion: string;
  // ciudad: string;
  // pais: string;
  // fecha_nacimiento: string;
  // estado_civil: "Soltero/a" | "Casado/a" | "Divorciado/a" | "Viudo/a" | "Unión libre" | "Prefiero no decirlo";
  
  // inkedin: string;
  // twitter: string;
  // facebook: string;
  // instagram: string;
  // otra_red_social: string;
}

export default Egresado;