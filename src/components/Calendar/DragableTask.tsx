import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';

import { useAppSelector } from 'src/hooks';
import { updateTask } from 'src/store';
import { TTask } from 'src/types/types';
import { Label } from '..';
import { TaskModal } from '../Modal';

const Task = styled(Box)`
  border: 1px solid black;
  height: min-content;
  padding: 8px;
`;

const Name = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
`;

type TDragableTaskProps = {
  task: TTask;
  date: string;
  index: number;
};

export const DragableTask = ({ task, index, date }: TDragableTaskProps) => {
  const dispatch = useDispatch();
  const { labels } = useAppSelector(({ calendar }) => calendar);

  const [open, setOpen] = useState(false);

  const onUpdateClick = (task: TTask) => dispatch(updateTask({ date, task }));

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(draggableProvider) => (
          <Task
            ref={draggableProvider.innerRef}
            {...draggableProvider.draggableProps}
            {...draggableProvider.dragHandleProps}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Name>{task.name}</Name> <StyledEditIcon onClick={() => setOpen(true)} />
            </Box>

            <Box mt="5px">
              {task.labelIds.map((id) => {
                const { color, name } = labels[id] || {};

                return <Label key={id} size="small" label={name} bgcolor={color} />;
              })}
            </Box>
          </Task>
        )}
      </Draggable>

      <TaskModal open={open} task={task} handleClose={() => setOpen(false)} onUpdate={onUpdateClick} labels={labels} />
    </>
  );
};
