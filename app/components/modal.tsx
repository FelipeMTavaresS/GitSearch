import React from 'react';
import { Platform } from 'react-native';
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
    <ModalOverlay {...(Platform.OS === 'web' ? { role: 'alert', 'aria-live': 'assertive' } : { accessibilityRole: 'alert' })}>
      <ModalCard>
        <ModalMessageText>{message}</ModalMessageText>
        <ModalButton
          onPress={onClose}
          {...(Platform.OS === 'web' ? { role: 'button', 'aria-label': 'Fechar mensagem' } : { accessibilityRole: 'button', accessibilityLabel: 'Fechar mensagem' })}
        >
          <ModalButtonText>Fechar</ModalButtonText>
        </ModalButton>
      </ModalCard>
    </ModalOverlay>
  );
};

export default Modal;