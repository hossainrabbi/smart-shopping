import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const InputFormGroup = ({ icon: Icon, label }) => {
  return (
    <>
      <Form.Label htmlFor={`${label}-id`} className="mb-0">
        {`Enter ${label}:`}
      </Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id={`${label}-aria`}>
          <Icon />
        </InputGroup.Text>
        <Form.Control
          type="text"
          id={`${label}-id`}
          placeholder={label}
          aria-describedby={`${label}-aria`}
        />
      </InputGroup>
    </>
  );
};

export default InputFormGroup;
