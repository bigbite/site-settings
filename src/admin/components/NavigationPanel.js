import { Button, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { getNavigationCategoriesOptions } from '../schema';
import { chevronRightSmall } from '@wordpress/icons';

const NavigationPanel = ( { activeCategory, setActiveCategory } ) => {
	const categories = getNavigationCategoriesOptions();

	return (
		<div className="navigation-panel">
			<div className="navigation-panel__body">
				<h2>{ __( 'Site Settings', 'bb_site_settings' ) }</h2>
				<p>
					{ __(
						'A place to enter settings that you could use in the editor and throughout your site',
						'bb_site_settings'
					) }
				</p>
				<ul
					aria-label={ __(
						'Navigation Categories',
						'bb_site_settings'
					) }
				>
					{ categories.map( ( { id, label, icon } ) => (
						<li key={ id }>
							<Button
								aria-selected={
									activeCategory.toLowerCase() === id
								}
								onClick={ () => setActiveCategory( label ) }
								variant={
									activeCategory.toLowerCase() === id
										? 'primary'
										: 'tertiary'
								}
								label={ `${ label } ${ __(
									'Settings',
									'bb_site_settings'
								) }` }
							>
								<span className="navigation-panel__button-label">
									<Icon icon={ icon } />
									{ label }
								</span>
								<Icon icon={ chevronRightSmall } />
							</Button>
						</li>
					) ) }
				</ul>
			</div>
		</div>
	);
};

export default NavigationPanel;
