# Site Settings

This WordPress plugin provides an interface to create and manage global site settings
using supported components from the WordPress component library.

## Features

- Settings are split into three categories: General, Analytics, and Styles.
- Easily add, edit, and delete settings within each category.
- Configure new setting.
- Import / export setting (Upcoming)
- Use php function to retrieve value or arrtibutes for each setting (Upcoming)

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

## Usage

1. Navigate to the "Site Settings" page in the WordPress admin panel.
2. Use the navigation panel to switch between different categories.
3. Add, edit, and delete settings as needed.
4. Save your changes or discard them if necessary.

## Architecture

View the current [architecture](ARCHITECTURE.md)

## Setting storage

Settings are stored in the `wp_options` table. This plugin uses backbone.js in `admin/services/settingServices` to fetch and save settings.

The setting are stored as JSON with the following structure:

```json
{
    "supportedCategory": [
        {
            "id": "uniqueId",
            "field": "supportedField",
            "value": "value to be returned by API",
            "attributes": { "object holding field props that can be spread on component, used as default values too" }
        }
    ]
}
```

Supported categories (general, analytics and styles) as definded in `admin/schema/supportedCategories`

Supported fields (text, toggle, radio and checkbox-group) definded in `admin/fields/supportedFields`

## Settings validation

When reading settings from db or about to save setting we validate using `admin/schema/settingSchema`. If this validation fails a notice will be displayed on top of the main settings view.


## Add new supported field

1. Add to `admin/fields/supported-fields` Following this structure:
```js
<key>: {
	Component: <Custom | Wordpress component>,
	keyProp: <Value prop for component E.G checked | value>,
	label: <Used in select dropdown>
	attributes: <Props that can be easily spread on component>
}
```
2. Check for the new field in `admin/components/FieldConfigurator` and add your own custom field configurator to handle creating new fields.
3. Handle updating the props. When saving (submitting the form), it will be passed to `admin/schema/formatSetting` and then to the provider, which will validate the settings before saving to the database.
4. Update the `getSettingValue` function in `admin/schema/formatSetting` for the new field.
5. Ensure the new field can be read and updated in admin/components/SettingsContainer where settings stored in the database are fetched on mount.


