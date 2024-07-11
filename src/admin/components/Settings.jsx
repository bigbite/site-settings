import { useEffect, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';

import { AddSettingPanel } from './addSetting';
import { useSettings } from '../hooks';

/* Temporary code/ui BBMSK-9 */
/* eslint-disable */

const Settings = () => {
	const [ showAddPanel, setShowAddPanel ] = useState( false );
	const {
		settings,
		error,
		fetchSettings,
		handleEditSetting,
		handleDeleteSetting,
	} = useSettings();

	useEffect( () => {
		fetchSettings();
	}, [] );

	function renderSettings( settings ) {
		return Object.keys( settings ).map( ( category ) => {
			return (
				<div key={ category }>
					<h2>{ category }</h2>
					{ settings[ category ].map( ( setting ) => {
						return (
							<div key={ setting.id }>
								<div>
									<p>{ setting.attributes.label }</p>
									<p>{ setting.attributes.value }</p>
								</div>
								<button
									onClick={ () =>
										handleEditSetting( category, {
											...setting,
											attributes: {
												...setting.attributes,
												value: 'Edited',
											},
										} )
									}
								>
									Edit
								</button>
								<button
									onClick={ () =>
										handleDeleteSetting(
											category,
											setting.id
										)
									}
								>
									delete
								</button>
							</div>
						);
					} ) }

					<br />
				</div>
			);
		} );
	}

	return (
		<>
			<div>
				<h1>Settings</h1>
				<Button
					variant="primary"
					onClick={ () => setShowAddPanel( true ) }
				>
					Show Add Setting Panel
				</Button>
			</div>
			{ error ? <p>{ error }</p> : null }
			{ renderSettings( settings ) }
			{ showAddPanel ? (
				<AddSettingPanel
					handleClose={ () => setShowAddPanel( false ) }
				/>
			) : null }
		</>
	);
};

export default Settings;
