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
			<Button
				icon="trash"
				variant="secondary"
				isDestructive
				onClick={openModal}
				style={{ marginRight: "10px" }}
			/>
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
