/*eslint comma-dangle: ["error", "ignore"]*/
import closeAllButFirstTab from 'src/support/action/web/closeAllButFirstTab';

describe(
  'closeAllButFirstTab', () => {
    let done;

    beforeEach(() => {
      global.device = false;
      global.browser = {
        windowHandles: jest.fn(() => ({
          value: [
            'one',
            'two',
            'three',
          ],
        })),
        switchTab: jest.fn(() => ({
          close() {},
        })),
      };

      done = jest.fn();
    });

    it('should call closeAllButFirstTab on the browser', () => {
      closeAllButFirstTab('', done);

      expect(global.browser.windowHandles).toHaveBeenCalledTimes(1);

      expect(global.browser.switchTab).toHaveBeenCalledTimes(2);

      expect(done).toHaveBeenCalledTimes(1);
    });
  }
);
