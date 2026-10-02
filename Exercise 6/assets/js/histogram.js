const drawHistogram = (data) => {
    //set up the dimension and margin of the chart area

    const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

    //create an inner chart group with margin]
    const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //get the bins for data set using bin generator
    const bins = binGenerator(data);
    console.log(bins);  // log the data to the console for debugging

    // Lock the bin edges to the full data set so filtered data re-uses the same bins
    // (otherwise d3.bin re-calculates edges for the filtered data and bars no longer line up)
    binGenerator
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .thresholds(bins.slice(0, -1).map(b => b.x1));

    const minEng= bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);

    //set rhe domain and range for the x and y scales
    xScaleH
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

    yScaleH
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice();    //round the y-axis values to a more human readable format

    //draw the bars
    innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScaleH(d.x0))
    .attr("y", d => yScaleH(d.length))
    .attr("width", d => xScaleH(d.x1) - xScaleH(d.x0))
    .attr("height", d => innerHeight - yScaleH(d.length))
    .attr("fill", barColour)
    .attr("stroke", bodyBackgroundColor)
    .attr("stroke-width", 2);

    //axes
    const bottomAxis = d3.axisBottom(xScale);
    innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

    const leftAxis = d3.axisLeft(yScaleH);
    innerChart
    .append("g")
    .call(leftAxis);

    //axis label
    innerChart
    .append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "end")
    .text("Labelled Energy Consumption (kWh/Year)");

    svg
    .append("text")
    .attr("class", "axis-label")
    .attr("x", margin.leftAxis)
    .attr("y", 20)
    .text("Frequency");
};