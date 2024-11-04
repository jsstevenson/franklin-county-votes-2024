const MAP_CENTER = [39.96325, -82.99786];
const map = L.map("map").setView(MAP_CENTER, 11);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 18,
	attribution: "© OpenStreetMap contributors",
}).addTo(map);

const HEAT_COLORS = [
  "#800026", "#BD0026", "#E31A1C", "#FC4E2A", "#FD8D3C", "#FEB24C", "#FED976", "#FFFFFF"
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
		loadJson("votes.json").then((votes) => {
			const voteTable = {};
			votes.forEach((vote) => {
				voteTable[vote.id] = vote.biden;
			});

			const colorByTotal = (count) => {
				return count > 1000
					? HEAT_COLORS[0]
					: count > 500
						? HEAT_COLORS[1]
						: count > 200
							? HEAT_COLORS[2]
							: count > 100
								? HEAT_COLORS[3]
								: count > 50
									? HEAT_COLORS[4]
									: count > 20
										? HEAT_COLORS[5]
										: count > 10
											? HEAT_COLORS[6]
											: HEAT_COLORS[7];
			};

			L.geoJSON(precinctShapes, {
				style: (feature) => {
					const precinctId = feature.properties.NAME;
					const votes = voteTable[precinctId] || 0;
					return {
						color: "#3388FF",
						weight: 1,
						fillColor: colorByTotal(votes),
						fillOpacity: 0.6,
					};
				},
				onEachFeature: (feature, layer) => {
					if (feature.properties) {
						const { NAME, PRECINCTID } = feature.properties;
						const votes = voteTable[NAME] || 0;
						layer.bindPopup(`
            <b>Precinct id:</b> ${PRECINCTID}<br>
            <b>Name:</b> ${NAME}<br>
            <b>Votes:</b> ${votes}
          `);
					}
				},
			}).addTo(map);
		}),
	);
};

addVoteFeatures();
