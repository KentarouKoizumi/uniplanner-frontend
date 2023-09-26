import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Elements";
import { FiChevronLeft, FiChevronRight, FiCornerRightUp } from "react-icons/fi";

type HasId = {
  id: string;
};
type TableFormProps<T extends HasId> = {
  periods: number;
  dates: string[];
  isWeekly: boolean;
  selected: T[];
  setSelected: (selected: T[]) => void;
};
type SelectionType = {
  id: string;
  date: Date;
  stringDate: string;
  period: number;
};
type FormattedDate = {
  date: Date;
  stringDate: string;
};

const days = ["日", "月", "火", "水", "木", "金", "土"];

export const TableForm = ({
  periods,
  dates,
  isWeekly,
  selected,
  setSelected,
}: TableFormProps<SelectionType>) => {
  const [page, setPage] = useState<number>(0);
  const [transposed, setTransposed] = useState<boolean>(false);
  const selectHandler = (item: SelectionType) => {
    if (selected.find((i) => i.id === item.id)) {
      setSelected(selected.filter((i) => i.id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
  };
  const clickDateHandler = (stringDate: string) => {
    if (
      selected.filter((i) => i.stringDate === stringDate).length === periods
    ) {
      setSelected(selected.filter((i) => i.stringDate !== stringDate));
    } else {
      const filterd = selected.filter((i) => i.stringDate !== stringDate);
      setSelected([
        ...filterd,
        ...[...Array(periods)].map((_, index) => ({
          id: `${stringDate}-${index + 1}`,
          date: new Date(stringDate),
          stringDate: stringDate,
          period: index + 1,
        })),
      ]);
    }
  };
  const clickPeriodHandler = (period: number) => {
    if (selected.filter((i) => i.period === period).length === dates.length) {
      setSelected(selected.filter((i) => i.period !== period));
    } else {
      const filterd = selected.filter((i) => i.period !== period);
      setSelected([
        ...filterd,
        ...dates.map((date) => ({
          id: date + "-" + period,
          date: new Date(date),
          stringDate: date,
          period: period,
        })),
      ]);
    }
  };

  const formattedDates: FormattedDate[] = dates.map((date) => ({
    date: new Date(date),
    stringDate: date,
  }));

  const chunkedDates: FormattedDate[][] = formattedDates.reduce(
    (result, item, index) => {
      const chunkIndex = Math.floor(index / 7);
      if (!result[chunkIndex]) {
        result[chunkIndex] = []; // start a new chunk
      }
      result[chunkIndex].push(item);
      return result;
    },
    [] as any[][]
  );
  useEffect(() => {
    console.log(page, chunkedDates.length);
    if (page >= chunkedDates.length) {
      setPage(chunkedDates.length - 1);
    }
  }, [chunkedDates]);

  const totalPages = chunkedDates.length;

  return (
    <div className="select-none bg-white rounded-md shadow-md w-fit p-5">
      {transposed ? (
        /// もう一方のものの、行と列を入れ替えたものを作成。ただし、ページネーションは使用しない。
        <div className="flex">
          {[...Array(periods + 1)].map((_, index) => (
            <div
              className={clsx(
                "flex-col mx-1 items-center justify-center",
                index !== 0 ? "w-8" : "w-24"
              )}
            >
              <div className="h-8 w-full items-center justify-center flex">
                {index === 0 ? (
                  <TableButton
                    variant="primarySub"
                    className="group"
                    onClick={() => setTransposed(!transposed)}
                  >
                    <FiCornerRightUp
                      className={clsx(
                        "text-xl transition",
                        transposed
                          ? "rotate-180 group-hover:rotate-0"
                          : "group-hover:-rotate-180 "
                      )}
                    />
                  </TableButton>
                ) : (
                  <TableButton
                    variant="primarySub"
                    onClick={() => clickPeriodHandler(index)}
                  >
                    {index}
                  </TableButton>
                )}
              </div>
              {formattedDates.map((date) => (
                <div className="my-2">
                  {index === 0 ? (
                    <TableButton
                      variant="primarySub"
                      onClick={() => clickDateHandler(date.stringDate)}
                    >
                      {isWeekly ? (
                        <span
                          className={
                            date.date.getDay() === 0
                              ? "text-red-700"
                              : date.date.getDay() === 6
                              ? "text-blue-700"
                              : ""
                          }
                        >
                          {`${days[date.date.getDay()]}`}
                        </span>
                      ) : (
                        <>
                          {`${date.date.getMonth() + 1}/${date.date.getDate()}`}
                          {"("}{" "}
                          <span
                            className={
                              date.date.getDay() === 0
                                ? "text-red-700"
                                : date.date.getDay() === 6
                                ? "text-blue-700"
                                : ""
                            }
                          >{`${days[date.date.getDay()]}`}</span>
                          {")"}
                        </>
                      )}
                    </TableButton>
                  ) : (
                    <TableButton
                      onClick={() =>
                        selectHandler({
                          ...date,
                          id: `${date.stringDate}-${index}`,
                          period: index,
                        })
                      }
                      variant={
                        selected.find(
                          (i) => i.id === `${date.stringDate}-${index}`
                        )
                          ? "disabled"
                          : "primarySub"
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {totalPages > 1 && (
            <div className="mb-5">
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          )}
          <div className="flex items-center justify-center">
            <>
              {[undefined, ...(chunkedDates[page] ?? [])].map((date, index) => (
                <div className="flex-col mx-[0.1rem] items-center justify-center w-24">
                  <div className="h-8 w-full items-center justify-center flex">
                    {date ? (
                      <TableButton
                        variant="primarySub"
                        onClick={() => clickDateHandler(date.stringDate)}
                      >
                        {isWeekly ? (
                          <span
                            className={
                              date.date.getDay() === 0
                                ? "text-red-700"
                                : date.date.getDay() === 6
                                ? "text-blue-700"
                                : ""
                            }
                          >
                            {`${days[date.date.getDay()]}`}
                          </span>
                        ) : (
                          <>
                            {`${
                              date.date.getMonth() + 1
                            }/${date.date.getDate()}`}
                            {"("}{" "}
                            <span
                              className={
                                date.date.getDay() === 0
                                  ? "text-red-700"
                                  : date.date.getDay() === 6
                                  ? "text-blue-700"
                                  : ""
                              }
                            >{`${days[date.date.getDay()]}`}</span>
                            {")"}
                          </>
                        )}
                      </TableButton>
                    ) : (
                      <TableButton
                        variant="primarySub"
                        className="group"
                        onClick={() => setTransposed(!transposed)}
                      >
                        <FiCornerRightUp
                          className={clsx(
                            "text-xl transition",
                            transposed
                              ? "rotate-180 group-hover:rotate-0"
                              : "group-hover:-rotate-180 "
                          )}
                        />
                      </TableButton>
                    )}
                  </div>
                  {[...Array(periods)].map((_, index) => (
                    <div className="my-1">
                      {!date ? (
                        <TableButton
                          variant="primarySub"
                          onClick={() => clickPeriodHandler(index + 1)}
                        >
                          {index + 1}
                        </TableButton>
                      ) : (
                        <TableButton
                          onClick={() =>
                            selectHandler({
                              ...date,
                              id: `${date.stringDate}-${index + 1}`,
                              period: index + 1,
                            })
                          }
                          variant={
                            selected.find(
                              (i) => i.id === `${date.stringDate}-${index + 1}`
                            )
                              ? "disabled"
                              : "primarySub"
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

type TableButtonProps = {
  onClick?: () => void;
  variant: keyof typeof TableButtonVariants;
  width?: string;
  children?: React.ReactNode;
  className?: string;
};
const TableButtonVariants = {
  primary:
    "bg-primary text-white hover:bg-white hover:text-primary hover:shadow-md",
  primarySub:
    "bg-white hover:border-2 hover:border-primary-300 hover:shadow-md",
  disabled: "bg-gray-300 cursor-default border-[#999]",
};

export const TableButton = ({
  onClick,
  variant = "primarySub",
  width = "w-full",
  children,
  className,
}: TableButtonProps) => {
  const clickHandler = () => {
    console.log("click");
    onClick && onClick();
  };
  return (
    <div
      className={clsx(
        "flex items-center justify-center shadow-sm border-[0.01rem] border-gray-100 h-8 rounded-sm transition duration-200 ease-in relative",
        TableButtonVariants[variant],
        width,
        className
      )}
      onClick={() => clickHandler()}
      style={
        variant === "disabled"
          ? {
              backgroundImage:
                "linear-gradient(to right top, transparent calc(50% - 0.5px), #bbb 50%, #bbb calc(50% + 0.5px), transparent calc(50% + 1px))",
            }
          : {}
      }
    >
      {children}
    </div>
  );
};

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};
const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex w-full justify-center">
      <Button
        variant="primarySub"
        size="sm"
        disabled={page === 0}
        onClick={() => {
          prevPage();
        }}
      >
        <FiChevronLeft className="text-xl" />
      </Button>
      <div className="flex justify-center items-center text-lg mx-10">
        {`${page + 1} / ${totalPages}`}
      </div>
      <Button
        variant="primarySub"
        size="sm"
        disabled={page === totalPages - 1}
        onClick={() => {
          nextPage();
        }}
      >
        <FiChevronRight className="text-xl" />
      </Button>
    </div>
  );
};
