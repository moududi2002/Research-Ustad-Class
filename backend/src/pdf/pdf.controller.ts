// backend/src/pdf/pdf.controller.ts

import {
  Body,
  Controller,
  Header,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from '@/common/decorators/public.decorator';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Public()
  @Post('workshop-one')
  async generateWorkshopOne(
    @Body() body: { accessKey?: string },
    @Res() res: Response,
  ) {
    const pdf = await this.pdfService.generateWorkshopOnePdf(
      body.accessKey ?? '',
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="Research-Ustad-Workshop.pdf"',
      'Content-Length': pdf.length.toString(),
      'Cache-Control': 'no-store',
    });

    res.end(pdf);
  }
}
