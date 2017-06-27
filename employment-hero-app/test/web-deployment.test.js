import { withTemplate } from './helper';

withTemplate('web-deployment', (config) => {
  it('contains kind', () => {
    expect(config).toHaveProperty('kind', 'Deployment');
  });

  it('contains apiVersion', () => {
    expect(config).toHaveProperty('apiVersion', 'extensions/v1beta1');
  });

  it('contains replicas', () => {
    expect(config.spec).toHaveProperty('replicas', 2);
  });

  describe('containers', () => {
    const containers = config.spec.template.spec.containers;

    it('contains web container', () => {
      expect(containers).toContainEqual(expect.objectContaining({ name: 'web' }));
      expect(containers).toContainEqual(
        expect.objectContaining({ volumeMounts: expect.anything() }),
      );
    });
  });
});
