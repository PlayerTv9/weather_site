import { NextRequest, NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo"

import { daily, hourly } from "@/lib/dataClasses";

export async function POST(request:NextRequest) {

    try{
        const {lat,lon,alt, indice} = await request.json();
        const day = Number.parseInt(indice)*24;


        const altitudes = [10,80,120,180];
        const realtAlt = altitudes.reduce((prev, cur)=>Math.abs(cur-alt)<Math.abs(prev-alt) ? cur : prev);



        const params = {
            latitude: lat,
	        longitude: lon,
            daily: ["weather_code", "precipitation_hours", "precipitation_probability_max", "precipitation_sum", "temperature_2m_max", "temperature_2m_min"],
            hourly: ["temperature_2m","rain","precipitation_probability","weather_code",`wind_speed_${realtAlt}m`, `wind_direction_${realtAlt}m`],
            forecast_days: 7,

        }
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        const responce = responses[0];
        const daily = responce.daily();
        const hourly = responce.hourly();

        if(daily===null)throw new Error("Non sono state trovate previsioni meteo giornaliere");
        if(hourly===null)throw new Error("Non sono state trovate previsioni meteo del giorno selezionato");

        const days:daily[] = Array.from(
            {length: 7},
            (_, i)=>({
                index: i,
                time: daily?.time !== null ? new Date((Number(daily?.time())! +i*daily!.interval())*1000).toISOString().slice(0,10) : "",
                wheater_code: daily?.variables(0)?.valuesArray()?.[i] ?? 0,
                precipitationHours: daily?.variables(1)?.valuesArray()?.[i] ?? 0,
                precipitaion_probably: daily?.variables(2)?.valuesArray()?.[i] ?? 0,
                precipitationSum: daily?.variables(3)?.valuesArray()?.[i] ?? 0,
                maxTemp: daily?.variables(4)?.valuesArray()?.[i] ?? 0,
                minTemp: daily?.variables(5)?.valuesArray()?.[i] ?? 0,

            })
        )



        const hours:hourly[] = Array.from(
            {length: 24},
            (_, i)=>({
                hour: i+1,
                temp: hourly.variables(0)?.valuesArray()?.[i+day] ?? 0,
                rain: hourly.variables(1)?.valuesArray()?.[i+day] ?? 0,
                precipitaion_probably: hourly.variables(2)?.valuesArray()?.[i+day] ?? 0,
                wheater_code: hourly.variables(3)?.valuesArray()?.[i+day] ?? 0,
                wind_speed: hourly.variables(4)?.valuesArray()?.[i+day] ?? 0,
                wind_direction: hourly.variables(5)?.valuesArray()?.[i+day] ?? 0,
            })


        )
        return NextResponse.json({
            days,
            hours
        });




    }catch(e:any){
        return NextResponse.json({error: e.message}, {status: 500})
    }

}
