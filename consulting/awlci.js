var mymap = L.map('mapid').setView([42.360, -71.059], 13);
var markerCasaEsperanza = L.marker([42.326790, -71.075030]).addTo(mymap);
var markerCatholicCharities = L.marker([42.339020,-71.051540]).addTo(mymap);
var markerBHATierney = L.marker([42.3306,-71.0504]).addTo(mymap);
var markerMattahunt = L.marker([42.275820,-71.104090]).addTo(mymap);
var markerGeorgetowne = L.marker([42.258880,-71.144430]).addTo(mymap);

markerCasaEsperanza.bindPopup('<b>Casa Esperanza</b><br><a href="https://www.casaesperanza.org/">View Details</a>');
markerCatholicCharities.bindPopup('<b>Catholic Charities Laboure Center</b><br><a href="https://www.ccab.org/">View Details</a>')
markerBHATierney.bindPopup('<b>BHA: Tierney Learning Center</b><br><a href="https://www.thetierneylearningcenter.org/">View Details</a>')
markerMattahunt.bindPopup('<b>Mattahunt Community Learning Center</b><br><a href="https://www.facebook.com/BCYFMattahunt">View Details</a>')
markerGeorgetowne.bindPopup('<b>Georgetowne Homes</b><br><a href="https://www.georgetownebc.com/">View Details</a>')


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://simplemaps.com/city/boston/neighborhoods">Mapbox</a>, Neighborhood Overlay © <a href="https://data.boston.gov/dataset/boston-neighborhoods1">Analyze Boston</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGlzY2hwaGlsYW50aHJvcHkiLCJhIjoiY2tvbmc4OGFwMDB6MzJvcXJjaG4yZzNhYSJ9.WJqBOQTWXfS57uzStaHl5Q'
}).addTo(mymap);


var prevLayerClicked = null;

function onEachFeature(feature, layer) {
  if (feature.properties.Name == "Somerville") {
    layer.setStyle({color: '#609060'});
  } else if (feature.properties.Name == "Cambridge") {
    layer.setStyle({color: "#609060"});
  }else {
    layer.setStyle({color: "#3388ff"});
  }
  
  
  //bind click
  layer.on('click', function (e) {
    if (prevLayerClicked !== null) {
      if (prevLayerClicked.feature.properties.Name == "Somerville") {
        prevLayerClicked.setStyle({color: '#609060', fillOpacity: ".2"});
      } else if (prevLayerClicked.feature.properties.Name == "Cambridge") {
        prevLayerClicked.setStyle({color: '#609060', fillOpacity: ".2"});
      } else {
        prevLayerClicked.setStyle({color: "#3388ff", fillOpacity: ".2"});
      }
    }
    // e = event
    prevLayerClicked = layer;
    layer.setStyle({color: "gray", fillOpacity: ".7"});
    //extracting all of the necessary data from the GeoJSON file
    neighborhoodName = (feature.properties.Name);
    neighborhoodDemographics = (feature.properties.Demographics);
    neighborhoodAWLCI = (feature.properties.AWLCI);
    //Doing stuff with the necessary data
    console.log(neighborhoodName);
    console.log(neighborhoodDemographics);
    console.log(neighborhoodAWLCI);

    document.getElementById('name').innerHTML = `${neighborhoodName}`;
    document.getElementById('LEP').innerHTML = `${neighborhoodDemographics.LEP} Speakers with Limited English Proficiency`;
    document.getElementById('foreignBorn').innerHTML = `${neighborhoodDemographics.Foreign_Born} Immigrant/Refugee`;
    document.getElementById('race').innerHTML = `${neighborhoodDemographics.Race.Black} Black, ${neighborhoodDemographics.Race.Hispanic_Latinx} Hispanic, ${neighborhoodDemographics.Race.Asian} Asian, ${neighborhoodDemographics.Race.White} White`;
    document.getElementById('income').innerHTML = `Median Household Income: ${neighborhoodDemographics.Median_Household_Income}`
    educationLevel = neighborhoodDemographics.Education;
    document.getElementById('education').innerHTML = `${educationLevel.Less_than_High_School} Less than High School, ${educationLevel.High_School_Some_College} Completed High School, ${educationLevel.College} 4-Year College Degree`;

    
    // You can make your ajax call declaration here
    //$.ajax(... 
  });

  layer.on('mouseover', function (e) {
    layer.setStyle({weight: "5"});
  })

  layer.on('mouseout', function(e) {
    layer.setStyle({weight: "3"});
  })
}

// adding neighborhoods
 /* $.getJSON("Zoning_Districts.geojson",function(hoodData){
  L.geoJson( hoodData, {
    onEachFeature : onEachFeature
  }).addTo(mymap);
  L.geoJson( hoodData ).setStyle({color: "#3388ff"});
}); */

$.getJSON("Boston_Neighborhoods.geojson",function(hoodData){
  L.geoJson( hoodData, {
    onEachFeature : onEachFeature
  }).addTo(mymap);
});

chelseaCircle = L.circle({lat: 42.3918, lng: -71.0328}, {
  color: '#609060',
  fillOpacity: .2,
  radius: 750
}).addTo(mymap);

chelseaCircle.on("Click", function (e) {
  if (prevLayerClicked !== null) {
    if (prevLayerClicked.feature.properties.Name == "Somerville") {
      prevLayerClicked.setStyle({color: '#609060', fillOpacity: ".2"});
    } else if (prevLayerClicked.feature.properties.Name == "Cambridge") {
      prevLayerClicked.setStyle({color: '#609060', fillOpacity: ".2"});
    } else {
      prevLayerClicked.setStyle({color: "#3388ff", fillOpacity: ".2"});
    }
  }

// e = event
  prevLayerClicked = chelseaCircle;
  layer.setStyle({color: "gray", fillOpacity: ".7"});
  //extracting all of the necessary data from the GeoJSON file
  neighborhoodName = "Chelsea";
  neighborhoodDemographics = (feature.properties.Demographics);
  neighborhoodAWLCI = (feature.properties.AWLCI);
  //Doing stuff with the necessary data
  console.log(neighborhoodName);
  console.log(neighborhoodDemographics);
  console.log(neighborhoodAWLCI);

  document.getElementById('name').innerHTML = `${neighborhoodName}`;
  document.getElementById('LEP').innerHTML = `${neighborhoodDemographics.LEP} Speakers with Limited English Proficiency`;
  document.getElementById('foreignBorn').innerHTML = `${neighborhoodDemographics.Foreign_Born} Immigrant/Refugee`;
  document.getElementById('race').innerHTML = `${neighborhoodDemographics.Race.Black} Black, ${neighborhoodDemographics.Race.Hispanic_Latinx} Hispanic, ${neighborhoodDemographics.Race.Asian} Asian, ${neighborhoodDemographics.Race.White} White`;
  document.getElementById('income').innerHTML = `Median Household Income: ${neighborhoodDemographics.Median_Household_Income}`
  educationLevel = neighborhoodDemographics.Education;
  document.getElementById('education').innerHTML = `${educationLevel.Less_than_High_School} Less than High School, ${educationLevel.High_School_Some_College} Completed High School, ${educationLevel.College} 4-Year College Degree`;
})
