const electron = require('electron');

const { app, BrowserWindow ,Menu, dialog, remote } = electron;

let mainWindow = null;
let attempt = 3;

function handleClick(event) {
    console.log('User clicked notification ' + event.id + '. Closing it immediately.');
    event.closeNotification();
}
 
function handleClose(event) {
    console.log('Notification was closed because: ' + event.name);
}

function wait() {
    setTimeout(() => {console.log('waiting 5 secs'); }, 5000);
}
  
// listen for app
app.on('ready', () => {
    //create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false
        }
    }); 
    // mainWindow.setFullScreen(true);
    //load html
    mainWindow.loadURL('https://www.hackerrank.com/');

    mainWindow.webContents.openDevTools();
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert Menu
    Menu.setApplicationMenu(mainMenu);
    // mainWindow.on('blur', () => {
    //     const eNotify = require('electron-notify');
    //         eNotify.notify({
    //             title: 'Warning',
    //             text: 'Go to Contest tab within 5 sec, if not you will be out of contest',
    //             onClickFunc: handleClick,
    //             onCloseFunc: handleClose
    //         });
    //         console.log(dialog.showMessageBox(mainWindow, { 
    //             message : "Don't try to switch window", 
    //             buttonLabel: "ok",
    //             // onClickFunc: handleDialog,
    //             // onCloseFunc: handleDialog
    //         }));
    //         console.log(mainWindow.isfocused(),'== true');
    //         await wait();
    //         if(!window.isfocused()) {
    //             app.quit();
    //         }
    //     attempt = attempt - 1;
    //     console.log('blur');
    // });
});

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
        
    }
]
