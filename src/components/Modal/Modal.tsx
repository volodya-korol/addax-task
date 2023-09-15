import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Backdrop, Box, Modal as MuiModal } from '@mui/material';

const StyledModal = styled(MuiModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 12px;
  padding: 16px 32px 24px 32px;
  background-color: white;
  box-shadow: 0px 2px 24px #383838;
  outline: none;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

type TModalProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

export const Modal = ({ children, ...modalProps }: TModalProps) => {
  return (
    <StyledModal slots={{ backdrop: StyledBackdrop }} {...modalProps}>
      <ModalBody>{children}</ModalBody>
    </StyledModal>
  );
};
