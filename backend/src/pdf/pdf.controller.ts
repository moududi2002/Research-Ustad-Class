// backend/src/pdf/pdf.controller.ts

import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  StreamableFile,
} from '@nestjs/common';

import { Public } from '@/common/decorators/public.decorator';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
  ) {}

  @Public()
  @Post('workshop-one')
  @HttpCode(200)
  async generateWorkshopOne(
    @Body() body: { accessKey?: string },
  ): Promise<StreamableFile> {
    const pdf =
      await this.pdfService.generateWorkshopOnePdf(
        body.accessKey ?? '',
      );

    return new StreamableFile(pdf, {
      type: 'application/pdf',
      disposition:
        'attachment; filename="Research-Ustad-Workshop.pdf"',
      length: pdf.length,
    });
  }
}
