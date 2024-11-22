const MAP_CENTER = [39.96325, -82.99786];
const map = L.map("map").setView(MAP_CENTER, 11);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 18,
	attribution: "© OpenStreetMap contributors",
}).addTo(map);

const ABS_COLORS = [
  "#347ABE", "#5D95CB", "#86AFD8", "#F68895", "#F26071", "#EE384C", "#FFFFFF"
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
				voteTable[vote.precinct_name] =
          {
            totalVotes: vote.yes_47 + vote.no_47 + vote.blank_47,
            yesVotes: vote.yes_47,
          }
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
