import {FieldBuilder} from './field-builder';

export class BooleanFieldBuilder extends FieldBuilder {
  constructor(label: string, type: 'switch' | 'checkbox' = 'checkbox') {
    super(type, label, 'boolean');
  }
}
