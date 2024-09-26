import { describe, expect, test } from '@jest/globals';
import { mergeTwoArrays } from './activeCards';

import { WILD, RED, GREEN, BLUE, YELLOW } from '../../src/Cards.ts'

describe('merge two array tests', () => {
  let input = [WILD.Wild, RED._0, GREEN._0];
  test('at beginning', () => {
    expect(mergeTwoArrays(input, [WILD.Draw4])).toEqual([WILD.Wild, WILD.Draw4, RED._0, GREEN._0]);
  });

  test('at end', () => {
    expect(mergeTwoArrays(input, [RED._0])).toEqual([WILD.Wild, RED._0, RED._0, GREEN._0]);
  });

  test('at middle', () => {
    expect(mergeTwoArrays(input, [BLUE._0])).toEqual([WILD.Wild, RED._0, GREEN._0, BLUE._0]);
  });
});
