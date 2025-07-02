import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';

export const Transfer = ({ onSubmit }) => {
  const [form, setForm] = useState({ aid: '', bid: '', money: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="route">
      <h3 className="mb-4">계좌송금</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>보내는 계좌번호</Label>
          <Input name="aid" type="text" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>받는 계좌번호</Label>
          <Input name="bid" type="text" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>송금액</Label>
          <Input name="money" type="text" onChange={handleChange} />
        </FormGroup>
        <Button type="submit" color="warning">송금</Button>
      </Form>
    </div>
  );
};
