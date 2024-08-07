import { NoticeList } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

function SettingsNotice() {
	const notices = useSelect(
		( select ) => select( noticesStore ).getNotices(),
		[]
	);

	const errorNotices = notices.filter(
		( { type } ) => type === 'errorNotice'
	);

	const { removeNotice } = useDispatch( noticesStore );

	return (
		<NoticeList
			className="settings-notice"
			onRemove={ removeNotice }
			notices={ errorNotices }
		/>
	);
}

export default SettingsNotice;
