import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegistroService } from '../services/RegistroService';
import { CreateRegistroDTO } from '../dtos/CreateRegistroDTO';
import ExcelJS from 'exceljs';

@injectable()
export class RegistroController {
  constructor(private service: RegistroService) {}

  async getAllRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const registrations = await this.service.getRegistrations();
      res.json({
        success: true,
        data: registrations,
        count: registrations.length,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Error fetching registrations',
      });
    }
  }

  async createRegistration(req: Request, res: Response): Promise<void> {
    try {
      const dto = plainToInstance(CreateRegistroDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          errors: errors.map((e) => ({
            field: e.property,
            messages: Object.values(e.constraints || {}),
          })),
        });
        return;
      }

      const id = await this.service.createRegistration(dto);
      res.status(201).json({
        success: true,
        message: 'Registration created successfully',
        id,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Error creating registration',
      });
    }
  }

  async deleteAllRegistrations(req: Request, res: Response): Promise<void> {
    try {
      const confirm = req.query.confirm as string;

      if (confirm !== 'DELETE_ALL') {
        res.status(403).json({
          success: false,
          error: 'Confirmation required. Add ?confirm=DELETE_ALL to delete all records.',
        });
        return;
      }

      await this.service.deleteAllRegistrations();

      res.json({
        success: true,
        message: 'All registrations deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Error deleting registrations',
      });
    }
  }

  async getRegistrationsExcel(req: Request, res: Response): Promise<void> {
    try {
      const registrations = await this.service.getRegistrations();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Registros');

      const mappedData = registrations.map((r) => ({
        'ID': r.id,
        'Nombres Completos': r.fullName,
        'Indicativo': r.countryCode,
        'Celular': r.phone,
        'Tipo de Identificación': r.identificationType,
        'Número de Identificación': r.identificationNumber,
        'Correo Electrónico': r.email,
        'Dirección Completa': r.address,
        'Barrio o Vereda': r.neighborhood,
        'Grupo de Edad': r.ageGroup,
        'Departamento': r.department,
        'Municipio': r.municipality,
        'Género': r.gender === 'Male' ? 'Hombre' : 'Mujer',
        'Referido por': r.referredById || '-',
        'Aceptó Términos': r.acceptedTerms ? 'Sí' : 'No',
        'Fecha de Registro': r.createdAt,
      }));

      worksheet.columns = [
        { header: 'ID', key: 'ID', width: 10 },
        { header: 'Nombres Completos', key: 'Nombres Completos', width: 25 },
        { header: 'Indicativo', key: 'Indicativo', width: 12 },
        { header: 'Celular', key: 'Celular', width: 15 },
        { header: 'Tipo de Identificación', key: 'Tipo de Identificación', width: 15 },
        { header: 'Número de Identificación', key: 'Número de Identificación', width: 18 },
        { header: 'Correo Electrónico', key: 'Correo Electrónico', width: 25 },
        { header: 'Dirección Completa', key: 'Dirección Completa', width: 25 },
        { header: 'Barrio o Vereda', key: 'Barrio o Vereda', width: 20 },
        { header: 'Grupo de Edad', key: 'Grupo de Edad', width: 12 },
        { header: 'Departamento', key: 'Departamento', width: 12 },
        { header: 'Municipio', key: 'Municipio', width: 12 },
        { header: 'Género', key: 'Género', width: 10 },
        { header: 'Referido por', key: 'Referido por', width: 15 },
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
        `attachment; filename="registrations_${new Date().toISOString().split('T')[0]}.xlsx"`
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Error generating Excel file',
      });
    }
  }

  async getMunicipalities(req: Request, res: Response): Promise<void> {
    try {
      const municipalities = [
        'Yopal', 'Aguazul', 'Tauramena', 'Villanueva', 'Monterrey', 'Paz de Ariporo',
        'Maní', 'Orocué', 'Pore', 'Chámeza', 'Hato Corozal', 'La Salina', 'Nunchía',
        'Recetor', 'Sabanalarga', 'Sácama', 'San Luis de Palenque', 'Támara', 'Trinidad'
      ]
      res.json({
        success: true,
        data: municipalities
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Error fetching municipalities'
      })
    }
  }
}
