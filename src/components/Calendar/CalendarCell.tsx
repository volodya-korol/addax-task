import dayjs from 'dayjs';
import { intersection } from 'lodash';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';

import { useAppSelector } from 'src/hooks';
import { createNewTask } from 'src/store';
import { TTask } from 'src/types/types';
import { TaskModal } from '../Modal/TaskModal';
import { DragableTask } from './DragableTask';

const Cell = styled(Box)<{ disabled: boolean }>`
  min-height: 100px;
  border: 1px solid gray;
  padding: 5px;

  ${({ disabled }) => disabled && 'filter: grayscale(); opacity: 0.6; pointer-events: none;'}
`;

const AddIconStyled = styled(AddIcon)`
  cursor: pointer;
  margin-left: auto;
  margin-right: 0;
`;

const TasksWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 100px;
  background-color: gainsboro;
`;

type TCalendarCellProps = {
  date: string;
  filterLabels: string[];
  filterName: string;
};

export const CalendarCell = ({ date, filterLabels, filterName }: TCalendarCellProps) => {
  const dispatch = useDispatch();
  const { selectMonth, labels, tasks, holidays } = useAppSelector(({ calendar }) => calendar);

  const [open, setOpen] = useState(false);

  const currentDay = dayjs(date);
  const currentTasks = tasks[date] || [];
  const currentHolidays = holidays[date] || [];
  const isDayInSelectMounth = currentDay.get('M') + 1 === selectMonth;

  const onCreate = (newTask: TTask) => dispatch(createNewTask({ date, newTask }));

  return (
    <Box>
      <Cell disabled={!isDayInSelectMounth}>
        <Box display="flex" alignItems="center">
          <Typography fontSize="14px">{currentDay.format('MMM-D')}</Typography>

          <AddIconStyled onClick={() => setOpen(true)} />
        </Box>

        <Droppable droppableId={date} isDropDisabled={!isDayInSelectMounth}>
          {(droppableProvider) => (
            <TasksWrapper ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>
              {currentTasks.map((task, index) => {
                const isIncludeFilterName = task.name.includes(filterName);
                const isIncludeFilterLabels = !filterLabels.length || intersection(task.labelIds, filterLabels).length;

                if (!isIncludeFilterName || !isIncludeFilterLabels) return null;

                return <DragableTask key={task.id} task={task} index={index} date={date} />;
              })}

              {droppableProvider.placeholder}
            </TasksWrapper>
          )}
        </Droppable>

        <Box>
          {currentHolidays?.map(({ name, localName, date }) => (
            <Box key={date + name} mt="5px" border="1px solid yellow" textAlign="center">
              {localName}
            </Box>
          ))}
        </Box>
      </Cell>

      <TaskModal open={open} handleClose={() => setOpen(false)} onCreate={onCreate} labels={labels} />
    </Box>
  );
};
