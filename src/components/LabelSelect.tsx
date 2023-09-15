import { useMemo } from 'react';
import Select from 'react-select';

import { TLabelOption } from 'src/types/types';

export type TLabelSelectProps = {
  values: string[];
  options: TLabelOption[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export const LabelSelect = ({ onChange, options, values = [], placeholder }: TLabelSelectProps) => {
  const valueOptions = useMemo(() => options.filter(({ value }) => values.includes(value)), [values]);

  const onChangeHandler = (newValue: TLabelOption[]) => onChange(newValue.map(({ value }) => value));

  return (
    <Select
      isMulti
      options={options}
      value={valueOptions}
      placeholder={placeholder}
      onChange={(data) => onChangeHandler(data as TLabelOption[])}
      styles={{
        multiValue: (providedStyles, props) => ({
          ...providedStyles,
          backgroundColor: props.data.color,
          maxWidth: '150px',
        }),
        option: (providedStyles, props) => ({
          ...providedStyles,
          backgroundColor: props.data.color,
        }),
      }}
    />
  );
};
