// import nmap from 'node-nmap';
// // nmap.nmapLocation = 'C:\\Program Files (x86)\\Nmap\\nmap.exe';

// const options = {
//   flags: ['-sS', '--max-retries', '3', '--host-timeout', '5000'],
// };

// const nmapScan = new nmap.NmapScan('127.0.0.1', options.flags);

// nmapScan.on('complete', (data) => {
//   console.log(data[0].openPorts);
// });

// nmapScan.startScan();

// import { spawn } from "child_process";
// import nmap from "node-nmap"
// nmap.nmapLocation = 'C:\\Program Files (x86)\\Nmap\\nmap.exe';

// const scanEndpoint = (req, res) => {
//   const nmapProcess = spawn("nmap -sS localhost");

//   let scanResult = "";

//   nmapProcess.stdout.on("data", (data) => {
//     scanResult += data.toString();
//   });
//   nmapProcess.on("error", (err) => {
//     console.log('error ', err);
//   })

//   nmapProcess.on("close", (code) => {
//     if (code === 0) {
//       console.log('success');
//     } else {
//       console.log('error ', code)
//     }
//   });
// };

// scanEndpoint();

// import { spawn } from "child_process";

// function runCommand(command, args) {
//   return new Promise((resolve, reject) => {
//     const childProcess = spawn(command, args);

//     let result = "";

//     childProcess.stdout.on("data", (data) => {
//       result += data.toString();
//     });

//     childProcess.stderr.on("data", (data) => {
//       console.error(data.toString());
//     });

//     childProcess.on("error", (error) => {
//       reject(error);
//     });

//     childProcess.on("close", (code) => {
//       if (code === 0) {
//         resolve(result);
//       } else {
//         reject(new Error(`Command failed with exit code ${code}`));
//       }
//     });
//   });
// }

// async function main() {
//   try {
//     const output = await runCommand("nmap");
//     console.log(output);
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();

import { spawn } from "child_process";

async function main() {
  const options = ["-sS", "--max-retries", "3", "--host-timeout", "5000"];

  const nmapProcess = spawn("nmap", options.concat("localhost"));

  let scanResult = "";

  nmapProcess.stdout.on("data", (data) => {
    // scanResult += data.toString();
    console.log(data.toString())
  });

  nmapProcess.on("close", (code) => {
    if (code === 0) {
      console.log(scanResult);
    } else {
      console.log("error");
    }
  });
}

main();
