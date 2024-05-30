import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

const AddSettings = () => {
	const [isOpen, setOpen] = useState(false);
	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	return (
		<>
			<Button variant="secondary" onClick={openModal}>
				Add Setting
			</Button>
			{isOpen && (
				<Modal title="This is my modal" onRequestClose={closeModal}>
					<Button variant="secondary" onClick={closeModal}>
						My custom close button
					</Button>
				</Modal>
			)}
		</>
	);
};

export default AddSettings;
