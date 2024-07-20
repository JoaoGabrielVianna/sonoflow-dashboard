import React, { useRef } from 'react';
import { formatDate } from '../utils/dateUtils';
import { CalendarDays } from 'lucide-react';
import { useDate } from '@/providers/DateProvider';

const DateInput: React.FC = () => {
  const { date, setDate } = useDate();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = event.target.value.split('-');
    const selectedDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
    setDate(selectedDate);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDateInput = () => {
    inputRef.current?.showPicker();
  };

  return (
    <div onClick={handleDateInput}>
      <input 
        ref={inputRef} 
        type="date" 
        value={formatDate(date, 'yyyy-mm-dd')} 
        className='w-0 absolute' 
        onChange={handleDateChange} 
      />
      <button
        type='button'
        className='flex gap-4'>
        {formatDate(date, 'dd/mm/yyyy')}
        <CalendarDays />
      </button>
    </div>
  );
};

export default DateInput;
