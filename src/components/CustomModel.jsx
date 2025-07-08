import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const ModalBox = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: '#adadff',
  transition: 'transform 0.3s ease-in-out',
  padding: '40px',
  borderRadius: '8px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
}));

const CloseButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  minWidth: 'unset',
  padding: '6px',
}));

const ButtonGroup = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
}));

const CustomModal = ({ open, onClose, message, onYes, onNo }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <Typography variant="h6" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
          {message}
        </Typography>
        <ButtonGroup>
          <Button variant="contained" color="success" onClick={onYes}>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={onNo}>
            No
          </Button>
        </ButtonGroup>
      </ModalBox>
    </Modal>
  );
};

export default CustomModal;