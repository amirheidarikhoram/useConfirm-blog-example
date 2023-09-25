import { useCallback, useEffect, useRef } from 'react';
import { DialogRef, DialogProps, Dialog } from 'src/components';
import ReactDOM from 'react-dom/client';
import { v4 as uuid4 } from 'uuid';

function useConfirm(props?: DialogProps) {
	const dialogRef = useRef<DialogRef | null>(null);

	useEffect(() => {
		const rootElement = document.createElement('div');
		rootElement.id = uuid4();
		const root = ReactDOM.createRoot(rootElement);

		root.render(
				<Dialog
					ref={dialogRef}
					{...props}
				/>
		);

		return () => {
			root.unmount();
			rootElement.parentNode?.removeChild(rootElement);
		};
	}, [props]);

	const ask = useCallback(() => dialogRef.current?.open(), []);
	const close = useCallback(() => dialogRef.current?.close(), [])
	return { ask, close };
}

export { useConfirm };
