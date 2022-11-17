import React from 'react';
import styles from './CardApproval.module.scss';
import classnames from 'classnames';

interface CardApprovalProps {
  sender: string;
  message: string;
  onApproveClick: () => void;
}

const CardApproval = ({ sender, message, onApproveClick }: CardApprovalProps) => {

  return (
    <div
      className={styles.messageItemLeft}
    >
      <div className={classnames('shadow p-3 mb-3 bg-white', styles.messageItem)}>
        <div className={styles.userName}>
          <b>{sender}</b>
        </div>
        <div>{message}</div>
        <div className={styles.tagsWrapper}>
          <span className={styles.tagsItem}>
            <a onClick={() => onApproveClick()}>Approve Conversation</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardApproval;
