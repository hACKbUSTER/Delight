const {app, BrowserWindow} = require('electron')

let win
let appIcon

function createWindow () {

  // Create the browser window.
  win = new BrowserWindow({
  	width: 800, 
  	height: 600,
  	minWidth: 800,
  	minHeight: 600,
  	resizable: true,
  	titleBarStyle: 'hidden',
  })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`)

  // win.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
	// var cp = require('child_process')
	// cp.exec('cd app', {})
	// cp.exec('python -m SimpleHTTPServer 2333')
	// let script_path = __dirname + '/server.sh'
	// var subpy = require('child_process').spawn('sh', [script_path])
	var subpy = require('child_process').spawn('sh', ['server.sh'])
	var mainAddr = 'http://localhost:2333';

	win = new BrowserWindow({
		width: 800, 
		height: 600,
		minWidth: 800,
		minHeight: 600,
		resizable: true,
		titleBarStyle: 'hidden',
	})

	setTimeout(function() {
		win.loadURL('http://localhost:2333');
	}, 1000);
	
	win.webContents.openDevTools();
	win.on('closed', function() {
		win = null;
		subpy.kill('SIGINT');
	});

	// win.webContents.on('did-fail-load',
 //        function (event, errorCode, errorDescription) {
 //            console.log('Page failed to load (' + errorCode + '). The server is probably not yet running. Trying again in 100ms.');
 //            setTimeout(function() {
 //                win.webContents.reload();
 //            }, 100);
 //        }
 //    );
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})