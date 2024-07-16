import { Button } from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { getNavigationCategoriesOptions } from '../schema';

const NavigationPanel = ( { activeCategory, setActiveCategory } ) => {
	const categories = getNavigationCategoriesOptions();

	return (
		<div className="naviation-panel">
			<div className="navigation-panel__body">
				<h2>{ __( 'Site Settings', 'bb_site_settings' ) }</h2>
				<p>
					{ __(
						'A place to enter settings that you could use in the editor and throughout your site',
						'bb_site_settings'
					) }
				</p>
				<ul>
					{ categories.map( ( { id, label, icon } ) => (
						<li key={ id }>
							<Button
								onClick={ () => setActiveCategory( label ) }
								variant={
									activeCategory.toLowerCase() === id
										? 'primary'
										: 'tertiary'
								}
								icon={ <Icon icon={ icon } /> }
							>
								{ label }
							</Button>
						</li>
					) ) }
				</ul>
			</div>

			<div className="navigation-panel__footer">
				<Button variant="primary">
					{ __( 'Add Setting', 'bb_site_settings' ) }
				</Button>
			</div>
		</div>
	);
};

export default NavigationPanel;
