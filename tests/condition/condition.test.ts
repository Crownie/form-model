import {Condition} from '../../src/condition';

describe('evaluate', () => {
  it('$eq', () => {
    const condition = new Condition({
      operator: '$eq',
      left: 'name',
      right: 'John',
    });
    expect(condition.evaluate({name: 'John'})).toBeTruthy();
  });

  it('$gt', () => {
    const condition = new Condition({
      operator: '$gt',
      left: 'age',
      right: 18,
    });
    expect(condition.evaluate({age: 18})).toBeFalsy();
    expect(condition.evaluate({age: 19})).toBeTruthy();
  });

  it('$lt', () => {
    const condition = new Condition({
      operator: '$lt',
      left: 'age',
      right: 18,
    });
    expect(condition.evaluate({age: 18})).toBeFalsy();
    expect(condition.evaluate({age: 17})).toBeTruthy();
  });

  it('$gte', () => {
    const condition = new Condition({
      operator: '$gte',
      left: 'age',
      right: 18,
    });
    expect(condition.evaluate({age: 17})).toBeFalsy();
    expect(condition.evaluate({age: 18})).toBeTruthy();
    expect(condition.evaluate({age: 19})).toBeTruthy();
  });

  it('$lte', () => {
    const condition = new Condition({
      operator: '$lte',
      left: 'age',
      right: 18,
    });
    expect(condition.evaluate({age: 19})).toBeFalsy();
    expect(condition.evaluate({age: 18})).toBeTruthy();
    expect(condition.evaluate({age: 17})).toBeTruthy();
  });

  it('$in', () => {
    const condition = new Condition({
      operator: '$in',
      left: 'sport',
      right: ['football', 'tennis'],
    });
    expect(condition.evaluate({sport: 'basketball'})).toBeFalsy();
    expect(condition.evaluate({sport: 'football'})).toBeTruthy();
    expect(condition.evaluate({sport: 'tennis'})).toBeTruthy();
  });

  it('$and', () => {
    const condition1 = new Condition({
      operator: '$eq',
      left: 'name',
      right: 'John',
    });
    const condition2 = new Condition({
      operator: '$in',
      left: 'sport',
      right: ['football', 'tennis'],
    });
    const condition3 = new Condition({
      operator: '$and',
      conditions: [condition1, condition2],
    });
    expect(
      condition3.evaluate({name: 'John', sport: 'basketball'}),
    ).toBeFalsy();
    expect(condition3.evaluate({name: 'Joe', sport: 'football'})).toBeFalsy();
    expect(condition3.evaluate({name: 'John', sport: 'football'})).toBeTruthy();
    expect(condition3.evaluate({name: 'John', sport: 'tennis'})).toBeTruthy();
  });

  it('$or', () => {
    const condition1 = new Condition({
      operator: '$eq',
      left: 'name',
      right: 'John',
    });
    const condition2 = new Condition({
      operator: '$in',
      left: 'sport',
      right: ['football', 'tennis'],
    });
    const condition3 = new Condition({
      operator: '$or',
      conditions: [condition1, condition2],
    });
    expect(condition3.evaluate({name: 'Joe', sport: 'basketball'})).toBeFalsy();
    expect(condition3.evaluate({name: 'Joe', sport: 'football'})).toBeTruthy();
    expect(condition3.evaluate({name: 'John', sport: 'football'})).toBeTruthy();
    expect(condition3.evaluate({name: 'John', sport: 'tennis'})).toBeTruthy();
  });
});
