import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Container, Content, Form } from "./styled";
import back from '../../../assets/img/back.png';
import { Input } from "../../../components/Input";
import { Radio } from "../../../components/Radio";
import { useCallback, useState } from "react";
import { Button } from "../../../components/Button";

export const CreateLeague = () => {
  const navigate = useNavigate();

  const [type, setType] = useState('time');

  const handleInputRadioChange = useCallback(event => {
    setType(event.target.value);
  }, []);

  const handleFormSubmit = useCallback(event => {
    event.preventDefault();

    console.log('Form submitted!');
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <button onClick={() => navigate('/leagues')}>
          <img src={back} alt="Go back" />
        </button>

        <Form onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="column">
              <label htmlFor="name">Nome do Campeonato</label>
              <Input name="name" id="name" icon={null} />
            </div>

            <div className="row">
              <div className="column">
                <label htmlFor="init">Início</label>
                <Input name="init" id="init" icon={null} />
              </div>

              <div className="column">
                <label htmlFor="end">Fim</label>
                <Input name="end" id="end" icon={null} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="modality">Modalidade</label>
              <Input name="modality" id="modality" icon={null} />
            </div>

            <div className="row">
              <div className="radio">
                <Radio
                  name="type"
                  id="type-time"
                  value="time"
                  onChange={handleInputRadioChange}
                  checked={type === 'time'}
                />

                <label htmlFor="type-time">Time</label>
              </div>

              <div className="radio">
                <Radio
                  name="type"
                  id="type-individual"
                  value="individual"
                  onChange={handleInputRadioChange}
                  checked={type === 'individual'}
                />

                <label htmlFor="type-individual">Individual</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="platform">Plataforma</label>
              <Input name="platform" id="platform" icon={null} />
            </div>

            <div className="column">
              <label htmlFor="players">Números de jogadores</label>
              <Input name="players" id="players" icon={null} />
            </div>
          </div>

          <Button type="submit">Criar</Button>
        </Form>
      </Content>
    </Container>
  );
}