import {FieldBuilder} from './field-builder';

export class MoneyFieldBuilder extends FieldBuilder {
  constructor(label: string) {
    super('money', label, 'object');
    this.objectShape({
      currency: {
        type: 'string',
      },
      amount: {
        type: 'number',
      },
    });
    this.defaultVal({currency: '', amount: ''});
  }

  required(errorMessage: string = 'Required'): this {
    this.schemaConfig.objectShape!.currency.required = {
      val: errorMessage,
      errorMessage,
    };
    this.schemaConfig.objectShape!.amount.required = {
      val: errorMessage,
      errorMessage,
    };
    return super.required();
  }

  min(val: any, errorMessage: string = `Minimum is ${val}`): this {
    this.schemaConfig.objectShape!.amount.min = {val, errorMessage};
    return this;
  }

  max(val: any, errorMessage: string = `Maximum is ${val}`): this {
    this.schemaConfig.objectShape!.amount.max = {val, errorMessage};
    return this;
  }
}
