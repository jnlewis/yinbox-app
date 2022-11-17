import React from 'react';
import styles from './CardMessage.module.scss';
import classnames from 'classnames';

interface CardMessageProps {
  sender: string;
  message: string;
  align: 'left' | 'right';
}

const CardMessage = ({ sender, message, align }: CardMessageProps) => {
  
  return (
    <div className={classnames(align === 'left' ? styles.messageItemLeft : styles.messageItemRight)}>
      <div className={classnames("shadow p-3 mb-3 bg-white", styles.messageItem)}>
        <div className={styles.userName}><b>{sender}</b></div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default CardMessage;
