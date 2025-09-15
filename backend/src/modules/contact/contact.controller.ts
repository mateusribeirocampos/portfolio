import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Query,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactQueryDto } from './dto/contact-query.dto';
import { GetIp, GetUserAgent } from '../../common/decorators/get-ip.decorator';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(
    @Body() createContactDto: CreateContactDto,
    @GetIp() ip: string,
    @GetUserAgent() userAgent: string,
  ) {
    return this.contactService.createContact(createContactDto, ip, userAgent);
  }

  @Get()
  async getContacts(@Query(ValidationPipe) query: ContactQueryDto) {
    return this.contactService.getContacts(query.page, query.limit);
  }

  @Put(':id/status')
  async updateContactStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.contactService.updateContactStatus(id, status);
  }
}
