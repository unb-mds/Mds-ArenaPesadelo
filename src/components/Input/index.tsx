import {
  FC,
  FocusEvent,
  HTMLInputTypeAttribute,
  useCallback,
  useState,
  InputHTMLAttributes,
  useEffect
} from "react";
import { Container, Error } from "./styles";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
}

export const Input: FC<IInput> = ({
  label,
  id,
  onFocus,
  onBlur,
  style,
  error,
  value,
  ...rest
}) => {
  const [active, setActive] = useState(!!value);
  const [type, setType] = useState(rest.type || "text");

  useEffect(() => {
    if (!value) setActive(false);
  }, [value]);

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setActive(true);

      if (onFocus) onFocus(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (!event.target.value) setActive(false);

      if (onBlur) onBlur(event);
    },
    [onBlur]
  );

  const handleShowPass = useCallback(() => {
    const updatedType = type === "password" ? "text" : "password";

    setType(updatedType);
  }, [type]);

  return (
    <Container active={active} style={style}>
      <label htmlFor={id}>{label}</label>

      <input
        {...rest}
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        value={value || ''}
      />

      {rest.type === "password" && (
        <button onClick={handleShowPass} type="button">
          {type === "password" ? (
            <FaEye size={18} color="#BA153F" />
          ) : (
            <FaEyeSlash size={18} color="#BA153F" />
          )}
        </button>
      )}

      <Error>{error}</Error>
    </Container>
  );
};
