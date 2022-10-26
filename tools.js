export class Tools {
  constructor() {

    this.todayW = document.querySelector("#current > .current-w");
    this.pronostic = document.getElementById("pronostic");

  }

  newMainCard(data, imgPath) {
    
    this.todayW.innerHTML = `
      <div class="current-img"><img src="${imgPath}"></div>
      <h2>${Math.floor(data.main.temp)}<span class="units">°C</span></h2>
      <h4>${data.weather[0].main}</h4>
      <div class="date-cont"><span>Today</span> . <span id="date">${this.getDateFormated()}</span></div>
      <div class="location">
        <span><i class="fa-solid fa-location-dot"></i></span>
        <span id="city">${data.name}</span>
      </div>
    `

  }

  addPronosticNode(textNodo) {
    this.pronostic.innerHTML += textNodo;
  }
  
  getDateFormated(date) {
    const d = date ?  new Date(date) : new Date();
    let formated = d.toDateString().split(" ");
    return `${formated[0]}, ${formated[2]} ${formated[1]}`
  }



  newNextDay(data, imgPath) {
    return `
      <div class="pron-day">
        <h2>${this.getDateFormated(data.dt)}</h2>
        <div><img src="${imgPath}" alt=${data.weather[0].main}/></div>
        <div class="pron-minmax">
          <p class="pron-max">${Math.floor(data.main.temp_max)}<span class="units">°C</span></p>
          <p class="pron-min">${Math.floor(data.main.temp_min)}<span class="units">°C</span></p>
        </div>

      </div>
    `
  }
}