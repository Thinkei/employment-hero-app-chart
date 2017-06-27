import yaml from 'js-yaml';
import fs from 'fs';
import shell from 'shelljs';

export function loadConfig(templateName) {
  const valueFiles = [`${__dirname}/../values.yaml`, `${__dirname}/${templateName}.test.yaml`]
        .filter(x => fs.existsSync(x))
        .map(x => `-f ${x}`)
        .join(' ');

  const command = `helm template ${valueFiles} -x employment-hero-app/templates/${templateName}.yaml ${__dirname}/..`;
  const config = shell.exec(command, { silent: true }).stdout;

  if (config === '') return {};

  return yaml.safeLoad(config);
}

export function withTemplate(templateName, fn) {
  describe(templateName, () => {
    fn(loadConfig(templateName));
  });
}
