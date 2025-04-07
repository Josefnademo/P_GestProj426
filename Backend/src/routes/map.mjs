const map = L.map("map").setView([46.523268, 6.615687], 13);                                    //Map to center the map on the ETML coordinates by default

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {                   //Tiles to use for the map    
  maxZoom: 20,                                                                                  //
  attribution:                                                                                  //
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',                //
}).addTo(map);                                                                                  //Add to map

const pathToJson = "/static/sites.json";

async function fetchAndDisplaySites() {                                                         //Async function to fetch the JSON file and display the sites on the map
  try {
    const res = await fetch(pathToJson);                                                        //Get the JSON
    if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
    const sites = await res.json();                                                             //Pas besoin de JSON.se(), fetch().json() le fait déjà

    for (const site of sites) {                                                                 //For each site in the JSON

      L.circle([site.coordinates.lat, site.coordinates.lon], {                                  //Create a circle at the coordinates of the site
        radius: 1,                                                                              //
        color: "red",                                                                           //
      })                                                                                        //
        
        .addTo(map)                                                                             //Adds a popup to the site that shows the title and a description-
        .bindPopup(                                                                             //when clicked
          "<b>" +
            site.site +
            "</b>" +
            "<br>" +
            '<p style="text-overflow: ellipsis; max-height: 00px; white-space: nowrap; max-width: 300px; overflow: hidden;">' +
            site.short_description +
            "</p>"
        );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des sites:", error);
  }
}

//Call the function when page is loaded
fetchAndDisplaySites();
