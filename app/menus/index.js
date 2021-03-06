const { app, Menu } = require('electron');
const application = require('./application');
const preferences = require('./preferences');
const help = require('./help');
const Tray = require('./tray');
let shouldQuit = false;

class Menus {
	constructor(window, config, iconPath) {
		this.window = window;
		this.iconPath = iconPath;
		this.config = config;
		this.initialize();
	}

	quit() {
		shouldQuit = true;
		app.quit();
	}

	open() {
		this.window.show();
	}

	reload() {
		this.window.show();
		this.window.reload();
	}

	initialize() {
		const appMenu = application(this);

		this.window.setMenu(Menu.buildFromTemplate([
			appMenu,
			preferences(),
			help(app),
		]));

		this.window.on('close', (event) => {
			if (!shouldQuit) {
				event.preventDefault();
				this.window.hide();
			} else {
				app.quit();
			}
		});

		new Tray(this.window, appMenu.submenu, this.iconPath);
	}
}

exports = module.exports = Menus;
