import { useState } from 'react';
import { Box, Button, Input, Typography } from '@mui/material';

import { uniqueId } from 'src/helpers';
import { TLabel, TTask } from 'src/types/types';
import { Modal } from '..';
import { LabelSelect } from '../LabelSelect';

type TTaskModalProps = {
  open: boolean;
  task?: TTask;
  labels: Record<string, TLabel>;
  onCreate?: (task: TTask) => void;
  onUpdate?: (task: TTask) => void;
  handleClose: () => void;
};

export const TaskModal = ({ onCreate, onUpdate, open, task, handleClose, labels }: TTaskModalProps) => {
  const [name, setName] = useState(task?.name || '');
  const [selectLabels, setSelectLabels] = useState(task?.labelIds || []);

  const isUpdate = !!task;
  const isNameValid = name.trim() !== '';
  const labelsOptions = Object.entries(labels).map(([labelId, label]) => ({
    ...label,
    value: labelId,
    label: label.name,
  }));

  const onCreateClick = () => {
    onCreate?.({ name: name, labelIds: selectLabels, id: uniqueId() });
    setName('');
    setSelectLabels([]);
    handleClose();
  };

  const onEditClick = () => {
    if (task) {
      onUpdate?.({ ...task, name, labelIds: selectLabels });
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box display="grid" gap="20px">
        <Typography variant="h6">{isUpdate ? 'Update task' : 'Create task'}</Typography>
        <Input placeholder="task name" value={name} onChange={(event) => setName(event.target.value)} />

        <Box>
          <Typography fontSize="14px">Labels:</Typography>
          <LabelSelect values={selectLabels} options={labelsOptions} onChange={setSelectLabels} />
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          {!isUpdate ? (
            <Button disabled={!isNameValid} variant="contained" onClick={onCreateClick}>
              Create task
            </Button>
          ) : (
            <Button disabled={!isNameValid} variant="contained" onClick={onEditClick}>
              Update task
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
