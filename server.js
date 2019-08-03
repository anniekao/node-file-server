const net = require('net');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = net.createServer((c) => {
  console.log('client connected!');
  c.on('end', () => {
    console.log('client disconnnected');
  });
})
  .listen({port: 3000, address: "localhost"}, () => {
    console.log("server listening on port 3000!");
  });

server.on('error', (err) => {
  throw err;
});

// to do: check if file exists in directory
server.on("connection", c => {
  let fileName;
  c.on('data', file => {
    fileName = file.toString();
    fs.readFile(`${fileName}`, (err, data) => {
      if (!err) {
        // console.log(data);
        c.write(data);
      } else {
        console.log(err);
      }
    });
    c.pipe(c);
  });
});

