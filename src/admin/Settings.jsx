import { useEffect, useState } from '@wordpress/element';

import { useSettings } from './hooks';
import { NavigationPanel, SettingsContainer } from './components';

const Settings = () => {
	const [ activeSetting, setActiveSetting ] = useState( 'General' );
	const { fetchSettings } = useSettings();

	useEffect( () => {
		fetchSettings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	return (
		<>
			<NavigationPanel
				active={ activeSetting }
				setActive={ setActiveSetting }
			/>
			<SettingsContainer setting={ activeSetting } />
		</>
	);
};

export default Settings;
