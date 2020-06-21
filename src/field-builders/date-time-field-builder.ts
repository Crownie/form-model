import {FieldBuilder} from './field-builder';

export class DateTimeFieldBuilder extends FieldBuilder {
  constructor(label: string) {
    super('date-time', label, 'date');
    this.format = 'MM/DD/YYYY hh:mm A';
    this.schemaConfig.nullable = true;
  }

  dateOnly(format: string = 'MM/DD/YYYY'): this {
    this.type = 'date';
    this.format = format;
    return this;
  }

  timeOnly(format: string = 'hh:mm A'): this {
    this.type = 'time';
    this.format = format;
    return this;
  }
}
