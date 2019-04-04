window.onload = function () {
    let centered;
    let width = 960;
    let height = 500;

    let projection = d3.geo.conicConformalSpain();

    let path = d3.geo.path()
        .projection(projection);

    let svg = d3.select("body").append("svg")
        .attr("width", width + "px")
        .attr("height", height + "px");


    let div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    let g = svg.append("g");

    d3.json("./assets/autonomous_regions.json", function (error, communities) {

        let map = topojson.feature(communities, communities.objects.autonomous_regions);
        g.append("g").selectAll("path")
            .data(map.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "#0e713e")
            .style("stroke", "white")
            .style("stroke-width", "0.5px")
            .on("click", clickListener)
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .style("stroke-width", "1px");

                div.transition()
                    .duration(200)
                    .style("opacity", 0.9);

                div.html(getCommunityName(d.id))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .transition()
                    .style("stroke-width", "0.5px");
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });

    function clickListener(d) {
        let x, y, k;

        if (d && centered !== d) {
            let centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

        g.selectAll("path")
            .classed("active", centered && function (d) {
                return d === centered;
            });

        g.transition()
            .duration(500)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");

        div.transition()
            .duration(500)
            .style("opacity", 0);
    }

    function getCommunityName(id) {
        return {
            "01": "Andalucía",
            "02": "Aragón",
            "03": "Principado de Asturias",
            "04": "Illes Balears",
            "05": "Canarias",
            "06": "Cantabria",
            "07": "Castilla y León",
            "08": "Castilla-La Mancha",
            "09": "Cataluña",
            "10": "Comunitat Valenciana",
            "11": "Extremadura",
            "12": "Galicia",
            "13": "Comunidad de Madrid",
            "14": "Región de Murcia",
            "15": "Comunidad Foral de Navarra",
            "16": "País Vasco",
            "17": "La Rioja",
            "18": "Ceuta",
            "19": "Melilla"
        }[id];
    }
};


