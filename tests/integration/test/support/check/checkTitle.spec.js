/*eslint comma-dangle: ["error", "ignore"]*/
import checkTitle from 'src/support/check/checkTitle';

describe(
  'checkTitle', () => {
    let done;
    let expectToEqual;
    let expectToNotEqual;

    beforeEach(() => {
      global.browser = {
        getTitle: jest.fn(() => 'page title'),
      };

      expectToEqual = jest.fn();
      expectToNotEqual = jest.fn();

      global.expect = jest.fn(() => ({
        to: {
          not: {
            equal: expectToNotEqual,
          },
          equal: expectToEqual,
        },
      }));

      done = jest.fn();
    });

    it('Should test if the title matches the given text',
      () => {
        checkTitle(false, 'page title', done);

        _expect(global.browser.getTitle).toHaveBeenCalledTimes(1);
        _expect(global.browser.getTitle).toHaveBeenCalledWith();

        _expect(expectToEqual).toHaveBeenCalledTimes(1);
        _expect(expectToEqual)
          .toHaveBeenCalledWith(
            'page title',
            'Expected title to be "page title" but found ' +
            '"page title"'
          );

        _expect(done).toHaveBeenCalledTimes(1);
      }
    );

    it('Should test if the title does not match the given text',
      () => {
        checkTitle(true, 'page title', done);

        _expect(global.browser.getTitle).toHaveBeenCalledTimes(1);
        _expect(global.browser.getTitle).toHaveBeenCalledWith();

        _expect(expectToNotEqual).toHaveBeenCalledTimes(1);
        _expect(expectToNotEqual)
          .toHaveBeenCalledWith(
            'page title',
            'Expected title not to be "page title"'
          );

        _expect(done).toHaveBeenCalledTimes(1);
      }
    );
  }
);
