 // Creating map object
var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3
  }); 
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  }).addTo(map);
  
  
  // Uncomment this link local geojson for when data.beta.nyc is down
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
//var schoolpath =window.location.origin.concat("/schools");
console.log("earthquakes initiated");



function magColor(magnitude){
    if(magnitude < 1){
      return "#ccff33"
    }
    else if (magnitude < 2) {
      return "#ffff33"
    }
    else if (magnitude < 3) {
      return "#ffcc33"
    }
    else if (magnitude < 4) {
      return "#ff9933"
    }
    else if (magnitude < 5) {
      return "#ff6633"
    }
    else {
      return "#ff3333"
    }
  }

  d3.json(link, data => {
    console.log(data.features);
    data.features.forEach(d => {
        L.circleMarker([d.geometry.coordinates[1], d.geometry.coordinates[0]], {
            fillOpacity: 0.9,
            color: 'black',
            weight: 1,
            fillColor: magColor(d.properties.mag),
            radius: d.properties.mag * 3
        }).bindPopup("Magnitude: " + d.properties.mag
                        + "<br>Location: " + d.properties.place).addTo(map);
    });

    function legendColor(d) {
        return d > 5 ? '#ff3333' :
               d > 4  ? '#ff6633' :
               d > 3  ? '#ff9933' :
               d > 2  ? '#ffcc33' :
               d > 1  ? '#ffff33' :
                        '#ccff33';
      }

//Legend
      var legend = L.control({position: 'bottomright'});
      legend.onAdd = function (map) {
      
          var div = L.DomUtil.create('div', 'info legend'),
              magnitudes = [0, 1, 2, 3, 4, 5],
              labels = [];
          for (var i = 0; i < magnitudes.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + legendColor(magnitudes[i] + 1) + '"></i> ' +
                  magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
          }
      
          return div;
      };
    legend.addTo(map);
});