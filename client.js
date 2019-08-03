const net = require('net');
const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



const conn = net.createConnection({host:'localhost', port:3000}, () => {
  console.log('connected to server!');
});

conn.setEncoding("utf-8");

const saveFile = (data) => {
  rl.question("What should the file be called? ", saveAs => {
    fs.writeFile(`${saveAs}`, data, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("File saved!");
        conn.destroy();
      }
    });
    rl.close();
  });
  
};

conn.on("connect", () => {
  rl.question("What file are you looking for? ", file => {
    conn.write(file);
    conn.on("data", data => {
      saveFile(data);
    });
  });
});





