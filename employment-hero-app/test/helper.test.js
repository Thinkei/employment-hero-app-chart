import { loadConfig, loadMultiConfig } from './helper';

describe('helper', () => {
  describe('#loadConfig', () => {
    it('returns empty', () => {
      expect(loadConfig('wrong-file')).toEqual({});
    });
  });

  describe('#loadMultiConfig', () => {
    it('returns empty', () => {
      expect(loadMultiConfig('wrong-file')).toEqual([]);
    });

    it('returns config', () => {
      expect(loadMultiConfig('deployment')).not.toEqual({});
    });
  });
});
