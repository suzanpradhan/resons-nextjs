import classNames from 'classnames';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AddExpirationType {
  handleExpirationChange: (value: Date | undefined) => void;
  expiration: Date | undefined;
}

const AddExpiration = (props: AddExpirationType) => {
  const minDate = new Date(Date.now() + 3600 * 1000 * 24);
  const [currentValue, setValue] = useState(0);
  const expirationTypes = ['Never', 'Day', 'Week', 'Custom'];

  const changeExpirationType = (value: number) => {
    if (expirationTypes[value] == 'Never') {
      props.handleExpirationChange(undefined);
    } else if (expirationTypes[value] == 'Day') {
      props.handleExpirationChange(new Date(Date.now() + 3600 * 1000 * 24));
    } else if (expirationTypes[value] == 'Week') {
      props.handleExpirationChange(new Date(Date.now() + 3600 * 1000 * 24 * 7));
    }
    setValue(value);
  };

  return (
    <>
      <div className="px-4 py-2 border-b-2 bg-white">Post Audience</div>
      <div className="bg-white flex-1 overflow-y-scroll pb-14">
        {expirationTypes.map((item, index) => (
          <div key={index}>
            <label
              className={classNames(
                `mb-1 w-full flex items-center justify-between p-4 font-normal text-base`,
                Number(currentValue) === index ? 'bg-red-500' : 'bg-whiteShade',
                Number(currentValue) === index ? 'text-white' : 'text-dark-500'
              )}
              htmlFor={'privacy_code_' + item}
            >
              <span className="ml-1">{item}</span>
              <div className="ml-4">
                {item == 'Custom' ? (
                  <DatePicker
                    minDate={minDate}
                    popperPlacement="top"
                    className={classNames(
                      ' rounded-md text-dark-500 ',
                      currentValue == index ? 'bg-red-200' : 'bg-white'
                    )}
                    showIcon
                    selected={props.expiration}
                    onChange={(date: Date) =>
                      props.handleExpirationChange(date)
                    }
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
              onChange={() => changeExpirationType(index)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AddExpiration;
