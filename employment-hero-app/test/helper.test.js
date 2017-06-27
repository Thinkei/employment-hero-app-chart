import { loadConfig } from './helper';

describe('helper', () => {
  describe('#loadConfig', () => {
    it('returns empty', () => {
      expect(loadConfig('wrong-file')).toEqual({});
    });


    it('returns config', () => {
      expect(loadConfig('web-deployment')).not.toEqual({});
    });
  });
});
