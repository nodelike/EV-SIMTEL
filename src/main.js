const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const usb = require('usb');
const usbDetect = require('usb-detection');
usbDetect.startMonitoring();

let mainWindow;

const USB_SERIAL_NUMBER = '007604D63040';

usbDetect.on('add', () => {
  const devices = usb.getDeviceList();
  let found = devices.some(device => {
    try {
      device.open();
      const serialNumber = device.deviceDescriptor.iSerialNumber;
      device.close();
      return serialNumber === USB_SERIAL_NUMBER;
    } catch (e) {
      console.error(e);
      return false;
    }
  });

  if (found) {
    console.log("USB Key Found. App starting...");
    // Load your app here
  } else {
    console.log("USB Key not found. Exiting...");
    app.quit();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, '../icon.ico')
  });

  // mainWindow.setMenu(null);

  mainWindow.loadFile(path.join(__dirname, 'home.html')).catch(err => {
    console.error('Failed to load index.html:', err);
  });
  

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
