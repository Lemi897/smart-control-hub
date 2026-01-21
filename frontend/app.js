const scanBtn = document.getElementById("scanBtn");
const container = document.getElementById("deviceContainer");

let previousDevices = [];
const scanInterval = 15000; // auto-refresh every 15s

scanBtn.addEventListener("click", scanNetwork);
setInterval(scanNetwork, scanInterval); // auto-refresh

async function scanNetwork() {
  container.innerHTML = "<p class='loading'>Scanning network...</p>";

  try {
    const res = await fetch("http://localhost:3000/api/scan");
    const data = await res.json();

    if (!data.devices || data.devices.length === 0) {
      container.innerHTML = "<p class='loading'>No devices found. Make sure your devices are online.</p>";
      previousDevices = [];
      return;
    }

    container.innerHTML = "";

    data.devices.forEach((device) => {
      const card = document.createElement("div");
      card.className = "device-card";

      const isNew = !previousDevices.find(d => d.mac === device.mac);
      if (isNew) card.classList.add("new-device");

      card.innerHTML = `
        <h3>Device</h3>
        <p><strong>IP:</strong> ${device.ip}</p>
        <p><strong>MAC:</strong> ${device.mac}</p>
        <p>
          <strong>Type:</strong> 
          <span title="Hover to see device type">${device.icon} ${device.type}</span>
        </p>

        <!-- LED Controls -->
        <div class="controls">
          <button class="on-btn">ON</button>
          <button class="off-btn">OFF</button>
          <input type="color" class="color-picker" />
        </div>
      `;

      // Disable clicks on card itself
      card.addEventListener("click", (e) => e.preventDefault());

      container.appendChild(card);

      // LED / IoT control events
      const onBtn = card.querySelector(".on-btn");
      const offBtn = card.querySelector(".off-btn");
      const colorPicker = card.querySelector(".color-picker");

      onBtn.addEventListener("click", () => controlDevice(device.ip, "on"));
      offBtn.addEventListener("click", () => controlDevice(device.ip, "off"));
      colorPicker.addEventListener("input", (e) => controlDevice(device.ip, "color", e.target.value));
    });

    previousDevices = data.devices;

  } catch (err) {
    container.innerHTML = "<p class='loading'>Error scanning network. Make sure backend is running.</p>";
    console.error(err);
  }
}

// Control device via backend
async function controlDevice(ip, action, color = null) {
  try {
    const res = await fetch("http://localhost:3000/api/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceIp: ip, action, color }),
    });
    const data = await res.json();
    console.log("Control response:", data);
  } catch (err) {
    console.error("Control error:", err);
  }
}
