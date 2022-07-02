const weatherAPP = (() => {
    const API = {
        weather: {
            addr: 'https://api.openweathermap.org/data/2.5/weather',
            key: '775f80930103eb948ca48290efbf90f1',
        },
        giphy: {
            addr: 'oso',
            key: '',
        },
    };
    const fetchWeatherAPI = ({
        country,
        lat = 0,
        lon = 0,
        lang = 'eng',
        units = 'metric',
    } = {}) => {
        // console.log(country);
        const url = `${API.weather.addr}?APPID=${API.weather.key}${
            country ? `&q=${country}` : `&lat=${lat}&lon=${lon}`
        }&units=${units}&lang=${lang}`;
        // console.log('url', url);
        return fetch(url)
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                } else {
                    throw new Error(`http response: ${resp.statusText}`);
                }
            })
            .then((data) => data.json())
            .catch((errMsg) => {
                throw new Error(errMsg.message);
            });
    };
    const getWeather = (options) => {
        return fetchWeatherAPI(options)
            .then((data) => data)
            .catch((errMsg) => {
                throw new Error(errMsg.message);
            });
    };
    const fetchGiphyAPI = ({word = 'sunny'} = {}) => {
        // console.log(country);
        const url = `${API.giphy.addr}?APPID=${API.giphy.key}&word=${word}`;
        // console.log('url', url);
        return fetch(url)
            .then((resp) => {
                if (resp.ok) {
                    return resp;
                } else {
                    throw new Error(`http response: ${resp.statusText}`);
                }
            })
            .then((data) => data.json())
            .catch((errMsg) => {
                throw new Error(errMsg.message);
            });
    };
    const getWeatherGIF = async () => {
        try {
            return await fetchGiphyAPI(options);
        } catch (err) {
            throw new Error(errMsg.message);
        }
    };

    //MEH
    // const getUserGeo = () => {
    //     let coords = {};
    //     let resp = navigator.geolocation.getCurrentPosition((result) => {
    //         Window.globalResult = result;
    //     });

    //     return resp;
    // };

    return {fetchWeatherAPI, getWeather, getWeatherGIF};
})();

const weatherAPP_DOM = (() => {
    const displayWeatherGIF = () => {};
    const displayWeather = () => {};

    return {displayWeather, displayWeatherGIF};
})();

weatherAPP
    .getWeather({country: 'London'})
    .then(async (data) => {
        console.log(data.weather[0].description);
        weatherAPP_DOM.displayWeather(data);
        const gifURL = {};
        try {
            gifURL = await weatherAPP.getWeatherGIF(
                data.weather[0].description
            );
        } catch (e) {
            throw new Error(e.message);
        }
        weatherAPP_DOM.displayWeatherGIF(gifURL);
    })
    .catch((errMsg) => {
        console.error(errMsg.message);
    });
// weatherAPP.getUserGeo();
// console.log(weatherAPP.getUserGeo());
