import {FieldBuilder} from './field-builder';

export class TextFieldBuilder extends FieldBuilder {
  constructor(label: string, type: 'text' | 'long-text' | 'password' = 'text') {
    super(type, label, 'string');
  }
}
