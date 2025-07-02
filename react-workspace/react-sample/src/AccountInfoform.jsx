import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';

export const AccountInfoForm = ({ onSubmit }) => {
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id);
  };

  return (
    <div className="route">
      <h3 className="mb-4">계좌조회</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="id">계좌번호</Label>
          <Input name="id" type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </FormGroup>
        <Button type="submit" color="primary">조회</Button>
      </Form>
    </div>
  );
};
