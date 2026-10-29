import { daily } from "@/lib/dataClasses";
import { fetchDay, fetchWeaterCode } from "@/lib/fetchWeaterCode";
import { Temporal } from "@js-temporal/polyfill";
import { useEffect } from "react";

interface Props{
    d:daily,
    onClick: ()=>void
}

export default function LateralDayComponent({d, onClick}:Props) {
    const dayOfTheWeek = Temporal.PlainDate.from(d.time).dayOfWeek;


    return (
<div className="flex items-center justify-between gap-2 rounded-lg bg-slate-800 px-2 py-1 hoover:translate-x-1 translate-y-1" onClick={()=>onClick()}>
  <div className="min-w-0">
        <p className="text-sm font-medium">
          {fetchDay(dayOfTheWeek)}
        </p>
        <p className="truncate text-xs text-slate-400">
          {fetchWeaterCode(d.wheater_code)}
        </p>
        <p className="text-xs text-slate-400">
          Pioggia: {d.precipitaion_probably}%
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold">
          {d.maxTemp.toFixed(2)}°
        </p>
        <p className="text-xs text-slate-400">
          {d.minTemp.toFixed(2)}°
        </p>
      </div>
        </div>
    );
}
