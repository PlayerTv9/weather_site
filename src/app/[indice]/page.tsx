'use client'

import HourlyComponent from "@/components/HourlyComponent";
import LateralDayComponent from "@/components/LateralDayComponent";
import { daily,hourly } from "@/lib/dataClasses";
import { getCoordinates } from "@/lib/getCoordinates";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {Temporal} from "@js-temporal/polyfill"

type Props = {
    params: Promise<{indice:string}>
}

export default function MeteoPage({params}: Props) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [day,setDay] = useState('');
  const [days, setDays] = useState<daily[]>();
  const [hours, setHours] = useState<hourly[]>();

  useEffect(()=>{
    async function setAll() {
      setLoading(true);
      try{
          /*const res = await fetch('/api/coords', {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
          });
          const coords = await res.json();

          if(!res.ok) throw new Error("Errore nel recupero delle coordinate"+coords.error);

          const {lon, lat} = coords;*/
          const coords = await getCoordinates();
          const {indice} = await params;
          if (coords===undefined || typeof coords === "string" ) {
              throw new Error(coords);
          }
          let {lat,lon,alt} = coords;
          setCoordinates(`Lat: ${lon.toFixed(2)}°, Lon: ${lat.toFixed(2)}°, Alt: ${alt?.toFixed(2)} m`);
          alt = alt ?? 10;
          const responce = await fetch('/api/weather/daily', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({lat,lon,alt, indice})
          });
          const data = await responce.json();
          if (responce.status===500) {
            throw new Error(data.error);
          }

          setDays(data.days);
          setHours(data.hours)

          const index_int = Number.parseInt(indice);
          const selectDay = data.days?.[index_int];
          console.log(selectDay?.time);

          const date = selectDay ?
          Temporal.PlainDate.from(selectDay.time).toLocaleString(
                    "it-IT", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
          ) : "Weather app"
          setDay(date);

      }catch(e:any){
        setError(e.message);
      }finally{
        setLoading(false);
      }


    }
    setAll();
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{day}</h1>
        <span className="text-slate-400">{coordinates}</span>
      </header>
      <main className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-200">
            {error}
          </div>
        )}
        {loading && (
          <h2 className="lg:col-span-2">Caricamento...</h2>
        )}



    <aside className="min-w-0 rounded-xl bg-slate-900 p-2">
    <h2 className="mb-3 px-1 text-sm font-semibold">
            Previsioni settimanali
          </h2>
          <div className="space-y-2">
          {days?.map((d)=>{
            return (
              <LateralDayComponent
              key={d.time}
              d={d}
              onClick={
                ()=>{
                  redirect(`/${d.index}`);
                }
              }
              />
            );
          })}
          </div>
          </aside>
          <div className="space-y-2">
          {hours?.map((h)=>{
            return(
              <HourlyComponent key={h.hour} h={h}/>
            )
          })}
        </div>

      </main>
    </div>
  );
}
