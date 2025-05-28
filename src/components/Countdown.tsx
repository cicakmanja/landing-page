import React, { useEffect, useState } from "react";

export const CountdownTimer = ({ targetDate }: { targetDate: number}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      } as Record<string, number>;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Record<string, number>>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-8 text-center text-lg font-mono">
      {Object.entries(timeLeft).map(([unit, value]: [string, number]) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-4xl font-bold">{value}</span>
          <span className="uppercase text-sm text-gray-500">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export const SaveTheDate = ({ eventName, date, link }: { eventName: string, date: number, link: string }) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-xl p-10 mx-auto bg-white shadow-2xl rounded-2xl text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-10">Save the Date</h2>
        {/* <p className="text-lg text-gray-600">{eventName}</p> */}
        <p className="text-xl font-semibold mb-5">{formattedDate}</p>
        <CountdownTimer targetDate={date} />
        <a
        className="mt-4 ring-1 ring-[#915282] px-6 py-2 mx-auto rounded-2xl hover:bg-[#915282] w-fit hover:text-white transition"
        href={link}
        target="_blank"
        rel="noopener noreferrer">
          Add to Calendar
        </a>
      </div>
    </div>
  );
};

export default SaveTheDate;
