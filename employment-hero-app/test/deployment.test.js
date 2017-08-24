import { withMultiTemplate } from './helper';

withMultiTemplate('deployment', (configs) => {
  it('contains 3 configs', () => {
    expect(configs).toHaveLength(3);
  });

  describe('proc main', () => {
    const config = configs[0];
    const container = config.spec.template.spec.containers[0];

    it('contains kind', () => {
      expect(config).toHaveProperty('kind', 'Deployment');
    });

    it('contains apiVersion', () => {
      expect(config).toHaveProperty('apiVersion', 'extensions/v1beta1');
    });

    it('contains name', () => {
      expect(config.metadata.name).toEqual('test-app-main');
    });

    it('has right container', () => {
      expect(container.name).toEqual('main');
      expect(container.ports[0].containerPort).toEqual(80);
    });
  });

  describe('proc rpc', () => {
    const config = configs[1];
    const container = config.spec.template.spec.containers[0];

    it('contains name', () => {
      expect(config.metadata.name).toEqual('test-app-rpc');
    });

    it('has right container', () => {
      expect(container.name).toEqual('rpc');
      expect(container.ports[0].containerPort).toEqual(50051);
    });
  });

  describe('proc worker', () => {
    const config = configs[2];
    const container = config.spec.template.spec.containers[0];

    it('contains name', () => {
      expect(config.metadata.name).toEqual('test-app-worker');
    });

    it('has right container', () => {
      expect(container.name).toEqual('worker');
    });
  });
});
