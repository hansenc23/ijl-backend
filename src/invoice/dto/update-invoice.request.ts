import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceRequest } from './create-invoice.request';

export class UpdateInvoiceRequest extends PartialType(CreateInvoiceRequest) {}
