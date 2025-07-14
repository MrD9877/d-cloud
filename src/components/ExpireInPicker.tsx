import React, { useState } from "react";

const expiresValues = [
  {
    value: 30 * 1000 * 60,
    text: "30 min",
  },
  {
    value: 2 * 1000 * 60 * 60,
    text: "2 hours",
  },
  {
    value: 12 * 1000 * 60 * 60,
    text: "12 hours",
    default: true,
  },
  {
    value: 24 * 1000 * 60 * 60,
    text: "24 hours",
  },
  {
    value: 2 * 1000 * 60 * 60 * 24,
    text: "2 days",
  },
  {
    value: 15 * 1000 * 60 * 60 * 24,
    text: "15 days",
  },
];

export default function ExpireInPicker() {
  const [pick, setPick] = useState(false);
  const [expiresIn, setExpiresIn] = useState("12 hours");

  return (
    <div>
      <button onClick={() => setPick(true)} type="button" data-modal-target="timepicker-modal" data-modal-toggle="timepicker-modal" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4">
        <svg className="w4 h-4 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
        </svg>
        Expire Access in {expiresIn}
      </button>

      <div style={{ display: pick ? "flex" : "none" }} id="timepicker-modal" aria-hidden="true" className="overflow-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full mx-auto">
        <div className="relative p-4 w-full  max-h-full flex justify-center">
          <div className="relative rounded-lg shadow-sm bg-gray-800 max-w-[23rem]">
            <div className="p-4 pt-0">
              <div className="mx-auto sm:mx-0 flex justify-center my-5 [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50"></div>
              <label className="text-sm font-medium  text-white mb-2 block">Expire Access IN:</label>
              <main className="max-h-[80px] overflow-y-scroll overflow-x-hidden style-2">
                <ul id="timetable" className="grid w-full grid-cols-3 gap-2 mb-5 ">
                  {expiresValues.map((item, index) => {
                    return (
                      <li key={index}>
                        <input type="radio" id={item.text} value={item.value} className="hidden peer" name="expiresIn" defaultChecked={item.default} onChange={() => setExpiresIn(item.text)} />
                        <label htmlFor={item.text} className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center  border rounded-lg cursor-pointer  border-gray-700  hover:border-gray-600   peer-checked:text-blue-700  text-gray-400 hover:bg-gray-600 peer-checked:bg-blue-900">
                          {item.text}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </main>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setPick(false)} type="button" className="text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
