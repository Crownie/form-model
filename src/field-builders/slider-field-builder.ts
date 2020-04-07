import {FieldBuilder} from './field-builder';

export class SliderFieldBuilder extends FieldBuilder {
  constructor(label: string) {
    super('slider', label, 'number');
    this.defaultVal(0);
  }
}
