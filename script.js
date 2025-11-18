/* 
  Function to draw dynamic line charts 
  Using simple SVG paths (no external libraries)
*/
function createChart(id, data) {
  const svg = document.getElementById(id);
  const width = svg.clientWidth;
  const height = svg.clientHeight;
  const padding = 20;

  const xScale = (width - padding * 2) / (data.length - 1);
  const yScale = (height - padding * 2) / Math.max(...data);

  let pathData = `M ${padding} ${height - padding - data[0] * yScale}`;

  // Building line path
  for (let i = 1; i < data.length; i++) {
    pathData += ` L ${i * xScale + padding} ${
      height - padding - data[i] * yScale
    }`;
  }

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  svg.appendChild(path);

  // Creating glowing dots
  data.forEach((value, index) => {
    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", index * xScale + padding);
    dot.setAttribute("cy", height - padding - value * yScale);
    dot.setAttribute("r", 4);
    svg.appendChild(dot);
  });
}

/* Updating stats dynamically every 2 seconds */
function updateStats() {
  document.getElementById("totalUsers").textContent =
    Math.floor(Math.random() * 9000 + 1000);

  document.getElementById("activeUsers").textContent =
    Math.floor(Math.random() * 3000);

  document.getElementById("totalRevenue").textContent =
    "$" + (Math.random() * 100000).toFixed(0);

  document.getElementById("averageOrder").textContent =
    "$" + (Math.random() * 200).toFixed(0);

  document.getElementById("cpuLoad").textContent =
    Math.floor(Math.random() * 100) + "%";

  document.getElementById("memoryUsage").textContent =
    Math.floor(Math.random() * 100) + "%";
}

/* Generating random data for charts */
const userData = Array.from({ length: 20 }, () =>
  Math.floor(Math.random() * 100)
);
const revenueData = Array.from({ length: 20 }, () =>
  Math.floor(Math.random() * 100)
);
const serverData = Array.from({ length: 20 }, () =>
  Math.floor(Math.random() * 100)
);

/* Draw charts */
createChart("userChart", userData);
createChart("revenueChart", revenueData);
createChart("serverChart", serverData);

/* Auto update every 2 seconds */
setInterval(updateStats, 2000);

/* Theme Toggle */
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});
