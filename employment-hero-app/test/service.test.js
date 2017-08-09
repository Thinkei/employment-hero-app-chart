import { withTemplate } from './helper';

withTemplate('service', (config) => {
  it('contains kind', () => {
    expect(config).toHaveProperty('kind', 'Service');
  });

  it('contains apiVersion', () => {
    expect(config).toHaveProperty('apiVersion', 'v1');
  });

  describe('annotations', () => {
    const annotations = config.metadata.annotations;

    it('contains external-dns', () => {
      expect(annotations['external-dns.alpha.kubernetes.io/hostname']).toEqual('some.host.com.');
    });
  });
});
