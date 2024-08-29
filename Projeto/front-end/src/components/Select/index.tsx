import { FC, FocusEvent, useCallback, useEffect, useRef, useState } from 'react';
import ReactSelect, { GroupBase, SelectInstance } from 'react-select';
import { IOption, ISelect } from './interfaces';
import { Container, Label } from './styles';
import { Error } from '../Input/styles';

export const Select: FC<ISelect> = ({ name, options, label, placeholder, error, value, ...rest }) => {
  const selectRef = useRef<SelectInstance<IOption, false, GroupBase<IOption>>>(null);

  const [focused, setFocused] = useState(rest.autoFocus || false);

  useEffect(() => {
    setFocused(!(typeof value === 'undefined'));
  }, [value])

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setFocused(true);

    if (rest.onFocus) rest.onFocus(event);
  }, [rest]);

  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const option = selectRef.current?.props.value as IOption;
    setFocused(!!option?.value);

    if (rest.onFocus) rest.onFocus(event);
  }, [rest]);

  return (
    <Container>
      <Label focused={focused} htmlFor={name}>{label}</Label>
      <ReactSelect
        ref={selectRef}
        placeholder={placeholder || ''}
        name={name}
        inputId={name}
        options={options}
        isMulti={false}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        styles={{
          menu: (base) => ({
            ...base,
            backgroundColor: '#fff',
            zIndex: 100,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#DA1F4F' : state.isFocused ? '#282828' :  base.backgroundColor,
            color: state.isSelected || state.isFocused ? '#fff' : '#000',
          }),
          control: () => ({
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #282828',
            borderRadius: 3,
            height: 40,
          }),
         }}
        {...rest}
      />

      <Error>{error}</Error>
    </Container>
  );
}
