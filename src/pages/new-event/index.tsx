import { InputField } from "@/components/Form";
import { CreateEventDto } from "@/features/createEvent";
import { Button } from "@/components/Elements";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { Checkbox } from "@/components/Form/Checkbox";
import { CalenderForm, DateButton } from "@/components/Form/CalenderForm";
import PageHead from "@/components/Layout/PageHead";
import { TableForm } from "@/components/Form/TableForm";
import clsx from "clsx";

type BannedDate = {
  id: string;
  date: Date;
  stringDate: string;
  period: number;
};

const Page = () => {
  const title = "新しいイベント";
  const description = "新しいイベントを作成するページです。";
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [isWeekly, setIsWeekly] = useState<boolean>(false);
  const [numOfPeriod, setNumOfPeriod] = useState<number>(7); // 1: 1コマ, 2: 2コマ, 3: 3コマ, 4: 4コマ
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const [bannedDates, setBannedDates] = useState<BannedDate[]>([]); // 予定が入っている日付

  const weeklyDate = [
    "1950-01-01",
    "1950-01-02",
    "1950-01-03",
    "1950-01-04",
    "1950-01-05",
    "1950-01-06",
    "1950-01-07",
  ];

  // テスト用のデータを作成
  const data: CreateEventDto = {
    name: "2021年度新歓",
    description: "新歓の日程調整",
    is_weekly: false,
    schedules: [
      {
        date: "2021-04-01",
        period: 1,
      },
      {
        date: "2021-04-02",
        period: 2,
      },
    ],
  };

  const mutation = useMutation((data: CreateEventDto) => {
    return axios.post("http://localhost:8000/events/", data);
  });

  const handleClick = () => {
    if (eventName === "") {
      alert("イベント名を入力してください。");
      return;
    }
    if (eventDescription === "") {
      alert("イベントの説明を入力してください。");
      return;
    }
    if (selectedDate.length === 0 && !isWeekly) {
      alert("日程を選択してください。");
      return;
    }
    const schedules = [];
    if (isWeekly) {
      for (let i = 0; i < numOfPeriod; i++) {
        for (let j = 0; j < weeklyDate.length; j++) {
          schedules.push({
            date: weeklyDate[j],
            period: i + 1,
          });
        }
      }
    } else {
      for (let i = 0; i < numOfPeriod; i++) {
        for (let j = 0; j < selectedDate.length; j++) {
          schedules.push({
            date: selectedDate[j],
            period: i + 1,
          });
        }
      }
    }
    const filteredSchedules = schedules.filter((schedule) => {
      return !bannedDates.some((bannedDate) => {
        return (
          bannedDate.stringDate === schedule.date &&
          bannedDate.period === schedule.period
        );
      });
    });

    mutation.mutate(
      {
        name: eventName,
        description: eventDescription,
        is_weekly: isWeekly,
        schedules: filteredSchedules,
      },
      {
        onSuccess: (data, variable, context) => {
          console.log(data);
          console.log(variable);
          console.log(context);
          alert(`イベントを作成しました。${data.data.id}`);
        },
        onError: () => {
          alert("イベントの作成に失敗しました。");
        },
      }
    );
  };
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <PageHead title={title} description={description} />

      <div className="w-full pt-10 pb-20 h-screen overflow-y-scroll">
        <div className="flex justify-center">
          <h1 className="text-4xl md:text-5xl font-bold ">
            新しいイベントを作成
          </h1>
        </div>
        <div className="flex justify-center mt-5 md:mt-10 mb-10">
          <div className="flex justify-center w-4/5 md:w-2/3">
            　新しいイベントを作成することは、新しい思い出を作る第一歩です。このページでは、イベントの日程を簡単に設定し、参加者を招待することができます。日程を提案し、参加者の都合を確認し、最適な日時を見つけましょう。
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Card title="1. 基本情報の入力">
            <div className="px-6">
              <InputField
                label="イベント名"
                className="mb-4"
                placeholder="例: 2021年度新歓"
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
              />
              <InputField
                label="イベントの説明"
                className="mb-4"
                placeholder="例: 新歓の日程調整"
                onChange={(e) => {
                  setEventDescription(e.target.value);
                }}
              />
              <InputField
                label="一日のコマ数"
                type="number"
                className="mb-4"
                defaultValue="7"
                onChange={(e) => {
                  if (Number(e.target.value) > 10) {
                    alert("一日のコマ数は10コマまでです。");
                    setNumOfPeriod(10);
                    return;
                  } else if (Number(e.target.value) < 1) {
                    alert("一日のコマ数は1コマ以上です。");
                    setNumOfPeriod(1);
                    return;
                  }
                  setNumOfPeriod(Number(e.target.value));
                }}
              />
              <Checkbox
                labelContent={<p>週次のイベントかどうか</p>}
                onChange={(e) => {
                  setIsWeekly(e.target.checked);
                }}
              />
            </div>
          </Card>
        </div>
        <div className="mt-2 md:mt-10">
          {!isWeekly && (
            <div className="w-full flex justify-center items-center">
              <Card title="2. 日付を選択">
                <div className="text-black text-3xl font-bold pb-3"></div>
                <div className="flex justify-center items-center">
                  <CalenderForm
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              </Card>
            </div>
          )}
        </div>
        {(selectedDate.length > 0 || isWeekly) && (
          <div className="mt-2 md:mt-10 w-full flex justify-center items-center">
            <Card title={`${isWeekly ? "2. " : "3. "}除外するコマを選択`}>
              <div className="w-full flex justify-center itens-center">
                <div className="overflow-x-auto">
                  <TableForm
                    periods={numOfPeriod}
                    dates={!isWeekly ? selectedDate : weeklyDate}
                    isWeekly={isWeekly}
                    selected={bannedDates}
                    setSelected={setBannedDates}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
        <div className="mt-10 w-full flex justify-center items-center">
          <Button
            variant="primary"
            onClick={() => {
              handleClick();
            }}
          >
            作成
          </Button>
        </div>
      </div>
    </>
  );
};

type CardProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};
const Card = ({
  title,
  className = "md:w-5/6 w-full ",
  children,
}: CardProps) => {
  return (
    <div
      className={clsx(
        "bg-white p-5 rounded-sm border-t-4 border-primary",
        className
      )}
    >
      <div className="text-black text-3xl font-bold pb-3">{title}</div>
      {children}
    </div>
  );
};

export default Page;
