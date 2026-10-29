
export interface coordinates{
    lat:number,
    lon:number,
    alt:number | null,
    accuracy:number
}

export interface daily{
    index:number,
    time: string,
    maxTemp:number,
    minTemp:number,
    wheater_code:number
    precipitaion_probably: number,
    precipitationHours: number,
    precipitationSum:number
}



export interface hourly{
    hour:number,
    temp:number,
    rain:number,
    precipitaion_probably: number,
    wheater_code:number,
    wind_direction:number,
    wind_speed:number

}
