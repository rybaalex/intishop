import {Dialog} from '@mui/material';
import {FC} from "react";

interface IModal {
    isShow: boolean
    onClose?: () => void;
}

const ModalContainer: FC<IModal> = ({onClose, isShow}) => {
    return (
        <Dialog
            open={isShow}
            onClose={onClose}
        >
            111
        </Dialog>
    )
}

export {ModalContainer}