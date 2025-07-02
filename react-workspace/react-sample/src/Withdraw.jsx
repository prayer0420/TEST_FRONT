import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';

export const Withdraw = ({ onSubmit }) => {
  const [form, setForm] = useState({ id: '', money: '' });

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
      <h3 className="mb-4">출금</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>계좌번호</Label>
          <Input name="id" type="text" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>출금액</Label>
          <Input name="money" type="text" onChange={handleChange} />
        </FormGroup>
        <Button type="submit" color="danger">출금</Button>
      </Form>
    </div>
  );
};
