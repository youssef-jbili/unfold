import { BrowserWindow, app, shell } from 'electron';
import path from 'path';
import MenuBuilder from '../menu';
import { resolveHtmlPath } from '../util';

export const WINDOW_MANAGER = (() => {
  class WindowManager {
    private mainWindow: BrowserWindow | null = null;

    private stickyWindow: BrowserWindow | null = null;

    public readonly RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    public readonly PRELOAD_PATH = app.isPackaged
      ? path.join(__dirname, 'preload.js')
      : path.join(__dirname, '../../../.erb/dll/preload.js');

    get hasOpenWindow(): boolean {
      return !!this.mainWindow || !!this.stickyWindow;
    }

    getAssetPath(...paths: string[]): string {
      return path.join(this.RESOURCES_PATH, ...paths);
    }

    getMainWindow(): BrowserWindow {
      if (this.mainWindow) {
        return this.mainWindow;
      }
      this.mainWindow = new BrowserWindow({
        show: true,
        width: 1024,
        height: 728,
        icon: this.getAssetPath('icon.png'),
        title: 'Gitlab Automator',
        webPreferences: {
          preload: this.PRELOAD_PATH,
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

    getStickyWindow(): BrowserWindow {
      if (this.stickyWindow) {
        this.stickyWindow.restore();
        this.stickyWindow.focus();
        return this.stickyWindow;
      }
      this.stickyWindow = new BrowserWindow({
        show: true,
        width: 250,
        height: 450,
        icon: this.getAssetPath('icon.png'),
        title: 'Gitlab Automator tracker',
        webPreferences: {
          preload: this.PRELOAD_PATH,
        },
        alwaysOnTop: true,
        maximizable: false,
        maxWidth: 250,
        minWidth: 250,
      });

      this.stickyWindow.loadURL(resolveHtmlPath('index.html', 'tracker'));

      this.stickyWindow.on('ready-to-show', () => {
        if (!this.stickyWindow) {
          throw new Error('"sticky" is not defined');
        }
        this.stickyWindow.show();
      });

      this.stickyWindow.on('closed', () => {
        this.stickyWindow = null;
      });

      const menuBuilder = new MenuBuilder(this.stickyWindow);
      menuBuilder.buildMenu();

      // Open urls in the user's browser
      this.stickyWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
      });

      return this.stickyWindow;
    }
  }

  return new WindowManager();
})();
