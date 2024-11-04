const map = L.map('map').setView([39.96325, -82.99786], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'OpenStreetMap contributors'
}).addTo(map);

const getJson = () => {
    fetch('precinct_shapes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(geojsonData => {
            // Fetch the votes data
            fetch('votes.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(voteData => {
                    const voteLookup = {};
                    voteData.forEach(vote => {
                        voteLookup[vote.id] = vote.biden;
                    });

                    function getColor(bidenVotes) {
                        return bidenVotes > 1000 ? '#800026' :
                               bidenVotes > 500  ? '#BD0026' :
                               bidenVotes > 200  ? '#E31A1C' :
                               bidenVotes > 100  ? '#FC4E2A' :
                               bidenVotes > 50   ? '#FD8D3C' :
                               bidenVotes > 20   ? '#FEB24C' :
                               bidenVotes > 10   ? '#FED976' :
                                                   '#FFFFFF';
                    }
                    L.geoJSON(geojsonData, {
                        style: function (feature) {
                            const precinctID = feature.properties.NAME;
                            console.log(precinctID);
                            const bidenVotes = voteLookup[precinctID] || 0;
                            return {
                                color: "#3388ff",
                                weight: 1,
                                fillColor: getColor(bidenVotes),
                                fillOpacity: 0.6
                            };
                        },
                        onEachFeature: function (feature, layer) {
                            if (feature.properties) {
                                const { NAME, PRECINCTID } = feature.properties;
                                const bidenVotes = voteLookup[NAME] || 0;
                                layer.bindPopup(`
                                    <b>Precinct ID:</b> ${PRECINCTID}<br>
                                    <b>Name:</b> ${NAME}<br>
                                    <b>Biden Votes:</b> ${bidenVotes}
                                `);
                            }
                        }
                    }).addTo(map);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation for votes:', error);
                });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation for GeoJSON:', error);
        });
};

getJson();
