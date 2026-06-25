import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
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
}
