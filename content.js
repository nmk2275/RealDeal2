// Inject sidebar only if not already present
if (!document.getElementById('realdeal-sidebar')) {
  const sidebar = document.createElement('div');
  sidebar.id = 'realdeal-sidebar';
  sidebar.innerHTML = `
    <button class="sidebar-btn" id="price-history-btn" title="Price History">
      <span class="icon">📈</span>
      <span class="label">Price History</span>
    </button>
    <button class="sidebar-btn" id="reviews-auth-btn" title="Reviews Authenticity">
      <span class="icon">⭐</span>
      <span class="label">Reviews authenticity</span>
    </button>
    <button class="sidebar-btn" id="seller-rep-btn" title="Seller Reputation">
      <span class="icon">📦</span>
      <span class="label">Seller reputation</span>
    </button>
    <button class="sidebar-btn" id="recommend-btn" title="Recommendation">
      <span class="icon">✅</span>
      <span class="label">Suggestion bar</span>
    </button>
  `;
  document.body.appendChild(sidebar);

  // Add sidebar CSS
  const style = document.createElement('style');
  style.textContent = `
    #realdeal-sidebar {
      position: fixed;
      top: 80px;
      right: 0;
      width: 60px;
      background: rgb(98, 171, 243);
      border-radius: 0 12px 12px 0;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 0;
    }
    .sidebar-btn {
      background: none;
      border: none;
      color: #fff;
      width: 48px;
      height: 48px;
      margin: 6px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.2s;
      font-size: 18px;
    }
    .sidebar-btn:hover {
      background: #1565c0;
    }
    .icon {
      font-size: 22px;
      margin-bottom: 2px;
    }
    .label {
      font-size: 10px;
      font-weight: 500;
      line-height: 1;
    }
  `;
  document.head.appendChild(style);
}

// Inject price history panel (hidden by default)
const pricePanel = document.createElement('div');
pricePanel.id = 'realdeal-price-panel';
pricePanel.innerHTML = `
  <div id="rd-panel-header">
    <span>Price History</span>
    <button id="rd-panel-close" style="float:right;">✖</button>
  </div>
  <div id="priceChartContainer" style="width: 100%; height: 400px;"></div>
`;
pricePanel.style.display = 'none';
document.body.appendChild(pricePanel);

// Add panel CSS
const panelStyle = document.createElement('style');
panelStyle.textContent = `
  #realdeal-price-panel {
    position: fixed;
    top: 100px;
    right: 70px;
    width: 350px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.18);
    z-index: 100000;
    padding: 16px;
    border: 1px solid #1976d2;
  }
  #rd-panel-header {
    font-weight: bold;
    color: #1976d2;
    margin-bottom: 8px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #rd-panel-close {
    background: none;
    border: none;
    color: #1976d2;
    font-size: 18px;
    cursor: pointer;
  }
`;
document.head.appendChild(panelStyle);

// Load Highcharts dynamically
const highchartsScript = document.createElement('script');
highchartsScript.src = chrome.runtime.getURL('node_modules/highcharts/highcharts.js');
document.head.appendChild(highchartsScript);

highchartsScript.onload = () => {
  console.log('Highcharts loaded successfully!');
};

document.addEventListener('DOMContentLoaded', () => {
  console.log("Content script DOM ready.");

  const priceHistoryBtn = document.getElementById('price-history-btn');
  const pricePanel = document.getElementById('realdeal-price-panel');
  const closeBtn = document.getElementById('rd-panel-close');

  if (priceHistoryBtn) {
    priceHistoryBtn.onclick = function () {
      console.log('Price History button clicked!');
      pricePanel.style.display = 'block';

      const priceData = [100, 120, 110, 130, 125, 140, 150];
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

      if (typeof Highcharts !== 'undefined') {
        Highcharts.chart('priceChartContainer', {
          chart: { type: 'line' },
          title: { text: 'Price History' },
          xAxis: { categories: labels, title: { text: 'Months' }},
          yAxis: { title: { text: 'Price' }},
          series: [{ name: 'Price', data: priceData }]
        });
      } else {
        console.error("Highcharts is not loaded yet.");
      }
    };
  }

  if (closeBtn) {
    closeBtn.onclick = function () {
      pricePanel.style.display = 'none';
    };
  }

  document.getElementById('reviews-auth-btn').onclick = function () {
    alert('Show reviews authenticity panel here!');
  };
  document.getElementById('seller-rep-btn').onclick = function () {
    alert('Show seller reputation panel here!');
  };
  document.getElementById('recommend-btn').onclick = function () {
    alert('Show recommendation panel here!');
  };

  // These use jQuery
  setTab();
  setVersion();
});

// Functions that use jQuery
function setTab() {
  console.log("setTab() called");
  $('body').append('<div style="display:none;">Tab set!</div>');
}

function setVersion() {
  console.log("setVersion() called");
  $('body').append('<div style="display:none;">Version set!</div>');
}

const imgUrl = chrome.runtime.getURL("images/spendCalc__scanning.gif");
const imgElement = `<img src="${imgUrl}" alt="Scanning" />`;
$('body').append(imgElement);

console.log("Content script loaded!");
