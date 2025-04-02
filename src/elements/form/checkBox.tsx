import React from 'react';
import Form from 'react-bootstrap/Form';

interface CheckBoxInterface {
    text: string,
    status: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}

const CheckBox: React.FC<CheckBoxInterface> = ({ text, status, onChange })=> {
  return (
    <Form>
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={`default-checkbox`}
            label={text}
            onChange={onChange}
            checked={status}
          />
    </Form>
  );
}

export default CheckBox;