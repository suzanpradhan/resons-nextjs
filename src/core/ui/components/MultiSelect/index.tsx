import { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

// Define an interface for the option type
interface Option {
  value: string;
  label: string;
}

interface MultiSelectType {
  options: MultiValue<Option>,
  selectedOptions: MultiValue<Option>,
  onChange: (newValue: MultiValue<Option>) => void;
}

const MultiSelect = ({ options, selectedOptions, onChange }: MultiSelectType) => {

  const handleChange = (newValue: MultiValue<Option>) => {
    onChange(newValue);
  };

  return (
    <CreatableSelect
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Select or type..."
      id='tag'
    />
  );
};

export default MultiSelect;
