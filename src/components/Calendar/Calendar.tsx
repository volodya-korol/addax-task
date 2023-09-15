import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Typography } from '@mui/material';

import { getMonthDaysWithWeeks } from 'src/helpers';
import { useAppSelector, useGetPublicHolidays } from 'src/hooks';
import { dragTasks, nextMounth, prevMounth } from 'src/store';
import { CalendarCell } from './CalendarCell';
import { ToolBar } from './ToolBar';

const CalendarWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
`;

const ArrowWrapper = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CalendarGrid = styled(Box)`
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(7, 150px);
`;

export const Calendar = () => {
  useGetPublicHolidays();
  const dispatch = useDispatch();
  const { selectMonth, selectYear } = useAppSelector(({ calendar }) => calendar);

  const [filterName, setFilterName] = useState('');
  const [filterLabels, setFilterLabels] = useState<string[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);

  const selectDate = dayjs(new Date(selectYear, selectMonth - 1));
  const curentMounthDays = getMonthDaysWithWeeks(selectYear, selectMonth);
  const weekDays = curentMounthDays.slice(0, 7).map((day) => dayjs(day).format('ddd'));

  const onNextMounthClick = () => dispatch(nextMounth());

  const onPrevMounthClick = () => dispatch(prevMounth());

  return (
    <Box>
      <ToolBar
        filterName={filterName}
        selectDate={selectDate}
        changeFilterName={setFilterName}
        calendarRef={calendarRef}
        changeFilterLabels={setFilterLabels}
        filterLabels={filterLabels}
      />

      <CalendarWrapper ref={calendarRef}>
        <Box display="flex" justifyContent="center" gap="20px">
          <ArrowWrapper onClick={onPrevMounthClick}>
            <ArrowBackIcon />
          </ArrowWrapper>
          <Typography variant="h5">{selectDate.format('MMMM YYYY')}</Typography>
          <ArrowWrapper onClick={onNextMounthClick}>
            <ArrowForwardIcon />
          </ArrowWrapper>
        </Box>

        <CalendarGrid py="10px">
          {weekDays.map((day) => (
            <Box display="flex" justifyContent="center" key={day}>
              {day}
            </Box>
          ))}
        </CalendarGrid>

        <DragDropContext onDragEnd={(res) => dispatch(dragTasks(res))}>
          <CalendarGrid>
            {curentMounthDays.map((day) => (
              <CalendarCell key={day} date={day} filterName={filterName} filterLabels={filterLabels} />
            ))}
          </CalendarGrid>
        </DragDropContext>
      </CalendarWrapper>
    </Box>
  );
};
