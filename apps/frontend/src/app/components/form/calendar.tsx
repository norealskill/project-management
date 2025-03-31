import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { FormFieldProps } from './common/formFieldProps';
import { generateCalendarDays, joinClasses } from '../common/utilityFunctions';
import { useEffect, useState } from 'react';
import Button from './button';
import { yearMonth } from '../common/utilityFunctions';

export type CalendarDay = {
  date: Date;
  isCurrentMonth?: boolean | false;
  isToday?: boolean | false;
  isSelected?: boolean | false;
};

const Calendar: React.FC<FormFieldProps> = (props) => {
  const { label, field } = props;

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  useEffect(() => {
    const days = generateCalendarDays(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate
    );
    setCalendarDays(days);
    field.handleChange(
      new Date(selectedDate.setHours(0, 0, 0, 0)).toISOString()
    );
  }, [selectedDate, field]);

  return (
    <>
      <div>{label}</div>
      <div className="flex justify-center">
        <div className="w-2/3 mt-2">
          <div className="flex justify-between items-center">
            <span>
              <h2 className="flex-auto text-sm font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', yearMonth)}
              </h2>
            </span>
            <span className="flex">
              <Button
                label="previous"
                icon={<ChevronLeftIcon className="size-5" aria-hidden="true" />}
                cssClasses="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={() =>
                  setSelectedDate(
                    new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
                  )
                }
              />
              <Button
                label="Next month"
                icon={
                  <ChevronRightIcon className="size-5" aria-hidden="true" />
                }
                cssClasses="-my-1.5 -mr-2.5 flex flex-none items-center justify-center  text-gray-400 hover:text-gray-500"
                onClick={() =>
                  setSelectedDate(
                    new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
                  )
                }
              />
            </span>
          </div>
          <div className="mt-5 grid grid-cols-7 text-center text-xs/6 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="mt-2 grid grid-cols-7 text-sm">
            {calendarDays?.map((day, dayIdx) => (
              <div
                key={day.date.toString()}
                className={joinClasses(
                  dayIdx > 6 && 'border-t border-gray-200',
                  'py-1'
                )}
              >
                <Button
                  label={day.date
                    .getDate()
                    .toString()
                    .split('-')
                    .pop()
                    ?.replace(/^0/, '')}
                  data-id={day}
                  disabled={day.date <= new Date(Date.now())}
                  onClick={() => setSelectedDate(day.date)}
                  cssClasses={joinClasses(
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isToday && 'text-indigo-600',
                    !day.isSelected &&
                      !day.isToday &&
                      day.isCurrentMonth &&
                      'text-gray-900',
                    !day.isSelected &&
                      !day.isToday &&
                      !day.isCurrentMonth &&
                      'text-gray-400',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                    !day.isSelected && 'hover:bg-gray-200',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    'mx-auto flex size-8 items-center justify-center rounded-full disabled:text-gray-200'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
