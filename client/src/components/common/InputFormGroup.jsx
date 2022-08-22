import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const InputFormGroup = React.forwardRef(
  ({ icon: Icon, label, error, type, ...rest }, ref) => {
    return (
      <div className="mb-3">
        <Form.Label htmlFor={`${label}-id`} className="mb-0">
          {`Enter ${label}:`}
        </Form.Label>
        <InputGroup>
          <InputGroup.Text id={`${label}-aria`}>
            <Icon />
          </InputGroup.Text>
          <Form.Control
            type={type}
            id={`${label}-id`}
            placeholder={label}
            aria-describedby={`${label}-aria`}
            {...rest}
            ref={ref}
          />
        </InputGroup>
        {error?.message && (
          <small className="d-block text-danger" muted>
            {error?.message}
          </small>
        )}
      </div>
    );
  }
);

export default InputFormGroup;
