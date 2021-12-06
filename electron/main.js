//electron attempt
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserView;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  //error: win.loadFile is not a function
  win.loadFile('./server/view/layouts/main.handlebars');
};

app.whenReady().then(() => {
  createWindow();
  
  //Mac
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') { //not mac
    app.quit();
  }
});