import { useCallback, useState } from 'react';
import { Container, Input as StyledInput } from './styles';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const Input = ({
  icon: Icon,
  style = {},
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(rest.autoFocus || false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnBlur = useCallback(event => {
    setIsFocused(false);

    if (rest.onBlur) rest.onBlur(event);
  }, [rest]);

  const handleOnFocus = useCallback(event => {
    setIsFocused(true);

    if (rest.onFocus) rest.onFocus(event);
  }, [rest]);

  return (
    <Container isFocused={isFocused} style={style}>
      {Icon && <Icon size={24} color="#D92856" />}

      <StyledInput
        {...rest}
        type={showPassword ? 'text' : rest.type}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
      />

      {rest.type === 'password' && (
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 
            <FiEyeOff size={20} color="#D9285670" /> 
            : <FiEye size={20} color="#D9285670" />} 
        </button>
      )}
    </Container>
  );
}