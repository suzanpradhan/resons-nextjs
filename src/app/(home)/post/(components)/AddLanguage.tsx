import { language_code } from '@/core/constants/appConstants';
import classNames from 'classnames';
import { MagnifyingGlass } from 'phosphor-react';
import { useState } from 'react';

interface AddLanguageType {
  handleLanguageChange: (value: string) => void;
  languagevalue: string | undefined;
}

const AddLanguage = ({
  handleLanguageChange,
  languagevalue,
}: AddLanguageType) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const displayedLanguage = language_code.find(
    (item) => item.code === languagevalue
  );

  return (
    <div className="h-full">
      <div className="flex items-center px-4 gap-2">
        <label htmlFor="searchInput">
          <MagnifyingGlass size={24} />
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder="Search Language"
          className="w-full bg-transparent py-3 focus:outline-none"
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          value={searchValue}
        />
      </div>
      <div className="h-full">
        {language_code
          .filter((item) => item.name.toLowerCase().includes(searchValue))
          .map((item, index) => (
            <div key={index}>
              <label
                className={classNames(
                  `mb-0 w-full flex items-center px-4 py-3`,
                  languagevalue === item.code && 'bg-red-500'
                )}
                htmlFor={'language' + item.code}
              >
                <span>{item.name}</span>
              </label>
              <input
                hidden
                id={'language' + item.code}
                type="radio"
                name="language"
                value={item.code}
                onChange={() => handleLanguageChange(item.code)}
              />
            </div>
          ))}
        <div className="h-28"></div>
      </div>
    </div>
  );
};

export default AddLanguage;
