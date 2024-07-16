import { useEffect, useState } from '@wordpress/element';

import { useSettings } from './hooks';
import { NavigationPanel, SettingsContainer } from './components';

const Settings = () => {
	const [ activeCategory, setActiveCategory ] = useState( 'General' );
	const { fetchSettings } = useSettings();

	useEffect( () => {
		fetchSettings();
		// Disabling the eslint rule, if added the function will be called on an endless loop.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	return (
		<>
			<NavigationPanel
				activeCategory={ activeCategory }
				setActiveCategory={ setActiveCategory }
			/>
			<SettingsContainer category={ activeCategory } />
		</>
	);
};

export default Settings;
