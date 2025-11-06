import { expect, test } from 'vitest';

function calculateSlice(page: number, pageSize: number) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  return { from, to };
}

test('calculateSlice', () => {
  expect(calculateSlice(1, 12)).toEqual({ from: 0, to: 12 });
  expect(calculateSlice(2, 12)).toEqual({ from: 12, to: 24 });
  expect(calculateSlice(3, 10)).toEqual({ from: 20, to: 30 });
});
