import { describe, expect, test } from '@jest/globals';

import { getNextPlayer } from './ProcessMove';

describe('getNextPlayer', () => {
  const currentUser = 0;
  test('isLeftdirection == true', () => {
    expect(getNextPlayer(currentUser, true) == 1);
  });
  test('isLeftdirection == false', () => {
    expect(getNextPlayer(currentUser, false) == 3);
  });
});
