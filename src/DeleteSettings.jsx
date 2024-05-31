import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useSettings } from "./Context";

const DeleteSettings = () => {
	const { settings, deleteSettings } = useSettings();
	const [isOpen, setOpen] = useState(false);

	const closeModal = () => setOpen(false);

	const openModal = () => setOpen(true);

	return settings.length ? (
		<>
			<Button variant="secondary" isDestructive onClick={openModal}>
				Delete all
			</Button>
			{isOpen && (
				<Modal title="Are you sure?" onRequestClose={closeModal}>
					<Button variant="primary" isDestructive onClick={deleteSettings}>
						Delete all
					</Button>
				</Modal>
			)}
		</>
	) : null;
};

export default DeleteSettings;
