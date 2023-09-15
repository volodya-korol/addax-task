import { Chip, ChipProps } from '@mui/material';

type TLabelProps = ChipProps & {
  bgcolor?: string;
};

export const Label = ({ bgcolor, ...props }: TLabelProps) => {
  return (
    <>
      <Chip {...props} sx={{ bgcolor, ...props.sx }} />
    </>
  );
};
