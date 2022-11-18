import React from 'react';
import styles from './MessageHeader.module.scss';
import classnames from 'classnames';
import seedColor from 'seed-color';

interface MessageHeaderProps {
  name: string;
  isSelf: boolean;
  onPrimaryClick: () => void;
}

const MessageHeader = ({
  name,
  isSelf,
  onPrimaryClick,
}: MessageHeaderProps) => {
  
  const abbrev = name.slice(0,1).toUpperCase();

  name = isSelf ? `${name} (You)` : name;

  return (
    <div className={styles.wrapper}>
      {/* <a onClick={() => onPrimaryClick()}>
        <div className="icon-burger">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </a> */}
      <div>
        <span className={styles.userDisplay} style={{ backgroundColor: seedColor(name).toHex() }}>{abbrev}</span>
        <span className={styles.username}>{name}</span>
      </div>
      <div className={styles.buttonsContainer}>
      </div>
    </div>
  );
};

export default MessageHeader;
