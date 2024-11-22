const MAP_CENTER = [39.96325, -82.99786];
const map = L.map("map").setView(MAP_CENTER, 11);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 18,
	attribution: "© OpenStreetMap contributors",
}).addTo(map);

const ABS_COLORS = [
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
		loadJson("./assets/2024_general_issue_47_votes.json").then((votes) => {
			const voteTable = {};
			votes.forEach((vote) => {
				voteTable[vote.precinct_name] = vote.yes_47 / (vote.yes_47 + vote.no_47 + vote.blank_47);
			});

			const values = Object.values(voteTable);
			const maxVotes = Math.max(...values);
      const thresholds = [0.0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875];

      console.log(thresholds);

			const colorByOctile = (count) => {
				return count > thresholds[6]
					? ABS_COLORS[0]
					: count > thresholds[5]
					? ABS_COLORS[1]
					: count > thresholds[4]
					? ABS_COLORS[2]
					: count > thresholds[3]
					? ABS_COLORS[3]
					: count > thresholds[2]
					? ABS_COLORS[4]
					: count > thresholds[1]
					? ABS_COLORS[5]
					: count > thresholds[0]
					? ABS_COLORS[6]
					: ABS_COLORS[7];
			};

			L.geoJSON(precinctShapes, {
				style: (feature) => {
					const precinctId = feature.properties.NAME;
					const votes = voteTable[precinctId] || 0;
					return {
						color: "#3388FF",
						weight: 1,
						fillColor: colorByOctile(votes),
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
