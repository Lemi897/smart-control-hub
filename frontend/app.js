const scanBtn = document.getElementById("scanBtn");
const container = document.getElementById("deviceContainer");

scanBtn.addEventListener("click", scanNetwork);

async function scanNetwork() {
  container.innerHTML = "<p class='loading'>Scanning network...</p>";

  try {
    const res = await fetch("http://localhost:3000/api/scan");
    const data = await res.json();

    if (!data.devices || data.devices.length === 0) {
      container.innerHTML = "<p class='loading'>No devices found. Make sure your devices are online and try again.</p>";
      return;
    }

    container.innerHTML = "";

    data.devices.forEach((device) => {
      const card = document.createElement("div");
      card.className = "device-card";

      card.innerHTML = `
        <h3>Device</h3>
        <p><strong>IP:</strong> ${device.ip}</p>
        <p><strong>MAC:</strong> ${device.mac}</p>
        <p>
          <strong>Type:</strong> 
          <span title="Currently showing 'unknown'. Future update: detect phone, PC, router, etc.">
            ${device.type}
          </span>
        </p>
      `;

      // Disable all clicks on card
      card.addEventListener("click", (e) => e.preventDefault());

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p class='loading'>Error scanning network. Make sure backend is running.</p>";
    console.error(err);
  }
}
