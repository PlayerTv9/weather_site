import { Temporal } from "@js-temporal/polyfill"

export function fetchWeaterCode(code:number) {
    switch (code) {
        case 0:
                return "☀️ Cielo sereno"
            case 1:
                return "🌤️ Prevalentemente sereno"
            case 2:	    return "⛅ Parzialmente nuvoloso"
            case 3:	    return "☁️ Coperto"
            case 45:	return "🌫️ Nebbia"
            case 48:	return "🌫️ Nebbia con brina"
            case 51:	return "🌦️ Pioviggine debole"
            case 53:	return "🌦️ Pioviggine moderata"
            case 55:	return "🌧️ Pioviggine intensa"
            case 56:	return "🌧️ Pioviggine gelata debole"
            case 57:	return "🌧️ Pioviggine gelata intensa"
            case 61:	return "🌧️ Pioggia debole"
            case 63:	return "🌧️ Pioggia moderata"
            case 65:	return "🌧️ Pioggia intensa"
            case 66:	return "🧊 Pioggia gelata debole"
            case 67:	return "🧊 Pioggia gelata intensa"
            case 71:	return "🌨️ Neve debole"
            case 73:	return "🌨️ Neve moderata"
            case 75:	return "❄️ Neve intensa"
            case 77:	return "❄️ Granelli di neve"
            case 80:	return "🌦️ Rovesci di pioggia deboli"
            case 81:	return "🌧️ Rovesci di pioggia moderati"
            case 82:	return "⛈️ Rovesci di pioggia violenti"
            case 85:	return "🌨️ Rovesci di neve deboli"
            case 86:	return "❄️ Rovesci di neve intensi"
            case 95:	return "⛈️ Temporale"
            case 96:	return "⛈️ Temporale con grandine debole"
            case 99:	return "⛈️ Temporale con grandine intensa"
        default:
            return `Unknown value: ${code}`
    }
}


export function fetchDay(date:number) {
    const today = Temporal.Now.plainDateISO();
    const toadyWeeekDay = today.dayOfWeek;
    if (date===toadyWeeekDay) {
        return "Oggi";
    }else if(date===toadyWeeekDay+1){
        return "Domani";
    }else{
        switch (date) {
            case 1:
                return "Lunedì";
            case 2:
                return "Martedì";
            case 3:
                return "Mercoledì";
            case 4:
                return "Giovedì";
            case 5:
                return "Venerdì";
            case 6:
                return "Sabato";
            case 7:
                return "Domenica";

            default:
                return "Errore"

        }
    }
}


export function fetchWindSpeed(speed:number) {
    let arrows = new Map<number,string>();
    arrows.set(0, "⬆️")
    arrows.set(45, "↗️")
    arrows.set(90, "➡️")
    arrows.set(135, "↘️")
    arrows.set(180, "⬇️")
    arrows.set(225, "↙️")
    arrows.set(270, "⬅️")
    arrows.set(315, "↖️")


    let index = arrows.keys().reduce((prev, curr)=>Math.abs(curr-speed) < Math.abs(prev-speed) ? curr : prev);
    if(speed>=330)
        index = 0;
    return arrows.get(index)!


}
