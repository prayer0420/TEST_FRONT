import { Form, FormGroup, Label, Input, Col } from 'reactstrap';

export const AccountInfo = ({ acc }) => (
  <div className="route">
    <h3 className="mb-4">계좌조회</h3>
    <Form>
      <FormGroup row>
        <Label sm={2}>계좌번호</Label>
        <Col sm={10}>
          <Input type="text" value={acc.id} readOnly />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>이름</Label>
        <Col sm={10}>
          <Input type="text" value={acc.name} readOnly />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>잔액</Label>
        <Col sm={10}>
          <Input type="text" value={acc.balance} readOnly />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>종류</Label>
        <Col sm={10}>
          <Input type="text" value={acc.type} readOnly />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={2}>등급</Label>
        <Col sm={10}>
          <Input type="text" value={acc.grade} readOnly />
        </Col>
      </FormGroup>
    </Form>
  </div>
);
