import dayjs from 'dayjs';
import { DropResult } from 'react-beautiful-dnd';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { uniqueId } from 'src/helpers';
import { THolidays, TJsonCalendar, TLabel, TLabels, TTask, TTasks } from 'src/types';

type TInitialState = {
  selectYear: number;
  selectMonth: number;
  filterTasksName: string;
  filterLabels: string[];
  tasks: TTasks;
  labels: TLabels;
  holidays: THolidays;
};

const TODAY = dayjs();

const initialState: TInitialState = {
  selectYear: TODAY.get('year'),
  selectMonth: TODAY.get('month') + 1,
  filterTasksName: '',
  filterLabels: [],
  tasks: {},
  labels: {},
  holidays: {},
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setHolidays: (state, action: PayloadAction<THolidays>) => {
      state.holidays = action.payload;
    },

    uploadCalendar: (state, action: PayloadAction<TJsonCalendar>) => {
      const { labels, tasks } = action.payload;

      state.labels = labels;
      state.tasks = tasks;
    },

    createNewLabel: (state, action: PayloadAction<{ newLabel: TLabel }>) => {
      const { newLabel } = action.payload;

      state.labels[uniqueId()] = newLabel;
    },
    updateLabel: (state, action: PayloadAction<{ id: string; label: Partial<TLabel> }>) => {
      const { id, label } = action.payload;

      state.labels[id] = { ...state.labels[id], ...label };
    },

    dragTasks: (state, action: PayloadAction<DropResult>) => {
      const { destination, source } = action.payload;

      if (destination) {
        if (destination?.droppableId === source.droppableId) {
          const curentTasks = state.tasks[destination?.droppableId];

          [curentTasks[destination.index], curentTasks[source.index]] = [
            curentTasks[source.index],
            curentTasks[destination.index],
          ];
        } else {
          const removedTask = state.tasks[source?.droppableId]?.splice(source.index, 1);
          state.tasks[destination?.droppableId]?.splice(destination?.index, 0, removedTask[0]);
        }
      }
    },

    setTasks: (state, action: PayloadAction<{ tasks: TTasks }>) => {
      const { tasks } = action.payload;

      state.tasks = tasks;
    },
    createNewTask: (state, action: PayloadAction<{ date: string; newTask: TTask }>) => {
      const { date, newTask } = action.payload;

      state.tasks[date] = [newTask, ...(state.tasks[date] || [])];
    },
    updateTask: (state, action: PayloadAction<{ date: string; task: Partial<TTask> }>) => {
      const { date, task } = action.payload;
      const updIndex = state.tasks[date].findIndex(({ id }) => id == task.id);

      state.tasks[date][updIndex] = { ...state.tasks[date][updIndex], ...task };
    },

    nextMounth: (state) => {
      state.selectMonth += 1;

      if (state.selectMonth + 1 > 12) {
        state.selectMonth = 1;
        state.selectYear += 1;
      }
    },
    prevMounth: (state) => {
      state.selectMonth -= 1;

      if (state.selectMonth + 1 > 12) {
        state.selectMonth = 12;
        state.selectYear -= 1;
      }
    },
  },
});

export const {
  nextMounth,
  prevMounth,
  uploadCalendar,
  createNewTask,
  updateTask,
  setTasks,
  dragTasks,
  createNewLabel,
  updateLabel,
  setHolidays,
} = calendarSlice.actions;

export default calendarSlice.reducer;
