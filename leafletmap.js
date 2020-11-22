//Loading of base layer from OSM

var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '<a href = "https://areskidrissa.cc" target = "_blank">areskidrissa.cc</a> Map data &copy; <a href="https://www.openstreetmap.org/" target = "_blank">OpenStreetMap</a> contributors, ' +
	'<a href="https://creativecommons.org/licenses/by-sa/2.0/" target = "_blank">CC-BY-SA</a>',
	})
;

//Construction des marqueurs points

var pointToLayer = function (feature, latlng) {
	var myIcon = ""
	if (feature.geometry.type = 'Point') {
		if (feature.properties.iconUrl !== null) {
			myIcon = new L.icon ({
				iconUrl: feature.properties.iconUrl,
				iconSize: [30, 30]
			})
		}
		else {myIcon = new L.Icon.Default ()
		}
	}
	//console.log(myIcon)
	return L.marker(latlng, {icon: myIcon})
};

//Construction des popup

var onEachFeature = function (feature, layer) {
	var popup_content = ""
	if (feature.properties.name) {
		popup_content +='<p><b>' + feature.properties.name + '</b></p>'}
	if (feature.properties.description) {
		popup_content += '<p>' + feature.properties.description + '</p>'}
	if (feature.properties.url) {
			popup_content += '<p> <a href=' + feature.properties.url + ' target=_blank>' + feature.properties.url + '</a></p>'}
	layer.bindPopup(popup_content)
	//console.log(popup_content)
};

// Passage en vert de chaque objet

var style = function(geo) {
	return {color: "green"}
};


// Construction de mes couches par catégorie avec fonction filter

var bars = new L.geoJson(data, {
	filter: function(feature, layer) {
		return (feature.properties.category === "Bars et cafés");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature,
	style: style
});

var urbex = new L.geoJson(data, {
	filter: function(feature, layer) {
		return (feature.properties.category === "Urbex");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature,
	style: style
});

var divers = new L.geoJson(data, {
	filter: function(feature, layer) {
		return (feature.properties.category === "Divers");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature,
	style: style
});

var balades = new L.geoJson(data, {
	filter: function(feature, layer) {
		return (feature.properties.category === "Balades");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature,
	style: style
});

var danse = new L.geoJson(data, {
	filter: function(feature, layer) {
		return (feature.properties.category === "Danse & musique");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature,
	style: style
});

var activites = new L.geoJson(data, {
	filter: function(feature, layer) {
		return (feature.properties.category === "Activités");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature,
	style: style
});

var streetfood = new L.geoJson(data, {
	filter: function(feature, layer) {
		return (feature.properties.category === "Street food");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature,
	style: style
});

var restaurants = new L.geoJson(data, {
	filter: function(feature, layer) {
		return (feature.properties.category === "Restaurants");
	},
	pointToLayer: pointToLayer,
	onEachFeature: onEachFeature,
	style: style
});

var mymap = L.map('mapid', {
	center: [45.757523270000576, 4.831581115722656],
	zoom: 13,
	layers: [bars, urbex, divers, balades, danse, activites, streetfood, restaurants]
});

// Construction de ma liste de couches

var overlayMaps = {
	//"Toutes catégories": toutes_layer,
	"Bars et cafés": bars,
	"Urbex": urbex,
	"Divers": divers,
	"Balades": balades,
	"Danse et musique": danse,
	"Activités": activites,
	"Street food": streetfood,
	"Restaurants": restaurants
};

// Ajout à la carte du fond de carte et du controle de couches

osm_layer.addTo(mymap);
L.control.layers(null, overlayMaps, {collapsed: false}).addTo(mymap);