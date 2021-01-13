import { printTemplate } from '..';

describe('printTemplate', () => {
  const spy = jest.spyOn(console, 'log');
  spy.mockImplementation(() => {});

  it('returns a string', () => {
    expect(printTemplate()).toStrictEqual(expect.any(String));
    expect(spy).not.toHaveBeenCalled();
  });

  it('logs when requested', () => {
    printTemplate({ shouldLog: true });
    expect(spy).toHaveBeenCalledWith(expect.any(String));
  });
});
