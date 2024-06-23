import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ParsersListDto } from './dto/parsers-list.dto';

@ApiSecurity('apiKey')
@ApiTags('parsers')
@Controller({ path: 'parsers', version: '1' })
@ApiUnauthorizedResponse({
  description: 'API key is invalid or missing.',
})
export class ParsersController {
  @ApiOkResponse({
    description: 'List of Available Parsers',
    type: ParsersListDto,
  })
  @Get()
  getParsersLists(): ParsersListDto {
    return { availableParsers: ['pdf'] };
  }
}
