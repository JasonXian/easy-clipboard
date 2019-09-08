import * as React from 'react';
import { Component } from 'react';
import './Modal.css';

interface IModalProps {
    label: string,
    title: string,
    confirmText: string,
    onConfirm: () => void,
    onExit: () => void,
}

class Modal extends Component <IModalProps> {

    constructor (props: IModalProps) {
        super(props);
    }

    render (){
        return(
            <div className='modal' role='dialog'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{this.props.title}</h5>
                        </div>
                        <div className='modal-body'>
                            <p>{this.props.label}</p>
                        </div>
                        <div className='modal-footer'>
                            <button 
                                type='button'
                                className='btn btn-close'
                                onClick={event => this.props.onExit()}
                            >
                                Close
                            </button>
                            <button 
                                type='button'
                                className='btn btn-confirm'
                                onClick={event => this.props.onConfirm()}
                            >
                                {this.props.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
