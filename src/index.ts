const serverPort: number = 3000;

import { Server as WebSocketServer } from 'ws';
import { fork } from 'child_process';
const socket = new WebSocketServer({ port: serverPort });

console.log('starting');

socket.on('connection', function (ws: any) {
  ws.on('message', (message: any) => {
    const child = fork('./src/child.ts', [], {
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

    child?.stdout?.on('end', () => {
      ws.send(`--- end ---`);
    });

    child.send(message);
  });
});
