import {
  Field,
  DataType,
  OptionItem,
  ResponsiveSize,
  SchemaConfig,
} from '../field';
import {Condition} from '../condition';

export class FieldBuilder {
  public type: string;
  public label: string;
  public width: ResponsiveSize = {xs: 12};
  public noWrap: boolean = false;
  public childField?: Field;
  public autocomplete?: boolean;
  public fields?: {[key: string]: Field};
  public options?: OptionItem[];
  public format?: string;
  public meta?: Record<string, any> = {};
  public conditionalDisable?: Condition;
  public conditionalHide?: Condition;
  public schemaConfig: SchemaConfig = {
    type: 'mixed',
  };
  private static defaults = {
    string: '',
    number: '',
    boolean: false,
    array: [],
    object: {},
    date: null,
  };

  constructor(fieldType: string, label: string, dataType: DataType = 'string') {
    this.type = fieldType;
    this.label = label;
    this.schemaConfig.type = dataType;
    this.schemaConfig.defaultVal = FieldBuilder.defaults[dataType];
    if (dataType === 'object') {
      this.fields = {};
    }
  }

  getDefaultValue() {
    return this.schemaConfig.defaultVal;
  }

  setWidth(width: ResponsiveSize, noWrap: boolean = false): this {
    this.noWrap = noWrap;
    this.width = {...this.width, ...width};
    return this;
  }

  arrayType(schemaConfig: SchemaConfig) {
    this.schemaConfig.type = 'array';
    this.schemaConfig.arrayType = schemaConfig;
  }

  objectShape(shape: SchemaConfig['objectShape']) {
    this.schemaConfig.type = 'object';
    this.schemaConfig.objectShape = shape;
  }

  getSchemaConfig(): SchemaConfig {
    return this.schemaConfig;
  }

  required(errorMessage: string = 'Required'): this {
    this.schemaConfig.required = {
      val: errorMessage,
      errorMessage,
    };
    return this;
  }

  defaultVal(val: any): this {
    this.schemaConfig.defaultVal = val;
    return this;
  }

  min(val: any, errorMessage: string = 'Too short'): this {
    this.schemaConfig.min = {
      val,
      errorMessage,
    };
    return this;
  }

  max(val: any, errorMessage: string = 'Too long'): this {
    this.schemaConfig.max = {
      val,
      errorMessage,
    };
    return this;
  }

  email(errorMessage: string = 'Not a valid email'): this {
    this.schemaConfig.email = {
      val: errorMessage,
      errorMessage,
    };
    return this;
  }

  matches(val: RegExp, errorMessage: string): this {
    this.schemaConfig.matches = {val, errorMessage};
    return this;
  }

  equalToField(fieldName: string, errorMessage: string): this {
    this.schemaConfig.equalToField = {
      val: fieldName,
      errorMessage,
    };
    return this;
  }

  nullable(): this {
    this.schemaConfig.nullable = true;
    return this;
  }

  addMeta(key: string, value: any): this {
    this.meta[key] = value;
    return this;
  }

  disableWhen(condition: Condition): this {
    this.conditionalDisable = condition;
    return this;
  }

  hideWhen(condition: Condition): this {
    this.conditionalHide = condition;
    return this;
  }

  build(): Field {
    return new Field(this);
  }

  protected setDataType(dataType: DataType) {
    this.schemaConfig.type = dataType;
  }
}
