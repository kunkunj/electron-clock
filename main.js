const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
      height: 600,
      icon: path.join(__dirname,'./icons/clock.png')
  });

  win.loadFile("index.html");
  win.on("close", (e) => {
    e.preventDefault(); // 阻止退出程序
    win.setSkipTaskbar(true); // 取消任务栏显示
    win.hide(); // 隐藏主程序窗口
  });
  tray = new Tray(path.join(__dirname, "icons", "clock.png"));

  // 自定义托盘图标的内容菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      // 点击退出菜单退出程序
      label: "退出",
      click: function () {
        win.destroy();
        app.quit();
      },
    },
  ]);

  tray.setToolTip("备忘录"); // 设置鼠标指针在托盘图标上悬停时显示的文本
  tray.setContextMenu(contextMenu); // 设置图标的内容菜单
  // 点击托盘图标，显示主窗口
  tray.on("click", () => {
    win.show();
  });
    
Menu.setApplicationMenu(null);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("toTray", function () {
  win.hide();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
