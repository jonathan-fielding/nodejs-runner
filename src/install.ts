import { exec } from 'child_process';
import { promisify } from 'util';

const promiseExec = promisify(exec);

if (process.env.PACKAGES) {
  console.log(`Installing: ${process.env.PACKAGES}`);
  promiseExec(
    `cd /tmp && npm init -y && npm install ${process.env.PACKAGES}`,
  ).then(console.log);
}
