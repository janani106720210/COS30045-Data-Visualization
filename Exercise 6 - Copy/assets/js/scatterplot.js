const drawScatterplot = (data) => {

    // set up dimension and margin of the chart area
    const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`); // responsive svg

    //create an inner chart group with margin 
    // inner chart is declared in shared-constants.js 

    innerChartS = svg 
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //max value for the scale domain
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    //set up x and y scales (star rating on x, energy consumption on y)
    xScaleS
    .domain([0, maxStar])
    .range([0, innerWidth])

    yScaleS 
    .domain([0, maxEnergy])
    .range([innerHeight, 0])
    .nice();

    //set up the colour scale
    colorScale 
    .domain(data.map(d => d.screenTech))    //unique screen tech values
    .range(d3.schemeCategory10);

    //draw the circle
    innerChartS
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);      // less oppacity so overlapping points are visible

    //axes
    innerChartS
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

    innerChartS
    .append("g")
    .call(d3.axisLeft(yScaleS));

    //axis label
    innerChartS
    .append("text")                 //y label run vertically along the y-axis
    .attr("class", "axis-label")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "end")
    .text("Star Rating");

    innerChartS
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -55)
    .attr("text-anchor", "middle")
    .text("Labelled Energy Consumption (kWh/Year)");

    //legend (top right of the svg)
    const legend = svg.append("g")
    .attr("transform", `translate(${width - 100}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend.append("g")
        .attr("transform", `translate(0,${i * 20})`);   //space rows 20px apart

        legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", colorScale(screenTech));

        legendRow.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .style("alignment-baseline", "middle")
        .text(screenTech);
    });
};