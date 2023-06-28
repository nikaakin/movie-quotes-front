import { reactSelectStyles } from '@/styles';
import { SelectProps } from './type';
import { useSelect } from './useSelect';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export const CustomSelect = ({
  control,
  getFieldState,
  name,
  options,
  placeholder,
}: SelectProps) => {
  const { error, isDirty, invalid } = useSelect({
    getFieldState,
    name,
  });
  return (
    <div className='relative'>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, ref } }) => (
          <Select
            placeholder={placeholder}
            ref={ref}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            styles={reactSelectStyles(
              invalid ? '#E31221' : isDirty ? '#198754' : '#6C757D'
            )}
            options={options}
            isMulti
            onChange={(val) => onChange(val)}
          />
        )}
        shouldUnregister
      />
      <span className='absolute left-2 bottom-0 translate-y-full text-red-550 text-base'>
        {error?.message}
      </span>
    </div>
  );
};
