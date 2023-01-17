import clsx from 'clsx';
import { Modal } from 'flowbite-react';
import React from 'react';

import Button from '../Button';

type CustomModalProps = {
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	isOpen: boolean;
	onSuccessFn?: () => void;
	bodyClassName?: string;
};

export const CustomModal = (props: CustomModalProps) => {
	const { onClose, title, children, isOpen = false, onSuccessFn, bodyClassName } = props;

	return (
		<Modal show={isOpen} onClose={onClose}>
			{title ? <Modal.Header>{title}</Modal.Header> : <Modal.Header />}
			<Modal.Body className={clsx([bodyClassName, 'overflow-y-auto max-h-[80vh]'])}>{children}</Modal.Body>
			{onSuccessFn ? (
				<Modal.Footer className="justify-end">
					<Button
						size="md"
						variant="primary"
						type="button"
						onClick={() => {
							onSuccessFn();
						}}
					>
						Submit
					</Button>

					<Button color="gray" onClick={onClose} size="md" variant="inverse" type="button">
						Close
					</Button>
				</Modal.Footer>
			) : null}
		</Modal>
	);
};
