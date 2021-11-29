import React, {useState} from "react";
import './main.css';

function App() {

    const api = {
        key: '2585baa1b178f6da933cca8b4edfd3b7',
        base: 'https://api.openweathermap.org/data/2.5/'
    }

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [error, setError] = useState({isError: false, message: ''})

    const handleChangeQuery = (e) => {
        setQuery(e.target.value);
    };

    const handleChangeCountry = (e) => {
        e.preventDefault();
        setQuery(query);

        fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
                if (result.cod >= 200 && result.cod < 400) {
                    setError({isError: false, message: ''})
                    setWeather(result);
                    setQuery('')
                } else {
                    setWeather({})
                    setError({isError: true, message: result.message})
                }
            })
            .catch(e => {
                setError({isError: true, message: 'try again please'})
            });
    };

    return (

        <div className={(weather.main && weather.main.temp > 18) ? 'App App-warm': 'App'}>
            <form className="weather-form" onSubmit={handleChangeCountry}>
                <input
                    type="text"
                    value={query}
                    onChange={handleChangeQuery}
                    placeholder="Search weather"
                    className="weather-form__input"
                />
                <button className="weather-form__submit" type="submit">Search</button>
            </form>

            {(typeof weather.main != 'undefined')
                ?
                <div className="weather-info">
                    <div className="weather-info__location">{weather.name}, {weather.sys.country}</div>
                    <div className="weather-info__temp">{Math.round(weather.main.temp)} &#8451;</div>
                    <div className="weather-info__state">{weather.weather[0].main}</div>
                </div>
                :
                <div className="error-block ">{error.message}</div>
            }
        </div>

    );
}

export default App;