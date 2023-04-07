function getImage() {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature&query=mountain&query=river&query=sea&query=waterfall")
      .then(res => res.json())
      .then(data => {
        // Get the date that this data is fetched then save it to localStorage
        const now = new Date();
        localStorage.setItem("lastDay", now.toISOString());
  
        const unsplashImg = data.urls.raw;
        localStorage.setItem("unsplashImg", JSON.stringify(unsplashImg));
        document.body.style.backgroundImage = `url(${unsplashImg})`;
      });
  }
  
  function getText() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '46d9a87b62msh7d5ccbba92783a7p1fe488jsn108bd7cff636',
        'X-RapidAPI-Host': 'uncovered-treasure-v1.p.rapidapi.com'
      }
    };
  
    fetch('https://uncovered-treasure-v1.p.rapidapi.com/random', options)
      .then(response => response.json())
      .then(data => {
        const text = data.results[0].text;
        const context = data.results[0].scriptures[0];
  
        localStorage.setItem("textOfTheDay", JSON.stringify(text));
        localStorage.setItem("contextOfTheDay", JSON.stringify(context));
  
        document.getElementById("header").innerHTML = `
          <h3 id="random-text-context">${context}</h3>
          <h1 id="random-text">"${text}"</h1>
        `;
      })
      .catch(err => console.error(err));
  }
  
  function checkAndUpdate() {
    // Get time at the moment
    const now = new Date();
    const currentDay = now.getDate();
    const currentHour = now.getHours();
  
    // Add content to localStorage for it to display it until it is fetched again
    const unsplashImg = JSON.parse(localStorage.getItem("unsplashImg"));
    const text = JSON.parse(localStorage.getItem("textOfTheDay"));
    const context = JSON.parse(localStorage.getItem("contextOfTheDay"));
  
    // Get time from yesterday for comparison
    const lastDay = new Date(localStorage.getItem("lastDay"));
    const lastUpdateDay = lastDay.getDate();
  
    if (currentHour >= 8 && currentDay > lastUpdateDay) {
      // Fetch the data and update the page
      getImage();
      getText();
      // Update the lastDay in localStorage
        localStorage.setItem("lastDay", JSON.stringify(now));

    } else {
      // Set the background image
      document.body.style.backgroundImage = `url(${unsplashImg})`;
  
      // Set the header text
      const header = document.getElementById("header");
      header.innerHTML = `
        <h3 id="random-text-context">${context}</h3>
        <h1 id="random-text">"${text}"</h1>
      `;
    }
  }
  
  setInterval(checkAndUpdate, 1000);
  