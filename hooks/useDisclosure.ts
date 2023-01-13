import { useCallback, useState } from 'react';

const useDisclosure = () => {
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return {
		isOpen,
		close,
		open,
	} as const;
};

export default useDisclosure;
