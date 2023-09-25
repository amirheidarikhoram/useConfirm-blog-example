import Button from '@mui/material/Button';
import MUIDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

export interface DialogProps {
    onConfirm?: () => void
    onCancel?: () => void
}

export interface DialogRef {
    open: () => void
    close: () => void
}

const Dialog = forwardRef<DialogRef, DialogProps>(({onConfirm, onCancel}, ref) => {
    const [open, setOpen] = useState(false);

    const onClose = useCallback(() => {
      setOpen(false)
    }, [])

    const _onCancel = useCallback(() => {
      onCancel?.()
      onClose()
    }, [onCancel, onClose])

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false)
    }))

    return <MUIDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"This action may have bad consequences, you sure?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={_onCancel}>Disagree</Button>
        <Button onClick={onConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </MUIDialog>
})

export {Dialog}