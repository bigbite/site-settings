# Site Settings

Plugin to create global site settings. Using supported components from the wordpress component library.

Settings are split into three categories: general, analytics and styles.

Using the floating action button at the bottom left you can configure your own setting for the category.

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

## Setting storage

Settings are stored in the `wp_options` table. This plugin uses backbone.js in `admin/services/settingServices` to fetch and save settings.

The setting are stored as JSON with the following structure:

```json
{
	<category>: [
		{
			id: <uniqueId>
			field: <supportedField>
			value: <value to be returned by api>
			attributes: <object holding field props that can be spread on component>
		}
	]
}
```

We currently support three categories (General, Analytics and Styles) as definded in `admin/schema/supportedCategories`

## Settings validation

When reading settings from db or about to save setting we validate using `admin/schema/settingSchema`. If this validation fails a notice will be displayed on top of the main settings view.


## Add new supported field

1. Add to `admin/fields/supported-fields` Following this structure:
```js
<key>: {
	Component: <Custom | Wordpress component>,
	keyProp: <Value prop for component>,
	label: <Used in select dropdown>
	attributes: <Props that can be easily spread on component>
}
```
2. Check for new field in `admin/components/FieldConfigurator` and add your own custom field configurator to handle creating new field.
3. Just handle updating the props, when saving (submitting form) it will get passed `admin/schema/formatSetting` and then passed to the provider which will validate the settings before saving to db.
4. Update the `getSettingValue` in `admin/schema/formatSetting` function for new field
5. Settings stored in db get fetched on mount `admin/components/SettingsContainer` make sure the new field can be read and updated here.


