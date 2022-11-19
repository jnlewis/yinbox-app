import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Blockchains } from 'core/enums/blockchains';
import styles from './SelectBlockchainDialog.module.scss';

interface SelectBlockchainDialogProps {
  show: boolean;
  onCancel: () => void;
  onSelect: (token: Blockchains) => void;
}

export default function SelectBlockchainDialog({
  show,
  onCancel,
  onSelect,
}: SelectBlockchainDialogProps) {
  return (
    <Modal show={show} size="lg" onHide={onCancel} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Select a wallet to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.selection}>
          <a onClick={() => onSelect(Blockchains.NEAR)}>
            <img src="/assets/icons/near-protocol-near-logo.svg" alt="NEAR" />
            <span>NEAR</span>
            <span className={styles.muted}>Choose a wallet</span>
          </a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
