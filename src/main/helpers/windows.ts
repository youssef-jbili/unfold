import { BrowserWindow, app, shell } from 'electron';
import path from 'path';
import MenuBuilder from '../menu';
import { resolveHtmlPath } from '../util';

export const WINDOW_MANAGER = (() => {
  class WindowManager {
    private mainWindow: BrowserWindow | null = null;

    private stickyWindow: BrowserWindow | null = null;

    public static readonly RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    static getAssetPath(...paths: string[]): string {
      return path.join(WindowManager.RESOURCES_PATH, ...paths);
    }

    getMainWindow(): BrowserWindow {
      if (this.mainWindow) {
        return this.mainWindow;
      }
      this.mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: WindowManager.getAssetPath('icon.png'),
        title: 'Gitlab Automator',
        webPreferences: {
          preload: app.isPackaged
            ? path.join(__dirname, '../preload.js')
            : path.join(__dirname, '../../../.erb/dll/preload.js'),
        },
      });

      this.mainWindow.loadURL(resolveHtmlPath('index.html', 'onboarding'));

      this.mainWindow.on('ready-to-show', () => {
        if (!this.mainWindow) {
          throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
          this.mainWindow.minimize();
        } else {
          this.mainWindow.show();
        }
      });

      this.mainWindow.on('closed', () => {
        this.mainWindow = null;
      });

      const menuBuilder = new MenuBuilder(this.mainWindow);
      menuBuilder.buildMenu();

      // Open urls in the user's browser
      this.mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
      });

      return this.mainWindow;
    }
  }

  return new WindowManager();
})();
