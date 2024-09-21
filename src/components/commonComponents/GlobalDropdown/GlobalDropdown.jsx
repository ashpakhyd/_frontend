import { cn, isValid } from '@/utils/common-utils';
import React from 'react';
import Select from 'react-select';
import "./GlobalDropdown.css"
import makeAnimated from 'react-select/animated';

const GlobalDropdown = ({
    field,
    options,
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
    isClearable = false,
    isLoading = false,
    onLoadMore,
    hasMoreData = false, 
  }) => {
    const invalid = isValid(name, errors);
    const animatedComponents = makeAnimated();
  
    return (
      <div className={cn('w-full', className)}>
        <label  className={cn('label', invalid && 'label-error', labelStyle)}>
          {label} {required && <span className="text-[#f31260]">*</span>}
        </label>
        <Select
          {...field}
          options={options}
          isMulti={isMulti}
          placeholder={placeholder}
          isLoading={isLoading}  
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
                ? options?.filter((option) =>
                    field?.value?.includes(option?.value)
                )
                : options?.find((option) => option?.value === field?.value) || null 
        }
          classNamePrefix="select"
          className={cn('select-container', invalid && 'select-error', dropStyle)}
          isDisabled={disabled}
          isClearable={isClearable}
          onMenuScrollToBottom={() => {
            if (hasMoreData && onLoadMore) {
              onLoadMore(); // Zyada data load karne ke liye function ko call karo
            }
          }}
        />
        {invalid && <span className="error-message">{errorMessage}</span>}
      </div>
    );
  };

export default GlobalDropdown;
