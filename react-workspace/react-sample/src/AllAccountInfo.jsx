export const AllAccountInfo = ({ accounts }) => (
    <div className="route">
      <h3 className="mb-4">전체계좌조회</h3>
      <div className="container">
        <div className="row fw-bold border-bottom py-2">
          <div className="col">순서</div>
          <div className="col">계좌번호</div>
          <div className="col">이름</div>
          <div className="col">입금액</div>
          <div className="col">종류</div>
          <div className="col">등급</div>
        </div>
        {accounts.map((acc, index) => (
          <div className="row py-2 border-bottom" key={index}>
            <div className="col">{index + 1}</div>
            <div className="col">{acc.id}</div>
            <div className="col">{acc.name}</div>
            <div className="col">{acc.balance}</div>
            <div className="col">{acc.type}</div>
            <div className="col">{acc.grade}</div>
          </div>
        ))}
      </div>
    </div>
  );
  