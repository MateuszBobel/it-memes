import { createPortal } from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function ConfirmationModal({
  open,
  closeModal,
  confirmedAction,
  content,
}) {
  const confirmedActionHandler = () => {
    confirmedAction();
  };

  return createPortal(
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to do it?
        </Typography>
        {content}
        <Button
          sx={{ margin: '5px' }}
          onClick={confirmedActionHandler}
          variant="contained"
        >
          Yes
        </Button>
        <Button sx={{ margin: '5px' }} onClick={closeModal} variant="outlined">
          No
        </Button>
      </Box>
    </Modal>,
    document.getElementById('root')
  );
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmedAction: PropTypes.func.isRequired,
  content: PropTypes.node,
};
