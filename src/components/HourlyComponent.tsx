import { hourly } from "@/lib/dataClasses";
import { fetchWeaterCode, fetchWindSpeed } from "@/lib/fetchWeaterCode";

interface Props{
    h:hourly
}

export default function HourlyComponent({h}:Props) {
    return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-800 px-3 py-2">

            <p className="shrink-0 text-sm font-medium">
              {h.hour}
            </p>
            <p className="min-w-0 flex-1 truncate text-xs text-slate-400">
              {fetchWeaterCode(h.wheater_code)}
            </p>
             <p className="min-w-0 flex-1 truncate text-xs text-slate-400">
              {h.wind_speed.toFixed(2)} km/h
            </p>
            <p className="min-w-0 flex-1 truncate text-xs text-slate-400">

              {fetchWindSpeed(h.wind_direction)} ({h.wind_direction.toFixed(2)}°)
            </p>
             <p className="text-sm font-semibold">
              {h.temp.toFixed(2)}°
            </p>

            <p className="shrink-0 text-xs text-slate-400">
              Pioggia: {h.precipitaion_probably}%
            </p>


            <p className="text-xs text-slate-400">
              💧{h.rain.toFixed(2)} mm
            </p>
            </div>
        );
}
