import { Request, Response } from 'express';
import { RegistroService } from '../services/RegistroService';
import { Registro } from '../../domain/entities/Registro';
import ExcelJS from 'exceljs';

export class RegistroController {
  constructor(private service: RegistroService) {}

  async crearRegistro(req: Request, res: Response): Promise<void> {
    try {
      const data: Registro = req.body;
      const id = await this.service.crearRegistro(data);
      res.status(201).json({
        success: true,
        message: 'Registro creado exitosamente',
        id,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Error al crear registro',
      });
    }
  }

  async obtenerRegistrosExcel(req: Request, res: Response): Promise<void> {
    try {
      const registros = await this.service.obtenerRegistros();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Registros');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombres Completos', key: 'nombresCompletos', width: 25 },
        { header: 'Celular', key: 'celular', width: 15 },
        { header: 'Tipo de Identificación', key: 'tipoIdentificacion', width: 15 },
        { header: 'Número de Identificación', key: 'numeroIdentificacion', width: 18 },
        { header: 'Correo Electrónico', key: 'correoElectronico', width: 25 },
        { header: 'Dirección Completa', key: 'direccionCompleta', width: 25 },
        { header: 'Grupo de Edad', key: 'grupoEdad', width: 12 },
        { header: 'Departamento', key: 'departamento', width: 12 },
        { header: 'Municipio', key: 'municipio', width: 12 },
        { header: 'Género', key: 'genero', width: 10 },
        { header: 'Aceptó Términos', key: 'aceptoTerminos', width: 12 },
        { header: 'Fecha de Registro', key: 'fechaRegistro', width: 18 },
      ];

      worksheet.addRows(registros);

      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' },
      };

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="registros_${new Date().toISOString().split('T')[0]}.xlsx"`
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Error al generar archivo Excel',
      });
    }
  }
}
