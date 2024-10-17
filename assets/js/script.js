'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function detectOS() {
  const userAgent = window.navigator.userAgent;
  let os = "Unknown";

  if (userAgent.indexOf("Win") !== -1) os = "Windows";
  else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
  else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
  else if (userAgent.indexOf("Android") !== -1) os = "Android";
  else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

  return os;
}

function detectBrowser() {
  const userAgent = navigator.userAgent;
  let browser = "Unknown browser";  // Default value

  switch (true) {
      case userAgent.indexOf("Firefox") > -1:
          browser = "Mozilla Firefox";
          break;
      case userAgent.indexOf("Edg") > -1:
          browser = "Microsoft Edge";
          break;
      case userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1:
          browser = "Opera";
          break;
      case userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") === -1 && userAgent.indexOf("OPR") === -1:
          browser = "Google Chrome";
          break;
      case userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1:
          browser = "Apple Safari";
          break;
      case userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1:
          browser = "Internet Explorer";
          break;
  }

  return browser;
}

function detectPrimaryLanguage() {
  const primaryLanguage = navigator.language || navigator.userLanguage;

  document.getElementById('language-info').innerText = primaryLanguage;
}

function updateWindow() {
  const height = window.innerHeight;
  const width = window.innerWidth;

  document.getElementById('page-height').innerText = height;
  document.getElementById('page-width').innerText = width;
}

function findFormat() {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const format = (width > height) ? 'Landscape' : 'Portrait';

  document.getElementById('format').innerText = format;
}

function detectBattery() {
  if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
      const batteryStatusElement = select('#battery-status');
      const batteryLevelElement = select('#battery');
      
      if (batteryStatusElement && batteryLevelElement) {
        const charging = battery.charging ? 'Charging' : 'Idling';
        const level = Math.floor(battery.level * 100);

        batteryStatusElement.innerText = `Status: ${charging}`;
        batteryLevelElement.innerText = `Level: ${level}%`;
      } 
    });
  }
}

function detectConnectivity() {
  const connectivityStatusElement = select('#connection');

  function updateConnectivityStatus() {
    const online = navigator.onLine;
    connectivityStatusElement.innerText = online ? 'Online' : 'Offline';

    if (online) {
      connectivityStatusElement.classList.add('online');
      connectivityStatusElement.classList.remove('offline');
    } else {
      connectivityStatusElement.classList.add('offline');
      connectivityStatusElement.classList.remove('online');
    }
  }

  updateConnectivityStatus();

  listen('online', window, updateConnectivityStatus);
  listen('offline', window, updateConnectivityStatus);
}

listen('load', window, function () {
  updateWindow();
  findFormat();
  detectBattery();
  detectConnectivity();
});

listen('resize', window, function () {
  updateWindow();
  findFormat();
});

// Existing DOMContentLoaded listener for OS, Browser, and Language detection
window.addEventListener('DOMContentLoaded', function () { 
  const osInfoElement = select('#os-info');
  
  if (osInfoElement) {
    osInfoElement.innerText = detectOS();
  }

  const browserInfoElement = document.getElementById("browser-info");
  
  if (browserInfoElement) {
    browserInfoElement.innerText = `${detectBrowser()}`;
  }

  detectPrimaryLanguage();
});
