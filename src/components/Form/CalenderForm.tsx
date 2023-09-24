import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "../Elements";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type CalenderType = {
  month: number;
  year: number;
  calender: Array<Array<number | undefined>>;
};

function generateCalender(year: number, month: number): CalenderType {
  // 指定された月の1日の曜日を取得 (0: 日曜日, 1: 月曜日, ... , 6: 土曜日)
  const firstDay = new Date(year, month - 1, 1).getDay();

  // 指定された月の最後の日を取得
  const lastDate = new Date(year, month, 0).getDate();

  // カレンダーの配列を初期化
  let calender: Array<Array<number | undefined>> = [];
  let week: Array<number | undefined> = [];

  // 1日の曜日までnullで埋める
  for (let i = 0; i < firstDay; i++) {
    week.push(undefined);
  }

  // 日付を埋める
  for (let date = 1; date <= lastDate; date++) {
    week.push(date);
    if (week.length === 7) {
      calender.push(week);
      week = [];
    }
  }

  // 最後の週が7日未満の場合、nullで埋める
  while (week.length < 7 && week.length > 0) {
    week.push(undefined);
  }
  if (week.length > 0) {
    calender.push(week);
  }

  return {
    month: month,
    year: year,
    calender: calender,
  };
}

type CalenderFormProps = {
  selectedDate: string[];
  setSelectedDate: (date: string[]) => void;
};
export const CalenderForm = ({
  selectedDate,
  setSelectedDate,
}: CalenderFormProps) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calender, setCalender] = useState<CalenderType>();

  const onClickHandler = (dateString: string) => {
    if (selectedDate.includes(dateString)) {
      setSelectedDate(selectedDate.filter((date) => date !== dateString));
    } else {
      setSelectedDate(
        [...selectedDate, dateString].sort((a, b) => {
          const aDate = new Date(a);
          const bDate = new Date(b);
          return aDate > bDate ? 1 : -1;
        })
      );
    }
  };

  const increaseMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const decreaseMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  useEffect(() => {
    const newCalender = generateCalender(year, month);
    setCalender(newCalender);
  }, [month, year]);

  return (
    <div className="w-fit bg-white rounded-sm shadow-sm select-none p-5 flex-col justify-center items-center">
      <div className="flex items-center justify-center">
        <Button
          variant="primarySub"
          size="sm"
          onClick={() => {
            decreaseMonth();
          }}
        >
          <FiChevronLeft className="text-xl" />
        </Button>
        <div className="flex-col justify-center text-center grow">
          <div className="text-sm">{year}年</div>
          <div className="text-3xl">{month}月</div>
        </div>
        <Button
          variant="primarySub"
          size="sm"
          onClick={() => {
            increaseMonth();
          }}
        >
          <FiChevronRight className="text-xl" />
        </Button>
      </div>
      <div className="">
        {calender?.calender.map((week, index) => (
          <div className="flex" key={index}>
            {week.map((date, index) => (
              <div className="p-1" key={index}>
                <DateButton
                  key={index}
                  date={date}
                  isSelected={selectedDate.includes(
                    `${year}-${`${month}`.padStart(
                      2,
                      "0"
                    )}-${`${date}`.padStart(2, "0")}`
                  )}
                  onClick={() =>
                    date &&
                    onClickHandler(
                      `${year}-${`${month}`.padStart(
                        2,
                        "0"
                      )}-${`${date}`.padStart(2, "0")}`
                    )
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

type DateButtonProps = {
  date?: number;
  isSelected?: boolean;
  onClick?: () => void;
};

export const DateButton = ({ date, isSelected, onClick }: DateButtonProps) => {
  const clickHandler = () => {
    date && onClick && onClick();
  };
  return (
    <div
      className={clsx(
        "flex items-center justify-center  border-gray-100 w-8 h-8 rounded-xl transition duration-200 ease-in",
        date ? "cursor-pointer shadow-sm " : "cursor-default",
        date
          ? isSelected
            ? "bg-primary text-white hover:bg-white hover:text-primary hover:shadow-xl"
            : "bg-white hover:bg-primary hover:text-white hover:shadow-xl"
          : "cursor-dafault bg-gray-100"
      )}
      onClick={() => clickHandler()}
    >
      {date}
    </div>
  );
};
