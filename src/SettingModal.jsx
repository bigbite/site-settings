import { useState } from "@wordpress/element";
import { Button, Modal } from "@wordpress/components";

const SettingModal = ({
	buttonText,
	modalTitle,
	children,
	handleSubmit,
	handleCancel = () => {},
}) => {
	const [isOpen, setOpen] = useState(false);

	const closeModal = () => setOpen(false);

	const openModal = () => setOpen(true);

	return (
		<>
			<Button icon={buttonText} variant="primary" onClick={openModal} />

			{isOpen && (
				<Modal title={modalTitle} onRequestClose={closeModal}>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleSubmit();
							closeModal();
						}}
					>
						{children}
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "30px",
							}}
						>
							<Button
								variant="secondary"
								onClick={() => {
									handleCancel();
									closeModal();
								}}
							>
								Cancel
							</Button>
							<Button type="submit" variant="primary">
								{buttonText}
							</Button>
						</div>
					</form>
				</Modal>
			)}
		</>
	);
};

export default SettingModal;
