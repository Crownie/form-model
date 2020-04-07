import {FieldBuilder} from './field-builder';
import {OptionItem} from '../field';

export class SelectFieldBuilder extends FieldBuilder {
  constructor(label: string) {
    super('select', label);
    this.setDataType('string');
  }

  setOptions(options: OptionItem[]): this {
    this.options = options;
    return this;
  }

  enableAutocomplete(autocomplete: boolean = true) {
    this.autocomplete = autocomplete;
    return this;
  }
}
