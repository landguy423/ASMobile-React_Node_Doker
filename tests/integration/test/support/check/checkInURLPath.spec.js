/*eslint comma-dangle: ["error", "ignore"]*/
import checkInURLPath from 'src/support/check/checkInURLPath';

describe(
  'checkInURLPath', () => {
    let done;
    let expectShouldContain;
    let expectShouldNotContain;

    beforeEach(() => {
      global.browser = {
        url: jest.fn(() => ({
          value: 'http://www.example.com/test',
        })),
      };

      expectShouldContain = jest.fn();
      expectShouldNotContain = jest.fn();

      global.expect = jest.fn(() => ({
        to: {
          not: {
            contain: expectShouldNotContain,
          },
          contain: expectShouldContain,
        },
      }));

      done = jest.fn();
    });

    it('Should test if URL contains the given value', () => {
      checkInURLPath(false, 'test', done);

      _expect(global.browser.url).toHaveBeenCalledTimes(1);
      _expect(global.browser.url).toHaveBeenCalledWith();

      _expect(expectShouldContain).toHaveBeenCalledTimes(1);
      _expect(expectShouldContain)
        .toHaveBeenCalledWith(
          'test',
          'Expected URL "http://www.example.com/test" to contain ' +
          '"test"'
        );

      _expect(done).toHaveBeenCalledTimes(1);
    });

    it('Should test if URL does not contain the given value', () => {
      checkInURLPath(true, 'test2', done);

      _expect(global.browser.url).toHaveBeenCalledTimes(1);
      _expect(global.browser.url).toHaveBeenCalledWith();

      _expect(expectShouldNotContain).toHaveBeenCalledTimes(1);
      _expect(expectShouldNotContain)
        .toHaveBeenCalledWith(
          'test2',
          'Expected URL "http://www.example.com/test" not to ' +
          'contain "test2"'
        );

      _expect(done).toHaveBeenCalledTimes(1);
    });
  }
);
