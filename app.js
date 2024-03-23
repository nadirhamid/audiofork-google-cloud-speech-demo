const { SpeechClient } = require('@google-cloud/speech');
const { workerData } = require('worker_threads');
const { createServer } = require('http');
const { parse } = require('url');
const { WebSocketServer } = require('ws');
const { Transform } = require('stream');
const { Readable } = require('stream');
require('dotenv').config();

const PORT = 5001;
let channelID = null;

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === '/') {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  }
});

wss.on('connection', async (ws, req) => {
  const speechClient = new SpeechClient();

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk);
    }
  });

  const request = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 8000,
      languageCode: 'en-US',
    },
    interimResults: false,
  };

  const recognizeStream = speechClient
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
      if (data.results[0] && data.results[0].alternatives[0]) {
        console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`);
      }
    });

  transformStream.pipe(recognizeStream);

  ws.on('message', (message) => {
    transformStream.write(message);
  });

  ws.on('close', () => {
    transformStream.end();
  });
});

server.listen(PORT);
console.log(`Server is running on port ${PORT}`);
