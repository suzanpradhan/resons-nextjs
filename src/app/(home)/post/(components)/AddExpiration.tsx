import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types';
const AddExpiration = () => {
  const [date, setDate] = useState<Date | string | undefined>(new Date());
  const handleChange = (e: Value) => {
    const dateString = e?.toLocaleString();
    setDate(dateString);
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <Calendar onChange={(e) => handleChange(e)} value={date} />
    </div>
  );
};

export default AddExpiration;
