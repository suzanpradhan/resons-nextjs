import { useAppDispatch } from '@/core/redux/clientStore';
import postApi from '@/modules/post/postApi';
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
}

const AsyncMultiSelect = ({
  name,
  id,
  selectedTagOptions,
  setSelectedTagOptions,
}: AsyncMultiSelectType) => {
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

  const handleTagsChange = (e: MultiValue<Option>) => {
    console.log(e.length);
    setSelectedTagOptions((prevStates) => [
      ...prevStates,
      { label: e[e.length - 1].label, value: e[e.length - 1].value },
    ]);
    console.log(selectedTagOptions);
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
