import { groupBy } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setHolidays } from 'src/store';
import { THoliday, THolidays } from 'src/types';
import { useAppSelector } from '.';

export const useGetPublicHolidays = () => {
  const dispatch = useDispatch();
  const [publicHolidays, setPublicHolidays] = useState<THolidays>();
  const { selectYear } = useAppSelector(({ calendar }) => calendar);

  useEffect(() => {
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${selectYear}/ua`)
      .then((response) => response.json())
      .then((data) => {
        const holidays = groupBy<THoliday>(data, 'date');

        setPublicHolidays(holidays);
        dispatch(setHolidays(holidays));
      });
  }, [selectYear]);

  return publicHolidays;
};
