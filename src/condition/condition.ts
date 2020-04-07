import lodashGet from 'lodash.get';
import {ConditionBuilder} from './condition-builder';

export class Condition implements ConditionAttributes {
  public operator?: Operator;
  public left?: any;
  public right?: any;
  public conditions?: Condition[];

  constructor(builder: ConditionBuilder | Condition | ConditionAttributes) {
    this.serialize(builder);
  }

  static processCondition(data, condition: Condition): boolean {
    const {conditions = []} = condition;
    switch (condition.operator) {
      case '$and':
        return conditions.every((item) => this.processCondition(data, item));
      case '$or':
        return conditions.some((item) => this.processCondition(data, item));
      case '$eq':
        return lodashGet(data, condition.left) === condition.right;
      case '$gt':
        return lodashGet(data, condition.left) > condition.right;
      case '$lt':
        return lodashGet(data, condition.left) < condition.right;
      case '$gte':
        return lodashGet(data, condition.left) >= condition.right;
      case '$lte':
        return lodashGet(data, condition.left) <= condition.right;
      case '$in':
        const arr = Array.isArray(condition.right) ? condition.right : [];
        return arr.includes(lodashGet(data, condition.left));
    }
    return false;
  }

  evaluate(data: {[key: string]: any}): boolean {
    return Condition.processCondition(data, this);
  }

  serialize(obj: ConditionBuilder | any) {
    this.operator = obj.operator;
    this.left = obj.left;
    this.right = obj.right;
    this.conditions = obj.conditions
      ? obj.conditions.map((condition) => {
          return new Condition(condition);
        })
      : obj.conditions;
  }
}

export type LogicalOperator = '$and' | '$or';
export type Operator =
  | '$eq'
  | '$gt'
  | '$lt'
  | '$gte'
  | '$lte'
  | '$in'
  | LogicalOperator;

export interface ConditionAttributes {
  operator?: Operator;
  left?: any;
  right?: any;
  conditions?: Condition[];
}
