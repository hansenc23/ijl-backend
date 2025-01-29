import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceRequest } from './dto/create-invoice.request';
import { UpdateInvoiceRequest } from './dto/update-invoice.request';
import { GenerateInvoiceNumberRequest } from './dto/generate-invoice-number.request';
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getInvoices() {
    return this.invoiceService.getInvoices();
  }

  @Get(':id')
  getInvoice(@Param('id') invoice_id: number) {
    return this.invoiceService.getInvoice(invoice_id);
  }

  @Post()
  createInvoice(@Body() request: CreateInvoiceRequest) {
    return this.invoiceService.createInvoice(request);
  }

  @Patch(':id')
  update(@Param('id') invoice_id: number, @Body() request: UpdateInvoiceRequest) {
    return this.invoiceService.updateInvoice(invoice_id, request);
  }

  @Post('/generate-invoice-number')
  generateInvoiceNumber(@Body() request: GenerateInvoiceNumberRequest) {
    return this.invoiceService.generateInvoiceNumber(request);
  }
}
