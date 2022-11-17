import React from 'react';
import styles from './CardInvite.module.scss';
import classnames from 'classnames';

interface CardInviteProps {
  sender: string;
  message: string;
  onInviteClick?: () => void;
}

const CardInvite = ({ sender, message, onInviteClick }: CardInviteProps) => {

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
            <a onClick={() => onInviteClick && onInviteClick()}>Invite to Yinbox</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardInvite;
