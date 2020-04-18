import {FieldBuilder} from './field-builder';
import {Field, SchemaConfig} from '../field';

export class ObjectFieldBuilder extends FieldBuilder {
  constructor(label: string) {
    super('object', label, 'object');
  }

  addField(name: string, fieldOrFieldBuilder: Field | FieldBuilder) {
    const field =
      fieldOrFieldBuilder instanceof FieldBuilder
        ? fieldOrFieldBuilder.build()
        : fieldOrFieldBuilder;
    this.fields![name] = field;
    this.objectShape({
      ...this.getObjectShape(),
      [name]: field.getSchemaConfig(),
    });
    this.defaultVal({
      ...this.getDefaultValue(),
      [name]: field.getDefaultValue(),
    });
    return this;
  }

  private getObjectShape(): SchemaConfig['objectShape'] {
    return this.schemaConfig.objectShape;
  }
}
