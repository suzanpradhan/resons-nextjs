import { useAppDispatch } from '@/core/redux/clientStore';
import postApi from '@/modules/post/postApi';
import { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
// Define an interface for the option type

interface AsyncMultiSelectType {
  id: string;
  handleChange: (event: any) => void;
  name: string;
}

const AsyncMultiSelect = ({ handleChange, name, id }: AsyncMultiSelectType) => {
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

  return (
    <AsyncCreatableSelect
      cacheOptions
      isMulti
      placeholder="Select or type..."
      id={id}
      loadOptions={loadOptions}
      onInputChange={(value) => setQuery(value)}
      onChange={(e) => handleChange(e)}
      defaultOptions
      name={name}
    />
  );
};

export default AsyncMultiSelect;
