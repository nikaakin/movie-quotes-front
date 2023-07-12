import { SelectProps } from './type';
import { useSelect } from './useSelect';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { DropdownIndicatorIcon, MovieCameraIcon } from '@/components';

export const CustomSelect = <T,>({
  control,
  getFieldState,
  name,
  options,
  placeholder,
  styles,
  shouldHaveIndicator = false,
  isMulti = false,
  defaultValue,
}: SelectProps<T>) => {
  const { error, isDirty, invalid } = useSelect({
    getFieldState,
    name,
  });
  return (
    <div>
      <div className='relative'>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, ref, value } }) => (
            <Select
              defaultValue={defaultValue}
              placeholder={placeholder}
              ref={ref}
              components={{
                DropdownIndicator: () =>
                  shouldHaveIndicator ? (
                    <div className='mr-8'>
                      <DropdownIndicatorIcon />
                    </div>
                  ) : null,
                IndicatorSeparator: () => null,
              }}
              styles={styles(
                invalid
                  ? '#E31221'
                  : isDirty
                  ? '#198754'
                  : isMulti
                  ? '#6C757D'
                  : 'transparent'
              )}
              options={options}
              isMulti={isMulti}
              onChange={(val) => onChange(val)}
              value={value}
            />
          )}
          shouldUnregister
        />
        {!isMulti && (
          <div className='absolute top-1/2 -translate-y-1/2 left-6 '>
            <MovieCameraIcon />
          </div>
        )}
      </div>
      <span className='block min-h-5 text-red-550 text-base'>
        {error?.message}
      </span>
    </div>
  );
};
