import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';

import { AddSettingPanel } from './addSetting';

const Settings = () => {
	const [ showAddPanel, setShowAddPanel ] = useState( false );

	return (
		<>
			{ /* Temporary UI changing in BBMSK-9 */ }
			<div>
				<h1>Settings</h1>
				<Button
					variant="primary"
					onClick={ () => setShowAddPanel( true ) }
				>
					Show Add Setting Panel
				</Button>
			</div>
			{ showAddPanel ? (
				<AddSettingPanel
					handleClose={ () => setShowAddPanel( false ) }
				/>
			) : null }
		</>
	);
};

export default Settings;
