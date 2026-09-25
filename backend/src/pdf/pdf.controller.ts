//backend/src/pdf/pdf.controller.ts
import {
  Body,
  Controller,
  Header,
  Post,
} from '@nestjs/common';
import { Public } from '@/common/decorators/public.decorator';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Public()
  @Post('workshop-one')
  @Header(
    'Content-Type',
    'application/pdf',
  )
  @Header(
    'Content-Disposition',
    'attachment; filename="Research-Ustad-Workshop.pdf"',
  )
  async generateWorkshopOne(
    @Body() body: { accessKey?: string },
  ) {
    return this.pdfService.generateWorkshopOnePdf(
      body.accessKey ?? '',
    );
  }
}