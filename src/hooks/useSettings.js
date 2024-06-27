import { useContext } from '@wordpress/element';

import { SiteSettingsContext } from '../context';

export const useSettings = () => useContext(SiteSettingsContext);
