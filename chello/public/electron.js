const path = require("path");

const { app, BrowserWindow, globalShortcut } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        icon: "public/icon.png",
    });
    win.maximize();
    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    // Open the DevTools.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
    .then(() => {
        globalShortcut.register("CommandOrControl+N", () => {
            createWindow();
        });
        globalShortcut.register("CommandOrControl+Q", () => {
            app.quit();
        });
    })
    .then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const loadTemplate = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

app.setUserTasks([
    {
        program: process.execPath,
        arguments: loadTemplate,
        iconPath: path.join(__dirname, "icon.ico"),
        iconIndex: 0,
        title: "New Window",
        description: "Create a new window",
    },
]);
