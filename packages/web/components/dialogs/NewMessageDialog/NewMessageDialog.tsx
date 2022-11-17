import React, { useState } from 'react';
import styles from './NewMessageDialog.module.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import { createChat } from 'services/web/chatService';
import { getLocalWalletAddress } from 'modules/wallet/wallet';

interface NewMessageDialogProps {
  show: boolean;
  onCancel: () => void;
  onStartedConversation: (accountId: string) => void;
}

export default function NewMessageDialog({
  show,
  onCancel,
  onStartedConversation,
}: NewMessageDialogProps) {

  const [messageDialogTitle, setMessageDialogTitle] = useState('');
  const [messageDialogDescription, setMessageDialogDescription] = useState('');
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [inputAccountId, setInputAccountId] = useState('jeffreylewis-bob.testnet'); // TODO:

  const showMessage = (title: string, message: string) => {
    setMessageDialogTitle(title);
    setMessageDialogDescription(message);
    setShowMessageDialog(true);
  };

  const handleStartConversation = async () => {
    const walletAddress = getLocalWalletAddress();
    if (!walletAddress) {
      showMessage('Connect Wallet', 'Please connect your wallet.');
      return;
    }

    if (!inputAccountId) {
      showMessage('Enter account ID', 'Please enter the account ID of the person you would like to chat with.');
      return;
    }

    setIsLoading(true);
    
    await createChat({
      owner: walletAddress,
      participant: inputAccountId,
    });
    
    setIsLoading(false);

    onStartedConversation(inputAccountId);
  };

  return (
    <Modal
      show={show}
      size="lg"
      onHide={onCancel}
      backdrop="static"
      centered={true}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Start a new conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.tokensContainer}>
          <Form className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>NEAR Account ID</Form.Label>
              <Form.Control
                type="input"
                placeholder="name.testnet"
                value={inputAccountId}
                onChange={(e) => setInputAccountId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        {!isLoading && (
          <Button variant="primary" onClick={() => handleStartConversation()}>
            Start Conversation
          </Button>
        )}
        {isLoading && (
          <Button variant="primary" disabled>
            Starting...
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
