import '@/app/calendar.css';
import { useState } from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import DatePicker from 'react-datepicker';

const AddExpiration = () => {
  const [date, setDate] = useState<Date | string | undefined>(new Date());
  const handleChange = (e: Value) => {
    const dateString = e?.toLocaleString();
    setDate(dateString);
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="w-full flex justify-center pt-5 px-4 bg-white flex-1 overflow-y-scroll">
      {/* <Calendar onChange={(e) => handleChange(e)} value={date} /> */}
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
    </div>
  );
};

export default AddExpiration;
