import React, {FC, useEffect, useState} from 'react';
import classes from './MyModal.module.css';

interface ModalProps extends React.HTMLProps<'HTMLDivElement'>{
    headerText: string;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const MyModal:FC<ModalProps> = ({showModal, headerText, setShowModal, ...props}) => {

    const [prevTitle, setPrevTitle] = useState<string>('')

    useEffect(() => {

        if(showModal) {
            setPrevTitle(document.title);
            document.title = headerText;
        }
        else {
            document.title = prevTitle;
            setPrevTitle('');
        }
        // eslint-disable-next-line
    }, [showModal])

    return (
        <>{showModal &&
            <div
                className={classes.bg}
                onClick={()=>setShowModal(false)}
            >
                <div onClick={e => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        }
        </>
    );
};

export default MyModal;