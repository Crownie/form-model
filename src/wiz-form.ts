import Form from './form';

export class WizForm {
  public steps: WizFormStep[] = [];

  addStep(id: string, title: string, form: Form): this {
    this.steps.push({
      id,
      title,
      form,
    });
    return this;
  }

  get defaultValues() {
    const obj = {};
    for (const {form} of this.steps) {
      Object.assign(obj, form.defaultValues);
    }
    return obj;
  }
}

export interface WizFormStep {
  id: string;
  title: string;
  form: Form;
}
