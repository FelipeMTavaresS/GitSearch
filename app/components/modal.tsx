import React from 'react';
import {
  ModalOverlay,
  ModalCard,
  ModalMessageText,
  ModalButton,
  ModalButtonText
} from '../styled';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, message }) => {
  if (!visible) return null;

  return (
    <ModalOverlay accessibilityRole="alert">
      <ModalCard>
        <ModalMessageText>{message}</ModalMessageText>
        <ModalButton
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Fechar mensagem"
        >
          <ModalButtonText>Fechar</ModalButtonText>
        </ModalButton>
      </ModalCard>
    </ModalOverlay>
  );
};

export default Modal;