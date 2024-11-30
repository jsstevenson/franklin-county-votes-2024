const MAP_CENTER = [39.96325, -82.99786];
const map = L.map("map").setView(MAP_CENTER, 11);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 18,
	attribution: "© OpenStreetMap contributors",
}).addTo(map);

map.createPane("precinctPane");
map.createPane("linesPane");
map.createPane("stopsPane");

map.getPane("precinctPane").style.zIndex = 400;
map.getPane("linesPane").style.zIndex = 500;
map.getPane("stopsPane").style.zIndex = 600;


const nwLine = {
	type: "Feature",
	geometry: {
		type: "LineString",
		coordinates: [
			[-83.016743, 39.966124],
			[-83.012516, 39.96547],
			[-83.009576, 39.965431],
			[-83.006044, 39.964373],
			[-83.002035, 39.964849],
			[-83.002325, 39.96617],
			[-83.006245, 39.965731],
			[-83.016741, 39.966163],
			[-83.020057, 39.965975],
			[-83.022032, 39.966159],
			[-83.024874, 39.967274],
			[-83.026506, 39.967359],
			[-83.028594, 39.967169],
			[-83.02838, 39.967962],
			[-83.024266, 39.968495],
			[-83.022241, 39.972099],
			[-83.022488, 39.974207],
			[-83.022623, 39.98416],
			[-83.025614, 39.987854],
			[-83.025943, 39.990878],
			[-83.025246, 39.996219],
			[-83.026607, 39.997419],
			[-83.025825, 39.998462],
			[-83.023809, 40.004338],
			[-83.022081, 40.011921],
			[-83.025072, 40.021538],
			[-83.027968, 40.027437],
			[-83.031434, 40.032505],
			[-83.033831, 40.055108],
			[-83.036541, 40.061641],
			[-83.037559, 40.063087],
			[-83.043677, 40.063287],
			[-83.056966, 40.06373],
			[-83.066563, 40.064003],
			[-83.074957, 40.06431],
			[-83.087286, 40.064743],
			[-83.093285, 40.064925],
			[-83.092969, 40.06796],
			[-83.092714, 40.073611],
			[-83.091911, 40.088473],
			[-83.091639, 40.094488],
			[-83.091521, 40.09696],
      [-83.094837, 40.098635],
      [-83.096204, 40.099029],
			[-83.100642, 40.099287],
			[-83.109335, 40.099638],
			[-83.110312, 40.102338],
			[-83.107691, 40.102522],
			[-83.107038, 40.101168],
      [-83.107142, 40.099560],
		],
	},
	properties: {
		name: "Northwest Line",
	},
};

const eastBroadLine = {
	type: "Feature",
	geometry: {
		type: "LineString",
		coordinates: [
			[-82.998525, 39.965268],
			[-83.002129, 39.964849],
			[-83.002337, 39.966176],
			[-82.998759, 39.966587],
			[-82.996805, 39.95645],
			[-82.98204, 39.958096],
			[-82.905382, 39.956301],
			[-82.876844, 39.955466],
			[-82.848543, 39.954646],
			[-82.841641, 39.954679],
			[-82.811908, 39.955082],
			[-82.790676, 39.955531],
			[-82.75966, 39.95616],
		],
	},
	properties: {
		name: "East Broad Line",
	},
};

const westBroadLine = {
	type: "Feature",
	geometry: {
		type: "LineString",
		coordinates: [
			[-82.991043, 39.963311],
			[-82.987079, 39.963787],
			[-82.987619, 39.96652],
			[-82.991573, 39.966063],
			[-82.991043, 39.963311],
			[-82.996246, 39.962732],
			[-83.000633, 39.962224],
			[-83.050709, 39.956177],
			[-83.052865, 39.955999],
			[-83.052883, 39.956031],
			[-83.057975, 39.955705],
			[-83.157133, 39.950981],
		],
	},
	properties: {
		name: "West Broad Line",
	},
};

const stops = [
	// W Broad line
	{ coordinates: [-82.987619, 39.96652], name: "Long St" },
	{ coordinates: [-82.991043, 39.963311], name: "Grant Ave" },
	{ coordinates: [-82.996246, 39.962732], name: "4th St" },
	{ coordinates: [-83.000633, 39.962224], name: "High St" },
	{ coordinates: [-83.008852, 39.961229], name: "Belle St" },
	{ coordinates: [-83.022173, 39.959585], name: "Souder/Davis" },
	{ coordinates: [-83.03815, 39.957671], name: "Central Ave" },
	{ coordinates: [-83.056759, 39.955793], name: "Whitethorne Ave" },
	{ coordinates: [-83.065478, 39.95535], name: "Eureka Ave" },
	{ coordinates: [-83.073943, 39.954945], name: "Hague Ave" },
	{ coordinates: [-83.082819, 39.954529], name: "Westgate Ave" },
	{ coordinates: [-83.09472, 39.953969], name: "Wilson Rd" },
	{ coordinates: [-83.110256, 39.953137], name: "Phillipi Rd/Georgesville Rd" },
	{ coordinates: [-83.123735, 39.952499], name: "Old Village Rd/Grener Ave" },
	{ coordinates: [-83.135606, 39.951954], name: "Gladys Rd/Sturbridge Rd" },
	{ coordinates: [-83.146525, 39.95144], name: "Westwood Blvd" },
	{ coordinates: [-83.157099, 39.950966], name: "Rockbrook Crossing Ave" },
	// E Broad Line
	{ coordinates: [-83.002274, 39.965846], name: "Spring/Long" },
	{ coordinates: [-82.997975, 39.96253], name: "3rd/Broad" },
	{ coordinates: [-82.997064, 39.957789], name: "3rd/Rich" },
	{ coordinates: [-82.98991, 39.95724], name: "Grant Ave" },
	{ coordinates: [-82.976143, 39.95798], name: "18th St" },
	{ coordinates: [-82.969458, 39.957847], name: "Champion Ave" },
	{ coordinates: [-82.858646, 39.957627], name: "Kelton Ave" },
	{ coordinates: [-82.944969, 39.957356], name: "Alum Creek Dr" },
	{ coordinates: [-82.936113, 39.957145], name: "Pleasant Ridge Ave" },
	{ coordinates: [-82.914821, 39.95659], name: "James Rd" },
	{ coordinates: [-82.903697, 39.956255], name: "Maplewood Ave" },
	{ coordinates: [-82.876852, 39.955475], name: "Hamilton Rd" },
	{ coordinates: [-82.857762, 39.954927], name: "Fairway Blvd" },
	{ coordinates: [-82.828735, 39.95481], name: "Brice Rd" },
	{ coordinates: [-82.806762, 39.955176], name: "Haft Dr" },
	{ coordinates: [-82.771542, 39.955949], name: "Taylor Rd" },
	{ coordinates: [-82.75966, 39.95616], name: "Eastwood Dr" },
	// NW Line
	{ coordinates: [-83.009803, 39.96586], name: "Neil Ave" },
	{ coordinates: [-83.022488, 39.974207], name: "Goodale Ave" },
	{ coordinates: [-83.022623, 39.98416], name: "3rd Ave" },
	{ coordinates: [-83.025943, 39.990878], name: "King Ave" },
	{ coordinates: [-83.025825, 39.998462], name: "OSUMC" },
	{ coordinates: [-83.023809, 40.004338], name: "Woody Hayes/Lane" },
	{ coordinates: [-83.025072, 40.021538], name: "University Village" },
	{ coordinates: [-83.027968, 40.027437], name: "Union/Kohls" },
	{ coordinates: [-83.031434, 40.032505], name: "Riverside Hospital" },
	{ coordinates: [-83.033831, 40.055108], name: "Olentangy Commons" },
	{ coordinates: [-83.036541, 40.061641], name: "Bethel P&R" },
	{ coordinates: [-83.043677, 40.063287], name: "Jasonway Ave/Bethel" },
	{ coordinates: [-83.056966, 40.06373], name: "Godown Rd" },
	{ coordinates: [-83.066563, 40.064003], name: "Reed Rd" },
	{ coordinates: [-83.074957, 40.06431], name: "Dierker Rd" },
	{ coordinates: [-83.087286, 40.064743], name: "idk even" },
	{ coordinates: [-83.092969, 40.06796], name: "community center?" },
	{ coordinates: [-83.092714, 40.073611], name: "Case Rd" },
	{ coordinates: [-83.091911, 40.088473], name: "Tuller Pkwy" },
	{ coordinates: [-83.091639, 40.094488], name: "Martin Rd" },
	{ coordinates: [-83.100642, 40.099287], name: "Shamrock Blvd" },
	{ coordinates: [-83.107038, 40.101168], name: "Bridge Park" },
];

const nwLineFeature = L.geoJSON(nwLine, {
  pane: "linesPane",
	style: {
		color: "black",
		weight: 5,
	},
	onEachFeature: (feature, layer) => {
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(`<b>${feature.properties.name}</b>`);
		}
	},
}).addTo(map);

const eastBroadLineFeature = L.geoJSON(eastBroadLine, {
  pane: "linesPane",
	style: {
		color: "black",
		weight: 5,
	},
	onEachFeature: (feature, layer) => {
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(`<b>${feature.properties.name}</b>`);
		}
	},
}).addTo(map);

const westBroadLineFeature = L.geoJSON(westBroadLine, {
  pane: "linesPane",
	style: {
		color: "black",
		weight: 5,
	},
	onEachFeature: (feature, layer) => {
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(`<b>${feature.properties.name}</b>`);
		}
	},
}).addTo(map);


//const stopsFeature = L.geoJSON(stops, {
//  pane: "stopsPane",
//	pointToLayer: (feature, latlng) => {
//		return L.circleMarker(latlng, {
//			radius: 8,
//			color: "black",
//			fillColor: "yellow",
//			fillOpacity: 0.9,
//		});
//	},
//	onEachFeature: (feature, layer) => {
//		if (feature.properties && feature.properties.name) {
//			layer.bindPopup(`<b>Bus Stop:</b> ${feature.properties.name}`);
//		}
//	},
//}).addTo(map);

stops.forEach((stop) => {
  const stopGraphic = L.circle(stop.coordinates, {
    color: "black",
    radius: 8,
    fillColor: "yellow",
    fillOpacity: 0.9
  }).addTo(map);
})

const ABS_COLORS = [
	"#347ABE",
	"#5D95CB",
	"#86AFD8",
	"#F68895",
	"#F26071",
	"#EE384C",
	"#FFFFFF",
];

const loadJson = (filename) => {
	return fetch(filename).then((response) => {
		if (!response.ok) {
			throw new Error(
				`Unable to load file ${filename}: ${response.statusText}`,
			);
		}
		return response.json();
	});
};

const addVoteFeatures = () => {
	loadJson("precinct_shapes.json").then((precinctShapes) =>
		loadJson("./assets/2024_general_issue_47_votes.json").then((votes) => {
			const voteTable = {};
			votes.forEach((vote) => {
				voteTable[vote.precinct_name] = {
					totalVotes: vote.yes_47 + vote.no_47 + vote.blank_47,
					yesVotes: vote.yes_47,
				};
			});
			const thresholds = [0.0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875];

			const colorByOctile = (num) => {
				return num > thresholds[6]
					? ABS_COLORS[0]
					: num > thresholds[5]
						? ABS_COLORS[1]
						: num > thresholds[4]
							? ABS_COLORS[2]
							: num > thresholds[3]
								? ABS_COLORS[3]
								: num > thresholds[2]
									? ABS_COLORS[4]
									: num > thresholds[1]
										? ABS_COLORS[5]
										: num > thresholds[0]
											? ABS_COLORS[6]
											: ABS_COLORS[7];
			};

			L.geoJSON(precinctShapes, {
        pane: "precinctPane",
				style: (feature) => {
					const precinctId = feature.properties.NAME;
					const votes = voteTable[precinctId];
					const ratio = votes.yesVotes / votes.totalVotes || 0;
					return {
						color: "#3388FF",
						weight: 1,
						fillColor: colorByOctile(ratio),
						fillOpacity: 0.8,
					};
				},
				onEachFeature: (feature, layer) => {
					if (feature.properties) {
						const { NAME, PRECINCTID } = feature.properties;
						const votes = voteTable[NAME];
						const ratio = votes.yesVotes / votes.totalVotes || 0;
						layer.bindPopup(`
            <b>Precinct id:</b> ${PRECINCTID}<br>
            <b>Name:</b> ${NAME}<br>
            <b>Yes Pct:</b> ${(ratio * 100).toFixed(2)}%<br>
            <b>Yes Votes:</b> ${votes.yesVotes}<br>
            <b>Total Votes:</b> ${votes.totalVotes}
          `);
					}
				},
			}).addTo(map);
		}),
	);
};

addVoteFeatures();
