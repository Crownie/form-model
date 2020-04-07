import * as Yup from 'yup';
import {Field} from './field';
import {FieldBuilder} from './field-builders/field-builder';

export class Form {
  public fields: {[key: string]: Field} = {};

  get schema(): Yup.Schema<any> {
    const shape = {};
    for (const [key, field] of Object.entries(this.fields)) {
      shape[key] = field.getSchema();
    }
    return Yup.object().shape(shape);
  }

  get defaultValues() {
    const shape = {};
    for (const [key, field] of Object.entries(this.fields)) {
      shape[key] = field.getDefaultValue();
    }
    return shape;
  }

  addField(name: string, fieldOrFieldBuilder: Field | FieldBuilder): this {
    const field =
      fieldOrFieldBuilder instanceof FieldBuilder
        ? fieldOrFieldBuilder.build()
        : fieldOrFieldBuilder;

    this.fields[name] = field;
    return this;
  }
}

export default Form;
