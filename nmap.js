import nmap from 'node-nmap';
// nmap.nmapLocation = 'C:\\Program Files (x86)\\Nmap\\nmap.exe';

const options = {
  flags: ['-sS', '--max-retries', '3', '--host-timeout', '5000'],
};

const nmapScan = new nmap.NmapScan('127.0.0.1', options.flags);

nmapScan.on('complete', (data) => {
  console.log(data[0].openPorts);
});

nmapScan.startScan();