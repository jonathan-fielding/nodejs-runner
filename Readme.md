# Node.js Runner

This Node.js runner is a docker container designed to run Node.js within the docker sandbox.

The initial purpose of the Node.js runner is to provide a safe environment for a Node.js repl built into a slide deck to run without the potential that the host system could be compromised. I would love to hear about other purposes this has been used for though.

## Usage

To use this docker container first connect to it using websockets, you can then send the JavaScript code you want to execute to the container and it will stream back the output.

To stop the executing code send the command `EXIT`

To enable custom npm packages, add the names of the packages seperated by spaces into a environment variable called `PACKAGES` e.g `node-fetch express`. This can be useful if you want to use these node packages in your repl.

## Licence

Copyright 2020 Jonathan Fielding

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
