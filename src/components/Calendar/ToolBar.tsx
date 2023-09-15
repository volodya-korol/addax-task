import dayjs, { Dayjs } from 'dayjs';
import { toPng } from 'html-to-image';
import { pickBy } from 'lodash';
import { RefObject, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';

import { download } from 'src/helpers';
import { useAppSelector } from 'src/hooks';
import { createNewLabel, updateLabel, uploadCalendar } from 'src/store';
import { TJsonCalendar, TLabel, TLabelOption } from 'src/types/types';
import { Label } from '..';
import { LabelSelect } from '../LabelSelect';
import { LabelModal } from '../Modal/LabelModal';

type TToolBarProps = {
  selectDate: Dayjs;
  calendarRef: RefObject<HTMLDivElement>;
  filterLabels: string[];
  changeFilterLabels: (labels: string[]) => void;
  filterName: string;
  changeFilterName: (name: string) => void;
};

export const ToolBar = ({
  calendarRef,
  selectDate,
  changeFilterLabels,
  filterLabels,
  filterName,
  changeFilterName,
}: TToolBarProps) => {
  const dispatch = useDispatch();
  const { labels, tasks } = useAppSelector(({ calendar }) => calendar);

  const [open, setOpen] = useState(false);

  const [activeEditLabel, setActiveEditLabel] = useState<TLabelOption | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const labelOptions: TLabelOption[] = Object.entries(labels).map(([labelId, label]) => ({
    value: labelId,
    label: label.name,
    color: label.color,
  }));

  const onDownloadImageClick = () => {
    if (calendarRef.current)
      toPng(calendarRef.current, { cacheBust: true }).then((dataStr) =>
        download(dataStr, `${dayjs().format('YYYY-MM-DD')}.png`),
      );
  };

  const onExportJsonClick = () => {
    const startDateFormat = selectDate.format('YYYY-MM');
    const filteredTasks = pickBy(tasks, (_value, date) => date.startsWith(startDateFormat));

    const downloadJson: TJsonCalendar = { tasks: filteredTasks, labels };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(downloadJson));

    download(dataStr, `${selectDate.format('YYYY-MM')}-tasks.json`);
  };

  const onImportJson = () => {
    if (!fileInput.current?.files) return null;

    const fileReader = new FileReader();
    fileReader.readAsText(fileInput.current.files[0], 'UTF-8');

    fileReader.onload = (e) => {
      if (typeof e?.target?.result !== 'string') return null;

      dispatch(uploadCalendar(JSON.parse(e?.target?.result)));
    };
  };

  const openLabelModal = (label?: TLabelOption) => {
    if (label) {
      setActiveEditLabel(label);
    } else {
      setActiveEditLabel(null);
    }

    setOpen(true);
  };

  const onCreateLabel = (newLabel: TLabel) => dispatch(createNewLabel({ newLabel }));

  const onUpdateLabel = ({ value, label, ...rest }: TLabelOption) =>
    dispatch(updateLabel({ id: value, label: { ...rest, name: label } }));

  return (
    <>
      <Box display="flex" alignItems="flex-start" gap="20px">
        <Button size="small" variant="outlined" onClick={onDownloadImageClick}>
          Download image
        </Button>

        <Button size="small" variant="outlined" onClick={onExportJsonClick}>
          Export json
        </Button>

        <Box>
          <Button size="small" variant="outlined" onClick={() => fileInput?.current?.click()}>
            Upload
          </Button>

          <input
            ref={fileInput}
            onChange={onImportJson}
            accept="application/json"
            type="file"
            id="json-file-input"
            hidden
          />
        </Box>

        <TextField
          size="small"
          variant="filled"
          label="Name filter"
          value={filterName}
          onChange={(event) => changeFilterName(event.target.value)}
        />

        <Box display="flex" alignItems="center" gap="20px">
          <LabelSelect
            placeholder="labels filter"
            options={labelOptions}
            onChange={changeFilterLabels}
            values={filterLabels}
          />
          <AddIcon onClick={() => openLabelModal()} />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography>Labels {labelOptions.length}: </Typography>
        </Box>

        <Box display="flex" gap="15px" flexWrap="wrap">
          {labelOptions.map((option) => (
            <Label
              key={option.value}
              label={option.label}
              bgcolor={option.color}
              onClick={() => openLabelModal(option)}
            />
          ))}
        </Box>
      </Box>

      <LabelModal
        open={open}
        label={activeEditLabel}
        handleClose={() => setOpen(false)}
        onCreate={onCreateLabel}
        onUpdate={onUpdateLabel}
      />
    </>
  );
};
