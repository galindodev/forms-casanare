export interface Registro {
  id?: number;
  nombresCompletos: string;
  celular: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  correoElectronico: string;
  direccionCompleta: string;
  grupoEdad: string;
  departamento: string;
  municipio: string;
  genero: 'Hombre' | 'Mujer';
  aceptoTerminos: boolean;
  fechaRegistro?: Date;
}
