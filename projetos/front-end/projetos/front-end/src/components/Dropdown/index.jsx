import { useCallback, useState } from "react";
import { Background, Container, Content } from "./styles";

export const Dropdown = ({ children, options = [] }) => {
  const [show, setShow] = useState(false);

  const handleDropdownVisibility = useCallback(() => {
    setShow(oldState => !oldState);
  }, []);

  return (
    <>
      <Container>
        <button type="button" onClick={handleDropdownVisibility}>
          {children}
        </button>

        {show && (
          <Content>
            <ul>
              {options.map((opt, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => {
                        opt.action();
                        setShow(false);
                      }}
                    >
                      {opt.icon}

                      <span>{opt.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Content>
        )}
      </Container>

      {show && <Background onClick={handleDropdownVisibility} />}
    </>
  );
}