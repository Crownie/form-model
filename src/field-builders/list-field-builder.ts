import {FieldBuilder} from './field-builder';
import {Field} from '../field';

export class ListFieldBuilder extends FieldBuilder {
  constructor(label: string) {
    super('list', label, 'array');
  }

  addField(fieldOrFieldBuilder: Field | FieldBuilder) {
    const field =
      fieldOrFieldBuilder instanceof FieldBuilder
        ? fieldOrFieldBuilder.build()
        : fieldOrFieldBuilder;
    this.childField = field;
    this.arrayType(field.getSchemaConfig());
    return this;
  }
}
