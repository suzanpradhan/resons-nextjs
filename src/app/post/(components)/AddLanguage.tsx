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
    <div className="h-full flex flex-col">
      <div className="flex items-center px-4 max-[356px]:px-3 gap-2 bg-white">
        <label htmlFor="searchInput">
          <MagnifyingGlass className="text-2xl max-[356px]:text-xl" />
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder="Search Language"
          className="w-full bg-transparent py-3 text-base max-[356px]:text-sm focus:outline-none"
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          value={searchValue}
        />
      </div>
      <div className="overflow-y-scroll pb-14 bg-white flex-1">
        {language_code
          .filter((item) => item.name.toLowerCase().includes(searchValue))
          .map((item, index) => (
            <div key={index}>
              <label
                className={classNames(
                  `mb-1 w-full flex text-base max-[356px]:text-sm font-normal items-center px-4 max-[356px]:px-3 py-3`,
                  languagevalue === item.code ? 'bg-red-500' : 'bg-whiteShade'
                )}
                htmlFor={'language' + item.code}
              >
                <span
                  className={
                    languagevalue === item.code ? 'text-white' : 'text-dark-500'
                  }
                >
                  {item.name}
                </span>
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
      </div>
    </div>
  );
};

export default AddLanguage;
