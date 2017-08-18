import { withMultiTemplate } from './helper';

withMultiTemplate('service', (configs) => {
  it('should have two services', () => {
    expect(configs).toHaveLength(2);
  });

  configs.forEach((config) => {
    it('contains kind', () => {
      expect(config).toHaveProperty('kind', 'Service');
    });

    it('contains apiVersion', () => {
      expect(config).toHaveProperty('apiVersion', 'v1');
    });
  });

  describe('proc main', () => {
    const config = configs[0];

    it('has right port', () => {
      const port = 80;
      expect(config.spec.ports[0].targetPort).toEqual(port);
      expect(config.spec.ports[0].port).toEqual(port);
    });

    describe('annotations', () => {
      const annotations = config.metadata.annotations;

      it('contains external-dns', () => {
        expect(annotations['external-dns.alpha.kubernetes.io/hostname']).toEqual('main.host.com.');
      });
    });
  });

  describe('proc rpc', () => {
    const config = configs[1];

    it('has right port', () => {
      const port = 50051;
      expect(config.spec.ports[0].targetPort).toEqual(port);
      expect(config.spec.ports[0].port).toEqual(port);
    });

    describe('annotations', () => {
      const annotations = config.metadata.annotations;

      it('contains external-dns', () => {
        expect(annotations['external-dns.alpha.kubernetes.io/hostname']).toEqual('rpc.host.com.');
      });
    });
  });
});
