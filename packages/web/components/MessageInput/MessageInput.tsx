import React, { useEffect, useState } from 'react';
import { Navbar, Button, NavDropdown, Form } from 'react-bootstrap';
import styles from './MessageInput.module.scss';
import classnames from 'classnames';
import { BsArrowRightSquareFill } from 'react-icons/bs';

interface MessageInputDialogProps {
  recipientName: string;
  disabled: boolean;
  onSend: (message: string) => void;
}

const MessageInput = ({ recipientName, disabled, onSend }: MessageInputDialogProps) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    onSend(inputMessage);
    setInputMessage('');
  };

  const handleOnKeyUp = (event: any) => {
    if (event.code === 'Enter') {
      handleSend();
    }
  };

  const placeholder = disabled ? `This conversation is locked. Please approve to message ${recipientName}` : `Message ${recipientName}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => handleOnKeyUp(e)}
          disabled={disabled}
        />
      </div>
      <div className={styles.buttonsContainer}>
        {!disabled && (
          <a onClick={() => handleSend()} className={styles.sendButton}>
            <BsArrowRightSquareFill size={38} />
          </a>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
