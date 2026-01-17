const { exec } = require("child_process");

function scanNetwork() {
  return new Promise((resolve) => {
    exec("arp -a", (error, stdout) => {
      if (error) {
        resolve([]);
        return;
      }

      const lines = stdout.split("\n");
      const devices = [];

      lines.forEach((line) => {
        // Example line:
        // ? (192.168.1.1) at aa:bb:cc:dd:ee:ff [ether] on wlan0
        const match = line.match(
          /\(([^)]+)\) at ([0-9a-f:]+)/
        );

        if (match) {
          devices.push({
            ip: match[1],
            mac: match[2],
            type: "unknown",
          });
        }
      });

      resolve(devices);
    });
  });
}

module.exports = scanNetwork;
