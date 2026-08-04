const barData = [
  { value: 37, label: "Mon" },
  { value: 31, label: "Tue" },
  { value: 22, label: "Wed" },
  { value: 40, label: "Thr" },
  { value: 33, label: "Fri" },
  { value: 21, label: "Sat" },
  { value: 22, label: "Sun" },
];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type Month = (typeof monthNames)[number];

export function generateMonthlyData(year: number, month: number) {
  const daysInMonth = new Date(year, month, 0).getDate();

  console.log("year is:", year, "month is:", month);

  const minVal = 20;
  const maxVal = 80;

  const randomBarData = Array.from({ length: daysInMonth }, (_, index) => ({
    value: Math.floor(Math.random() * (maxVal - minVal + 1) + minVal),
    label: `${index + 1}`,
  }));

  return randomBarData;
}

// const currentDate = new Date();

// export const monthlyData = generateMonthlyData(
//   currentDate.getFullYear(),
//   currentDate.getMonth() + 1,
// );
