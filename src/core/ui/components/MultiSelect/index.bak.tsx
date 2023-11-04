import { GenresDetailType } from '@/modules/genres/genresType';
import { ChangeEvent, useState } from 'react';

interface MultiSelectProps {
  options: GenresDetailType[];
  getIdValue: string;
  onSelectOptionChange: (selectedValues: string[]) => void;
  onSelectLabelChange: (selectedLabels: string[]) => void;
}

const MultiSelect = ({
  options,
  onSelectOptionChange,
  onSelectLabelChange,
  getIdValue,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedLabel = Array.from(
      event.target.selectedOptions,
      (option) => option.label
    );
    setSelectedOptions(selectedValues);
    setSelectedLabels(selectedLabel);
    onSelectOptionChange(selectedValues);
    onSelectLabelChange(selectedLabel);
  };

  return (
    <div className="absolute top-full left-0 w-full">
      <select
        className="w-full text-xs text-gray-500 focus:outline-none focus:ring-1 sm:text-sm bg-gray-50"
        onChange={handleSelectChange}
        value={selectedOptions}
        id={getIdValue}
      >
        {options.map((option) => (
          <>
            <option
              key={option.id}
              value={option.id}
              className={`py-2 px-3 hover:bg-red-400 hover:text-white`}
              selected={true}
            >
              {option.title}
            </option>
          </>
        ))}
      </select>
    </div>
  );
};

export default MultiSelect;
