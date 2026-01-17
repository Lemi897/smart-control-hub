const { exec } = require("child_process");

// Common MAC prefixes for popular brands
const brandPrefixes = {
  "78:9a:18": "Router",
  "b8:27:eb": "Raspberry Pi",
  "44:65:0d": "Apple",
  "3c:5a:b4": "Samsung",
  "ac:bc:32": "PC/Laptop",
};

function getDeviceType(mac) {
  if (!mac) return "unknown";

  const prefix = mac.toLowerCase().slice(0, 8); // first 3 bytes
  if (brandPrefixes[prefix]) return brandPrefixes[prefix];

  // simple rule: if IP ends with .1 → router
  return "unknown";
}

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
        const match = line.match(/\(([^)]+)\) at ([0-9a-f:]+)/);
        if (match) {
          const ip = match[1];
          const mac = match[2];
          devices.push({
            ip,
            mac,
            type: getDeviceType(mac) === "unknown" && ip.endsWith(".1") ? "Router" : getDeviceType(mac),
          });
        }
      });

      resolve(devices);
    });
  });
}

module.exports = scanNetwork;
