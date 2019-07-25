const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

//const customTitlebar = require('custom-electron-titlebar');


let win;

function createWindow() {
    //win = new BrowserWindow({ width: 1200, height: 600 });
    win = new BrowserWindow({ width: 1200, height: 800, titleBarStyle: 'hidden' });

    // load the dist folder from Angular
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, './dist/ng-airports/index.html'),
            protocol: "file:",
            slashes: true
        })
    );


    // win.setTitle();

    // The following is optional and will open the DevTools:
    // win.webContents.openDevTools()

    win.center()
    win.on("closed", () => {
        win = null;
    });

    //win.webContents.openDevTools()

}


/*app.setTitle(new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#444'),
    shadow: true
}));*/


app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// initialize the app's main window
app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});