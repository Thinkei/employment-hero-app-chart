import yaml from 'js-yaml';
import fs from 'fs';
import shell from 'shelljs';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import compact from 'lodash/fp/compact';

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

export function loadMultiConfig(templateName) {
  const valueFiles = [`${__dirname}/../values.yaml`, `${__dirname}/${templateName}.test.yaml`]
        .filter(x => fs.existsSync(x))
        .map(x => `-f ${x}`)
        .join(' ');

  const command = `helm template ${valueFiles} -x employment-hero-app/templates/${templateName}.yaml ${__dirname}/..`;
  const config = shell.exec(command, { silent: true }).stdout;

  if (config === '') return {};

  return flow([
    map(x => yaml.safeLoad(x.replace('---', ''))),
    compact,
  ])(config.split('...\n'));
}

export function withMultiTemplate(templateName, fn) {
  describe(templateName, () => {
    fn(loadMultiConfig(templateName));
  });
}
