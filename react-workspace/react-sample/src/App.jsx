import './App.css';
import { MakeAccount } from './MakeAccount';
import { AccountInfo } from './AccountInfo';
import { AllAccountInfo } from './AllAccountInfo';
import { Deposit } from './Deposit';
import { Transfer } from './Transfer';
import { Withdraw } from './Withdraw';
import { AccountInfoForm } from './AccountInfoform';

function App() {
  // 더미 데이터
  const sampleAcc = {
    id: '123456-01',
    name: '홍길동',
    balance: 100000,
    type: '일반계좌',
    grade: 'vip',
  };

  const allAccounts = [
    { id: '123456-01', name: '홍길동', balance: 100000, type: '일반계좌', grade: 'vip' },
    { id: '123456-02', name: '이순신', balance: 50000, type: '특수계좌', grade: 'gold' },
  ];

  // 각 기능 동작 시 콘솔로 확인
  const handleSubmitAccountInfo = (id) => console.log("AccountInfo 조회:", id);
  const handleDeposit = (data) => console.log("입금 요청:", data);
  const handleTransfer = (data) => console.log("송금 요청:", data);
  const handleWithdraw = (data) => console.log("출금 요청:", data);

  return (
    <div className="App">
      <MakeAccount />
      <hr />
      <AccountInfo acc={sampleAcc} />
      <hr />
      <AccountInfoForm onSubmit={handleSubmitAccountInfo} />
      <hr />
      <AllAccountInfo accounts={allAccounts} />
      <hr />
      <Deposit onSubmit={handleDeposit} />
      <hr />
      <Transfer onSubmit={handleTransfer} />
      <hr />
      <Withdraw onSubmit={handleWithdraw} />
    </div>
  );
}

export default App;
