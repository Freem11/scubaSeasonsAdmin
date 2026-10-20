import React, { useState, useEffect } from 'react';
import Select, { InitialValue, Option, SelectProps } from '../select';


const defaultProps = {
  searchLimit: 100,
};

export type GetMoreOptions = (search: string, limit: number, skip: number) => Promise<{ options: Option[] }>;

/** Loads the options that match the current value, so a pre-selected value has its option. */
export type GetSelectedOptions = (value: InitialValue) => Promise<{ options?: Option[] } | null | undefined>;

type DynamicSelectProps = SelectProps & Partial<typeof defaultProps> & {
  getMoreOptions:      GetMoreOptions
  getSelectedOptions?: GetSelectedOptions
};


const DynamicSelect = React.forwardRef<HTMLInputElement, DynamicSelectProps>(function DynamicSelect(_props: DynamicSelectProps, forwardedRef) {
  const props = { ...defaultProps, ..._props };
  const { getSelectedOptions, getMoreOptions, searchLimit, ...rest } = props;
  const [options, setOptions] = useState<Option[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchOffset] = useState(0);

  useEffect(() => {
    init();
  }, []);


  const init = async () => {
    try {
      if (getSelectedOptions) {
        const data = await getSelectedOptions(props.value);
        setIsFetching(false);
        if (!data) {
          return;
        }

        if (data?.options?.length) {
          // there are pre-selected options
          setOptions(data.options);
        }
      }

      if (!props.disabled) {
        // add other possible options
        loadOptions('');
      }
    } catch (e) {
      setIsFetching(false);
      console.log(e);
    }
  };


  const onSearch = (search: string) => {
    loadOptions(search, true);
  };

  const loadOptions = async (search: string, replaceExistingOptions = false) => {
    if (!getMoreOptions) {
      return;
    }
    setIsFetching(true);
    const [data] = await Promise.all([
      props.getMoreOptions(search, searchLimit, searchOffset),
      new Promise(resolve => setTimeout(resolve, 300)), // atrificial deplay to avoid flickering
    ]);

    setIsFetching(false);
    if (!data?.options) {
      setOptions([]);
      return;
    }

    setOptions((options) => {
      if (replaceExistingOptions) {
        return data.options;
      }

      return [...options];
    });
  };

  return (
    <Select
      ref={forwardedRef}
      isFetching={isFetching}
      options={options}
      onSearch={onSearch}
      {...rest}
    />
  );
});

export default DynamicSelect;
