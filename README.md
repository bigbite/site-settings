# Site Settings

## Local Development or Manual Install
Clone the repository into your `plugins` or `client-mu-plugins` directory.
```
git clone git@github.com:@big-bite/site-settings.git && cd site-settings
```

Install JS packages.
```
npm install
```

Build all assets
```
npm run build:prod
```

Install PHP packages and create autoloader for the plugin.
```
composer update
```

Dev watch mode
```
npm run watch:dev
```
