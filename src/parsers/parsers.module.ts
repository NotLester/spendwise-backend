import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PdfParserController } from 'src/parsers/pdf-parser/pdf-parser.controller';
import { PdfParserService } from 'src/parsers/pdf-parser/pdf-parser.service';
import { ParsersController } from './parsers.controller';

@Module({
  imports: [HttpModule],
  controllers: [ParsersController, PdfParserController],
  providers: [PdfParserService],
})
export class ParsersModule {}
