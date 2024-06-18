import { useAppDispatch } from '@/core/redux/clientStore';
import genresApi from '@/modules/genres/genresApi';
import { Dispatch, SetStateAction, useState } from 'react';
import { MultiValue } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
// Define an interface for the option type

interface Option {
  label: string;
  value: string;
}

interface AsyncMultiSelectType {
  id: string;
  name: string;
  selectedTagOptions: MultiValue<Option>;
  setSelectedTagOptions: Dispatch<SetStateAction<MultiValue<Option>>>;
  // eslint-disable-next-line no-unused-vars
  handleTagsChange: (e: MultiValue<Option>) => void;
}

const AsyncMultiSelect = ({
  name,
  id,
  handleTagsChange,
}: AsyncMultiSelectType) => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const getTagsSelectorData = async (inputValue: string) => {
    try {
      const response = await dispatch(
        genresApi.endpoints.searchGenres.initiate(inputValue)
      );

      if ('data' in response) {
        if (response.data.length > 0) {
          return response.data.map((item: { title: string; id: number }) => {
            return {
              value: item.id,
              label: item.title,
            };
          });
        }
      } else {
        // console.log('Error fetching:', response.error);
        throw new Error('Error fetching data');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      throw error;
    }
  };

  const loadOptions = async (inputValue: string) => {
    return Promise.resolve(getTagsSelectorData(inputValue));
  };

  // const myoptions = loadOptions();

  return (
    <AsyncCreatableSelect
      cacheOptions
      isMulti
      placeholder="Select or type..."
      id={id}
      loadOptions={loadOptions}
      onInputChange={(value) => setQuery(value)}
      onChange={(e: MultiValue<Option>) => handleTagsChange(e)}
      defaultOptions
      name={name}
    />
  );
};

export default AsyncMultiSelect;
