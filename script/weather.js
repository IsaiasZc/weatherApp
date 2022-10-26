const KEY = '31b886c84c9c9db98eeba6960d675bee';
// const CW_URL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${KEY}`

export class Weather {
  constructor() {
    this.geo = navigator.geolocation;
    this.imgs = {
      simple: {
        "2xx": "Thunderstorm",
        "3xx": "Lightrain",
        "5xx": "Heavyrain",
        "6xx": "Snow",
        "7xx": "HeavyCloud",
        "80x": "HeavyCloud",
      },
      special: {
        "511": "Sleet",
        "800": "Clear",
        "801": "LightCloud",
      }
    
    }
  }

  getPosition() {
    return new Promise((res) => {
      this.geo.getCurrentPosition(res);
    }).then(obj => obj)
  }

  async getWeather(data, by="geo") {

    let cw_url;
    
    switch (by) {
      case "geo":
        const {latitude, longitude } = data.coords;
        cw_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`
        break
      case "place":
        cw_url = ``
        break

    }

    const datos = await axios.get(cw_url).then((json) => json.data);

    return datos

  };


  async getNextDays(data, day, by="geo") {

    let nw_url;

    switch(by) {

      case "geo":

        const {latitude, longitude } = data.coords;

        nw_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`
        break
      case "place":
        break
    }

    let currentDay = day;
    let maxDays = 5;
    const datos = await axios.get(nw_url).then((json) => {
      return json
            .data
            .list
            .filter((we) => {
              let futureDay = we.dt_txt.substring(8,10);
              if (currentDay != futureDay && maxDays) {
                maxDays--;
                currentDay = futureDay;
                return we
              }
            })
    });

    console.log(datos);
    return datos

  }


  getImagePath(data) {

    let id = data.weather[0].id;

    for (let key in this.imgs.special) {
      if(key === id.toString()) {
        return `./img/${this.imgs.special[key]}.png`
      }
    }

    for (let key in this.imgs.simple) {

      if(key[0] === id.toString()[0]) {
        return `./img/${this.imgs.simple[key]}.png`
      }
    }
    
  }

  // getTest() {
  //   const URL = "https://jsonplaceholder.typicode.com/users";

  //   const result =  axios.get(URL).then(response => response);

  //   return result;

  // }
}

