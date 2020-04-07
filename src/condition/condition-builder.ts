import {ConditionGroupBuilder} from './condition-group-builder';
import {LogicalOperator, Operator} from './condition';

export class ConditionBuilder {
  public operator?: Operator;
  public left?: any;
  public right?: any;
  public conditions?: ConditionBuilder[];
  private readonly conditionGroup: ConditionGroupBuilder | null = null;

  constructor(conditionGroup: ConditionGroupBuilder | null, left: any) {
    this.conditionGroup = conditionGroup;
    this.left = left;
  }

  equalTo(val): ConditionGroupBuilder {
    this.operator = '$eq';
    this.right = val;
    return this.conditionGroup!;
  }

  greaterThan(val): ConditionGroupBuilder {
    this.operator = '$gt';
    this.right = val;
    return this.conditionGroup!;
  }

  lessThan(val): ConditionGroupBuilder {
    this.operator = '$lt';
    this.right = val;
    return this.conditionGroup!;
  }

  greaterThanOrEqualTo(val): ConditionGroupBuilder {
    this.operator = '$gte';
    this.right = val;
    return this.conditionGroup!;
  }

  lessThanOrEqualTo(val): ConditionGroupBuilder {
    this.operator = '$lte';
    this.right = val;
    return this.conditionGroup!;
  }

  isIn(vals: (string | number)[]): ConditionGroupBuilder {
    this.operator = '$in';
    this.right = vals;
    return this.conditionGroup!;
  }

  logic(operator: LogicalOperator, conditions) {
    this.operator = operator;
    this.conditions = conditions;
    this.left = undefined;
    this.right = undefined;
  }
}
