import { useAppDispatch } from '@/core/redux/clientStore';
import postApi from '@/modules/post/postApi';
import { Dispatch, SetStateAction, useState } from 'react';
import { MultiValue } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
// Define an interface for the option type
interface Option {
  value: string;
  label: string;
}

interface AsyncMultiSelectType {
  setSelectedTagOptions: Dispatch<SetStateAction<MultiValue<Option>>>;
}

const AsyncMultiSelect = ({ setSelectedTagOptions }: AsyncMultiSelectType) => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const getTagsSelectorData = async (inputValue: string) => {
    try {
      const response = await dispatch(
        postApi.endpoints.searchTopics.initiate(inputValue)
      );

      if ('data' in response) {
        console.log(response.data);
        if (response.data.data.length > 0) {
          return response.data.data.map((item: { title: string }) => {
            return {
              value: item.title,
              label: item.title,
            };
          });
        }
      } else {
        console.log('Error fetching:', response.error);
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

  const onChange = (value: any) => {
    setSelectedTagOptions(value);
  };
  return (
    <AsyncCreatableSelect
      cacheOptions
      isMulti
      placeholder="Select or type..."
      id="tag"
      loadOptions={loadOptions}
      onInputChange={(value) => setQuery(value)}
      onChange={(value) => onChange(value)}
      defaultOptions
    />
  );
};

export default AsyncMultiSelect;
