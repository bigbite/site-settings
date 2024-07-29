import { useEffect, useState } from '@wordpress/element';

import { useSettings } from './hooks';
import {
	AddSettingPanel,
	NavigationPanel,
	SettingsContainer,
	SettingsNotice,
	SettingsSnackbar,
} from './components';

const Settings = () => {
	const [ activeCategory, setActiveCategory ] = useState( 'General' );
	const [ showAddPanel, setShowAddPanel ] = useState( false );

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
				showAddPanel={ () => setShowAddPanel( true ) }
			/>
			<div className="settings">
				<SettingsNotice />
				<SettingsContainer category={ activeCategory } />
			</div>
			{ showAddPanel && (
				<AddSettingPanel
					handleClose={ () => setShowAddPanel( false ) }
				/>
			) }
			<SettingsSnackbar />
		</>
	);
};

export default Settings;
