//backend/src/pdf/pdf.service.ts
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  constructor(private readonly config: ConfigService) {}

  /* async generateWorkshopOnePdf(accessKey: string): Promise<Buffer> {
    const configuredKey =
      this.config.get<string>('pdf.accessKey') ?? '';

    if (!configuredKey || accessKey !== configuredKey) {
      throw new UnauthorizedException('Invalid access key');
    }

    const frontendUrl =
      this.config.get<string>('pdf.frontendUrl') ??
      'http://localhost:3000';

    const printUrl =
      `${frontendUrl}/presentation/workshop-one/print`;

    let browser;

    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      });

      const page = await browser.newPage();

      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });

      await page.emulateMediaType('print');

      await page.goto(printUrl, {
        waitUntil: 'networkidle0',
        timeout: 120000,
      });

      await page.evaluate(async () => {
        await document.fonts.ready;

        const images = Array.from(
          document.images,
        );

        await Promise.all(
          images.map((img) => {
            if (img.complete) return Promise.resolve();

            return new Promise<void>((resolve) => {
              img.addEventListener(
                'load',
                () => resolve(),
                { once: true },
              );

              img.addEventListener(
                'error',
                () => resolve(),
                { once: true },
              );
            });
          }),
        );
      });

      const pdf = await page.pdf({
        printBackground: true,
        preferCSSPageSize: true,
        landscape: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
      });

      return Buffer.from(pdf);
    } catch (error) {
      console.error(
        'Workshop PDF generation failed:',
        error,
      );

      throw new InternalServerErrorException(
        'Failed to generate PDF',
      );
    } finally {
      if (browser) {
        await browser.close();
      }
    }

  }
  */


    async generateWorkshopOnePdf(accessKey: string): Promise<Buffer> {
    const configuredKey =
      this.config.get<string>('pdf.accessKey') ?? '';

    if (!configuredKey || accessKey !== configuredKey) {
      throw new UnauthorizedException('Invalid access key');
    }

    const frontendUrl =
      this.config.get<string>('pdf.frontendUrl') ??
      'http://localhost:3000';

    const printUrl =
      `${frontendUrl}/presentation/workshop-one/print`;

    let browser;

    try {
      browser = await puppeteer.launch({
        headless: true,
        protocolTimeout: 120000,
              args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      });

      const page = await browser.newPage();

      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });

      await page.emulateMediaType('print');

      await page.goto(printUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      await page.evaluate(() => document.fonts.ready);

      const pdf = await page.pdf({
        printBackground: true,
        preferCSSPageSize: true,
        landscape: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
      });

      return Buffer.from(pdf);
    } catch (error) {
      console.error(
        'Workshop PDF generation failed:',
        error,
      );

      throw new InternalServerErrorException(
        'Failed to generate PDF',
      );
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}



