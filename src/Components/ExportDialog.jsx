import { React, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import { FileCopyOutlined } from '@material-ui/icons';

export const ExportDialog = (props) => {
    const {
        code,
        openExportDialog,
        setOpenExportDialog
    } = props
    
    const codeText = useRef(null)

    const handleClose = () => {
        setOpenExportDialog(false)
    };

    const handleCopyClick = () => {
        // codeText.current
        // document.execCommand('copy')
        // alert('Code is copied to clipboard')
    }

    return (
        <div>
            <Dialog
                open={openExportDialog}
                onClose={handleClose}
            >
                <DialogTitle>{'Exported Deck Code'}</DialogTitle>
                <DialogContent>
                    <DialogContentText ref={codeText}>
                        {`${code}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={()=>{handleCopyClick()}}>
                        <FileCopyOutlined></FileCopyOutlined>
                    </IconButton>
                    <Button onClick={handleClose} color="primary" autofocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}