import React from 'react';
import styles from './CardNotice.module.scss';
import classnames from 'classnames';

interface CardNoticeProps {
  message: string;
}

const CardNotice = ({ message }: CardNoticeProps) => {
  
  return (
    <div className={styles.wrapper}>
      <div className={classnames("shadow p-3 mb-3", styles.messageItem)}>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default CardNotice;
