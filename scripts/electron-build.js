const { spawn } = require('child_process');
const path = require('path');

const env = { ...process.env };
const legacyOpenSslFlag = '--openssl-legacy-provider';
const existingNodeOptions = env.NODE_OPTIONS || '';

if (!existingNodeOptions.includes(legacyOpenSslFlag)) {
  env.NODE_OPTIONS = [existingNodeOptions, legacyOpenSslFlag].filter(Boolean).join(' ');
}

delete env.ELECTRON_RUN_AS_NODE;

const vueCliService = path.join(
  __dirname,
  '..',
  'node_modules',
  '@vue',
  'cli-service',
  'bin',
  'vue-cli-service.js'
);

const child = spawn(process.execPath, [vueCliService, 'electron:build'], {
  env,
  shell: false,
  stdio: 'inherit'
});

child.on('exit', code => {
  process.exit(code);
});

child.on('error', error => {
  console.error(error);
  process.exit(1);
});
