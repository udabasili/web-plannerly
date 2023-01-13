import { Dialog } from '@headlessui/react';
import React from 'react';

import useDisclosure from '@/hooks/useDisclosure';

type DrawerProps = {
	isOpen: boolean;
	close: () => void;
	renderFooter: React.ReactElement;
	children: React.ReactNode;
};

export const Drawer = (props: DrawerProps) => {
	const { close, isOpen, children, renderFooter } = props;
	return (
		<Dialog onClose={close} open={isOpen} unmount={false} className="relative z-50">
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="w-full max-w-sm rounded bg-white">
					<Dialog.Title></Dialog.Title>
					<Dialog.Description>{children}</Dialog.Description>
				</Dialog.Panel>
				{renderFooter}
			</div>
		</Dialog>
	);
};
