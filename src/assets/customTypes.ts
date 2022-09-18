export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface WeatherForecast {
    temperature: Temperature,
    weather: Weather,
    wind: Wind
}

export interface Temperature {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

export interface Weather {
    main: string,
    description: string
}

export interface Wind {
    speed: number,
    deg: number
}