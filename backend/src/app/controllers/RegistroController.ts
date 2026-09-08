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

      const mappedData = registros.map((r) => ({
        'ID': r.id,
        'Nombres Completos': r.fullName,
        'Celular': r.phone,
        'Tipo de Identificación': r.identificationType,
        'Número de Identificación': r.identificationNumber,
        'Correo Electrónico': r.email,
        'Dirección Completa': r.address,
        'Grupo de Edad': r.ageGroup,
        'Departamento': r.department,
        'Municipio': r.municipality,
        'Género': r.gender === 'Male' ? 'Hombre' : 'Mujer',
        'Aceptó Términos': r.acceptedTerms ? 'Sí' : 'No',
        'Fecha de Registro': r.createdAt,
      }));

      worksheet.columns = [
        { header: 'ID', key: 'ID', width: 10 },
        { header: 'Nombres Completos', key: 'Nombres Completos', width: 25 },
        { header: 'Celular', key: 'Celular', width: 15 },
        { header: 'Tipo de Identificación', key: 'Tipo de Identificación', width: 15 },
        { header: 'Número de Identificación', key: 'Número de Identificación', width: 18 },
        { header: 'Correo Electrónico', key: 'Correo Electrónico', width: 25 },
        { header: 'Dirección Completa', key: 'Dirección Completa', width: 25 },
        { header: 'Grupo de Edad', key: 'Grupo de Edad', width: 12 },
        { header: 'Departamento', key: 'Departamento', width: 12 },
        { header: 'Municipio', key: 'Municipio', width: 12 },
        { header: 'Género', key: 'Género', width: 10 },
        { header: 'Aceptó Términos', key: 'Aceptó Términos', width: 12 },
        { header: 'Fecha de Registro', key: 'Fecha de Registro', width: 18 },
      ];

      worksheet.addRows(mappedData);

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
