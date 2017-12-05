import { app, BrowserWindow, shell } from 'electron';

const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080` : `file://${__dirname}/index.html`;


let mainWindow;
function createWindow() {
	/**
	* Initial window options
	*/
	mainWindow = new BrowserWindow({
		height: 563,
		useContentSize: true,
		width: 1000,
	});
	
	mainWindow.loadURL(winURL);
	
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
	
	mainWindow.webContents.on('new-window', (e, url) => {
		if (url != mainWindow.webContents.getURL()) {
			e.preventDefault();
			shell.openExternal(url);
		}
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

/**
* Auto Updater
*
* Uncomment the following code below and install `electron-updater` to
* support auto updating. Code Signing with a valid certificate is required.
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
*/

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
	autoUpdater.quitAndInstall()
})

app.on('ready', () => {
	if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
*/