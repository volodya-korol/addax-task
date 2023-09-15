import { useEffect, useState } from 'react';
import { TwitterPicker } from 'react-color';
import styled from '@emotion/styled';
import { Box, Button, Input, Typography } from '@mui/material';

import { TLabel, TLabelOption } from 'src/types/types';
import { Modal } from '..';

const ColorBlock = styled(Box)`
  width: 40px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
`;

const DEFAULT_COLOR = '#0693E3';

type TTaskModalProps = {
  open: boolean;
  label: TLabelOption | null;
  onCreate?: (newLabel: TLabel) => void;
  onUpdate?: (updatedLabel: TLabelOption) => void;
  handleClose: () => void;
};

export const LabelModal = ({ onCreate, onUpdate, open, label, handleClose }: TTaskModalProps) => {
  const [name, setName] = useState(label?.label || '');
  const [color, setColor] = useState(label?.color || DEFAULT_COLOR);

  const isUpdate = !!label;
  const isNameValid = name.trim() !== '';

  useEffect(() => {
    if (label) {
      setName(label?.label);
      setColor(label?.color);
    }
  }, [label]);

  const onCreateClick = () => {
    onCreate?.({ name, color });
    setName('');
    setColor(DEFAULT_COLOR);
    handleClose();
  };

  const onUpdateClick = () => {
    if (label) {
      onUpdate?.({ ...label, label: name, color });
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box display="grid" gap="20px">
        <Typography variant="h6">{isUpdate ? 'Update label' : 'Create label'}</Typography>
        <Box display="flex" gap="20px">
          <ColorBlock bgcolor={color} />
          <Input placeholder="label name" value={name} onChange={(event) => setName(event.target.value)} />
        </Box>
        <TwitterPicker color={color} onChangeComplete={({ hex }) => setColor(hex)} />
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          {!isUpdate ? (
            <Button variant="contained" onClick={onCreateClick} disabled={!isNameValid}>
              Create label
            </Button>
          ) : (
            <Button variant="contained" onClick={onUpdateClick} disabled={!isNameValid}>
              Update label
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
