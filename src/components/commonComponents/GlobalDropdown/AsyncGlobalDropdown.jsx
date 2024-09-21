import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { cn, isValid } from '@/utils/common-utils';

const AsyncGlobalDropdown = ({
  field,
  loadOptions, 
  isMulti = false,
  placeholder,
  label,
  name,
  errors,
  errorMessage,
  required = false,
  disabled = false,
  labelStyle = '',
  dropStyle = '',
  className = '',
}) => {
  const invalid = isValid(name, errors);
  const animatedComponents = makeAnimated();

  return (
    <div className={cn('w-full', className)}>
      <label className={cn('label', invalid && 'label-error', labelStyle)}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <AsyncSelect
        {...field}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        isMulti={isMulti}
        placeholder={placeholder}
        components={animatedComponents}
        onChange={(selectedOptions) => {
          field.onChange(
            isMulti
              ? selectedOptions.map((option) => option?.value)
              : selectedOptions?.value
          );
        }}
        value={
          isMulti
            ? field?.value?.map(value => ({ label: value, value }))
            : field?.value ? { label: field?.value, value: field?.value } : null
        }
        classNamePrefix="select"
        className={cn('select-container', invalid && 'select-error', dropStyle)}
        isDisabled={disabled}
      />
      {invalid && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default AsyncGlobalDropdown;
