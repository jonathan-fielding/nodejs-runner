const serverPort: number = 3000;

import { Server as WebSocketServer } from 'ws';
import { fork, ChildProcess } from 'child_process';
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
  let child: ChildProcess | null = null;

  ws.on('message', async (message: string) => {
    const filename = uuidv4();
    const filepath = `/tmp/${filename}.js`;

    if (message === 'EXIT' && child !== null) {
      try {
        child.kill();
        ws.send(`--- end ---`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error); // Useful in the docker logs
        ws.send(error);
      }

      return;
    }

    const fullCode = `(async () => {
      ${message}
    })()`;

    await writeFile(filepath, fullCode);

    child = fork(filepath, [], {
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
