import * as Yup from 'yup';
import {FieldBuilder} from './field-builders';
import cloneDeep from 'lodash.clonedeep';
import {Condition} from './condition';

export class Field {
  private static renderer: FieldRenderer;
  public type: string = '';
  public label: string = '';
  public width: ResponsiveSize = {xs: 12};
  public noWrap: boolean = false;
  public childField?: Field;
  public fields?: {[key: string]: Field};
  public options?: OptionItem[];
  public format?: string;
  public autocomplete?: boolean;
  private schemaConfig: SchemaConfig = {type: 'mixed'};
  private conditionalDisable?: Condition;
  private conditionalHide?: Condition;

  constructor(fieldBuilder: FieldBuilder | Field | any) {
    this.deserialize(fieldBuilder);
  }

  toObject(): any {
    return cloneDeep(this);
  }

  deserialize(fieldBuilder: FieldBuilder | Field | any): void {
    for (let property of Object.keys(fieldBuilder)) {
      if (['conditionalDisable', 'conditionalHide'].includes(property)) {
        if (fieldBuilder[property]) {
          this[property] = new Condition(fieldBuilder[property]);
        }
      } else {
        this[property] = fieldBuilder[property];
      }
    }
  }

  get min() {
    return this.getSchemaConfig().min
      ? this.getSchemaConfig().min!.val
      : undefined;
  }

  get max() {
    return this.getSchemaConfig().max
      ? this.getSchemaConfig().max!.val
      : undefined;
  }

  static buildSchema({
    type,
    arrayType,
    objectShape,
    required,
    defaultVal,
    ...config
  }: SchemaConfig) {
    let schema =
      type === 'array'
        ? Yup[type]().of(this.buildSchema(arrayType!))
        : Yup[type as any]();
    if (type === 'object') {
      const shapeSchema = {};
      for (const [name, schemaConfig] of Object.entries(objectShape!)) {
        shapeSchema[name] = this.buildSchema(schemaConfig);
      }
      schema = schema.shape(shapeSchema);
    }
    if (required && required.val) {
      schema = schema.required(required.errorMessage);
    }
    for (let key of Object.keys(config)) {
      const rule: Rule = config[key];
      try {
        schema = schema[key](rule.val, rule.errorMessage);
      } catch (e) {
        console.log(`unable to process rule:${key} value: ${rule}`, e);
      }
    }
    schema = schema.default(defaultVal);
    return schema;
  }

  static registerRenderer(renderer: FieldRenderer) {
    Field.renderer = renderer;
  }

  public render(fieldName: string): any {
    if (Field.renderer) {
      return Field.renderer(fieldName, this);
    }
  }

  getSchema(): Yup.Schema<any> {
    return Field.buildSchema(this.schemaConfig);
  }

  getSchemaConfig(): SchemaConfig {
    return this.schemaConfig;
  }

  getDefaultValue() {
    return cloneDeep(this.schemaConfig.defaultVal);
  }

  shouldBeDisabled(formData): boolean {
    if (this.conditionalDisable) {
      return this.conditionalDisable.evaluate(formData);
    }
    return false;
  }

  shouldBeHidden(formData): boolean {
    if (this.conditionalHide) {
      return this.conditionalHide.evaluate(formData);
    }
    return false;
  }

  public static equalToFieldFn(fieldName, errorMessage?) {
    const ref = Yup.ref(fieldName);
    return Yup.mixed().test({
      name: 'equalToField',
      exclusive: false,
      // eslint-disable-next-line no-template-curly-in-string
      message: errorMessage || '${path} must be the same as ${reference}',
      params: {
        reference: ref['path'],
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    } as any);
  }
}

export type R12Grid = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ResponsiveSize {
  xs?: R12Grid;
  sm?: R12Grid;
  md?: R12Grid;
  lg?: R12Grid;
  xl?: R12Grid;
}

interface Rule {
  val: string | boolean | number | RegExp;
  errorMessage: string;
}

export type DataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'date'
  | 'mixed';

export interface SchemaConfig {
  type: DataType;
  defaultVal?: any;
  arrayType?: SchemaConfig;
  objectShape?: {[key: string]: SchemaConfig};
  required?: Rule;
  min?: Rule;
  max?: Rule;
  email?: Rule;
  matches?: Rule;
  equalToField?: Rule;
}

export type FieldRenderer = (fieldName: string, field: Field) => any;

export interface OptionItem {
  id: string | number;
  label: string;
}

// register custom validation function
Yup.addMethod(Yup.string, 'equalToField', Field.equalToFieldFn);
