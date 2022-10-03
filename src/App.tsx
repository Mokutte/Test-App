import moment from "moment";
import { useState } from "react";
import "./App.css";

function App() {
  const [showMore, setShowMore] = useState<boolean>();
  moment.updateLocale("eu", { week: { dow: 1 } });
  window.moment = moment;

  const startDay: any = moment();
  const endDay = moment().endOf("month");
  const daysArray: string[] = [];
  const [selectDay, setSelectDay] = useState<string>();

  const day = moment(startDay).add(2, "day");
  const timeArray: (string | undefined)[] = [];
  const [selectTime, setSelectTime] = useState<string>();

  while (day < endDay) {
    daysArray.push(day.format("D.MM"));
    day.add(1, "day");
  }

  let count = 10;
  if (Math.floor(Number(selectDay?.split("-")[0]) % 2)) {
    while (timeArray.length < 12) {
      timeArray.push(`${count}:00`);
      count++;
    }
  } else {
    while (timeArray.length < 12) {
      timeArray.push(`${count}:30`);
      count++;
    }
  }

  const handleSubmit = () => {
    if (selectDay && selectTime) {
      alert(`Вы записались на прием ${selectDay} на ${selectTime}`);
    } else {
      alert("Вы не выбрали дату или время приема");
    }
  };

  const TimeItems = (by: number, before: number) =>
    timeArray.slice(by, before).map((el: any) => (
      <label
        key={el}
        className={selectTime == el ? "hour_lable_active" : "hour_lable"}
        htmlFor={el}
      >
        <p>{el}</p>
        <input
          type="radio"
          id={el}
          value={el}
          name="time_check"
          className="hour_btn"
          onChange={() => setSelectTime(el)}
        />
      </label>
    ));

  return (
    <div className="App">
      <header className="header">
        <p>Онлаин-консультация</p>
        <p className="header_price">1200₽</p>
      </header>
      <div className="main">
        <div className="day_scroll">
          <div className="day_block">
            <label
              className={
                selectDay == startDay.format("D.MM")
                  ? "lable_input_active"
                  : "lable_input"
              }
              htmlFor="checkbox1"
            >
              <p>Сегодня</p>
              <input
                type="radio"
                id="checkbox1"
                value={startDay.format("D.MM")}
                name="day_check"
                className="day_btn"
                onChange={() => {
                  setSelectDay(
                    moment(startDay).subtract(1, "day").format("D.MM")
                  );
                  setSelectTime("");
                }}
              ></input>
            </label>
            <label
              className={
                selectDay == startDay.add(1, "day").format("D.MM")
                  ? "lable_input_active"
                  : "lable_input"
              }
              htmlFor="checkbox2"
            >
              <p>Завтра</p>
              <input
                type="radio"
                id="checkbox2"
                value={startDay.format("D.MM")}
                name="day_check"
                className="day_btn"
                onChange={() => {setSelectDay(startDay.format("D.MM")); setSelectTime("");}}
              ></input>
            </label>
            {daysArray.map((el: any) => (
              <label
                key={el}
                className={
                  selectDay == el ? "lable_input_active" : "lable_input"
                }
                htmlFor={el}
              >
                <p>{el}</p>
                <input
                  type="radio"
                  id={el}
                  value={el}
                  name="day_check"
                  className="day_btn"
                  onChange={() => {setSelectDay(el); setSelectTime("");}}
                ></input>
              </label>
            ))}
          </div>
        </div>
        <div className="hour_scroll">
          <div className="hour_block">
            {showMore ? (
              <>
                {TimeItems(0, 99)}
                <button
                  className="show_btn"
                  onClick={() => setShowMore(!showMore)}
                >
                  ▲
                </button>
              </>
            ) : (
              <>
                {TimeItems(0, 9)}
                <button
                  className="show_btn"
                  onClick={() => setShowMore(!showMore)}
                >
                  ▼
                </button>
              </>
            )}
          </div>
        </div>
        <button className="button_submit" onClick={handleSubmit}>
          Записаться на консультацию
        </button>
      </div>
    </div>
  );
}

export default App;
