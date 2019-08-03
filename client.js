const net = require('net');
const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.connect({
  host:'localhost',
  port: 3000
}, () => {
  console.log("connected to server!");
  rl.question("What should the file name be?", answer => {
    conn.on("data", chunk => {
      fs.writeFile(`${answer}`, chunk, err => {
        if (err) {
          console.log(err);
        } else {
          console.log("File saved!");
          conn.destroy();
        }
      });
    });
    rl.close();
  });
});


conn.setEncoding("utf-8");


