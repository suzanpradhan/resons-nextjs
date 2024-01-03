import classNames from 'classnames';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddExpiration = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentValue, setValue] = useState(0);

  const expirationTypes = ['Never', 'Day', 'Week', 'Custom'];

  return (
    <>
      <div className="px-4 py-2 border-b-2 bg-white">Post Audience</div>
      <div className="bg-white flex-1 overflow-y-scroll pb-14">
        {expirationTypes.map((item, index) => (
          <div key={index}>
            <label
              className={classNames(
                `mb-1 w-full flex items-center p-4 font-normal text-base`,
                Number(currentValue) === index ? 'bg-red-500' : 'bg-whiteShade',
                Number(currentValue) === index ? 'text-white' : 'text-dark-500'
              )}
              htmlFor={'privacy_code_' + item}
            >
              <span className="ml-1">{item}</span>
              <div className="ml-4">
                {item == 'Custom' ? (
                  <DatePicker
                    minDate={startDate}
                    popperPlacement="top"
                    className={classNames(
                      ' rounded-md text-dark-500 ',
                      currentValue == index ? 'bg-red-200' : 'bg-white'
                    )}
                    showIcon
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                  />
                ) : (
                  <></>
                )}
              </div>
            </label>
            <input
              hidden
              id={'privacy_code_' + item}
              type="radio"
              name="privacy_code"
              value={index}
              onChange={() => setValue(index)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AddExpiration;
