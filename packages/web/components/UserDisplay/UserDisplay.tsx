import React from 'react';
import styles from './UserDisplay.module.scss';
import seedColor from 'seed-color';
import classnames from 'classnames';

interface UserDisplayProps {
  name: string;
  selected: boolean;
}

const UserDisplay = ({ name, selected }: UserDisplayProps) => {
  
  const abbrev = name.slice(0,1).toUpperCase();

  return (
    <div className={classnames(styles.wrapper, selected && styles.userSelected)}>
      <span className={styles.userDisplay} style={{ backgroundColor: seedColor(name).toHex() }}>{abbrev}</span>
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default UserDisplay;
