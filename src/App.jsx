import { useState } from "react";

function calculateMonthlyPayment(price, advance, buyout, term, annualRate = 0.4563) {
  const principal = price - advance - buyout;
  const monthlyRate = annualRate / 12;

  const annuity = principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)));
  const buyoutInterest = buyout * monthlyRate; // прибавляется как фиксированная надбавка

  return Math.round(annuity + buyoutInterest);
}

export default function LeasingCalculator() {
  const [price, setPrice] = useState(2000000);
  const [advance, setAdvance] = useState(0);
  const [term, setTerm] = useState(36);
  const [buyout, setBuyout] = useState(400000);

  const advancePercent = Math.round((advance / price) * 100);
  const buyoutPercent = Math.round((buyout / price) * 100);

  const monthlyPayment = calculateMonthlyPayment(price, advance, buyout, term);

  const totalWithTaxBenefit = monthlyPayment * term + buyout;
  const fullCost = price * 1.44;
  const vatReturn = Math.round(price * 0.2);
  const profitTaxReduction = vatReturn;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <label>Стоимость техники</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          <input
            type="range"
            min={400000}
            max={80000000}
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Аванс ({advancePercent}%)</label>
          <input
            type="number"
            value={advance}
            onChange={(e) => setAdvance(+e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          <input
            type="range"
            min={price * 0.05}
            max={price * 0.49}
            value={advance}
            onChange={(e) => setAdvance(+e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Срок лизинга (месяцев)</label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(+e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          <input
            type="range"
            min={12}
            max={60}
            value={term}
            onChange={(e) => setTerm(+e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Выкупной платёж ({buyoutPercent}%)</label>
          <input
            type="number"
            value={buyout}
            onChange={(e) => setBuyout(+e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          <input
            type="range"
            min={1000}
            max={price * 0.3}
            value={buyout}
            onChange={(e) => setBuyout(+e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div style={{ background: "#f5f7fa", padding: "32px", borderRadius: "12px", textAlign: "center", boxShadow: "0 0 0 1px #d1d5db" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", background: "#2f4aa2", color: "white", padding: "10px", borderRadius: "4px" }}>Ежемесячный платёж</h2>
        <div style={{ fontSize: "32px", fontWeight: "700", color: "#2f4aa2", marginBottom: "24px" }}>
          {monthlyPayment.toLocaleString("ru-RU")} ₽
        </div>
        <div style={{ textAlign: "left", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Сумма договора с учётом налоговой выгоды</span>
            <span>{totalWithTaxBenefit.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", textDecoration: "line-through", color: "gray" }}>
            <span>Без налоговой выгоды</span>
            <span>{fullCost.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Возврат 20% НДС</span>
            <span>{vatReturn.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Снижение налога на прибыль</span>
            <span>{profitTaxReduction.toLocaleString("ru-RU")} ₽</span>
          </div>
        </div>
        <button style={{ marginTop: "24px", padding: "12px", width: "100%", background: "#636363", color: "white", border: "1px solid #4b5563", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.854 1.146a.5.5 0 0 0-.708 0L13 3.293 12.207 2.5l2.147-2.147a.5.5 0 0 0-.708-.708L11.5 1.793 10.707 1l2.147-2.147a.5.5 0 0 0-.708-.708L10 1.293 9.207.5l2.147-2.147a.5.5 0 0 0-.708-.708L8.5.793 7.707 0 6.5 1.207 4.354-1.939a.5.5 0 0 0-.708.708L5.793.5 5 1.293 2.854-.854a.5.5 0 1 0-.708.708L4.293 1.5 3.5 2.293.854-.854a.5.5 0 0 0-.708.708L2.793 2.5 2 3.293l-2.146-2.147a.5.5 0 0 0-.708.708L1.293 4 0.5 4.793l-2.147-2.147a.5.5 0 0 0-.708.708L0 5.207-.793 6l2.147 2.147a.5.5 0 0 0 .708-.708L.707 5.5 1.5 4.707l2.146 2.147a.5.5 0 0 0 .708-.708L2.207 4 3 3.207l2.146 2.147a.5.5 0 0 0 .708-.708L3.707 2.5 4.5 1.707 6.646 3.854a.5.5 0 0 0 .708-.708L5.207 1.5 6 0.707 8.146 2.854a.5.5 0 0 0 .708-.708L6.707.5 7.5-.293 9.646 1.854a.5.5 0 0 0 .708-.708L8.207 0l.793-.793 2.146 2.147a.5.5 0 0 0 .708-.708L9.707-1 10.5-1.793l2.146 2.147a.5.5 0 0 0 .708-.708L11.207-2 12-2.793l2.147 2.147a.5.5 0 0 0 .707-.708L12.707-3l.793-.793z"/>
          </svg>
          Оставить заявку
        </button>
      </div>
    </div>
  );
}
