const serverPort: number = 3000;

import { Server as WebSocketServer } from 'ws';
import { fork } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const socket = new WebSocketServer({ port: serverPort });
const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

console.log('starting');

// eslint-disable-next-line func-style
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

socket.on('connection', function (ws: any) {
  ws.on('message', async (message: any) => {
    const filename = uuidv4();
    const filepath = `/tmp/${filename}.js`;
    const fullCode = `(async () => {
      ${message}
    })()`;

    await writeFile(filepath, fullCode);

    const child = fork(filepath, [], {
      silent: true,
    });

    child?.stdout?.on('data', (data) => {
      const output = data.toString();
      ws.send(output);
    });

    child?.stderr?.on('data', (data) => {
      const output = data.toString();
      ws.send(output);
    });

    child?.stdout?.on('end', async () => {
      await deleteFile(filepath);
      ws.send(`--- end ---`);
    });
  });
});
