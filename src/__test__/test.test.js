function sum(a, b) {
  return a + b;
}

describe("base_test", () => {
  test('sum', () => {
    expect(sum(1, 2)).toBe(3);
});
})
