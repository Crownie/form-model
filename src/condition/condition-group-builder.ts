import {Condition, LogicalOperator} from './condition';
import {ConditionBuilder} from './condition-builder';

export class ConditionGroupBuilder {
  private readonly conditionBuilder: ConditionBuilder;

  constructor(private logic: LogicalOperator) {
    this.conditionBuilder = new ConditionBuilder(this, null);
  }

  static all(): ConditionGroupBuilder {
    return new ConditionGroupBuilder('$and');
  }

  static any(): ConditionGroupBuilder {
    return new ConditionGroupBuilder('$or');
  }

  when(val): ConditionBuilder {
    const condition = new ConditionBuilder(this, val);
    this.conditionBuilder.logic(this.logic, [condition]);
    return condition;
  }

  nest(group: ConditionGroupBuilder) {
    this.conditionBuilder.conditions!.push(group.conditionBuilder);
    return this;
  }

  build(): Condition {
    return new Condition(this.conditionBuilder);
  }
}
