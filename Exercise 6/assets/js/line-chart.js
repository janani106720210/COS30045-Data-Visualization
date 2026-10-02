//line chart average price by year

const drawLineChart = data =>{
    //same margin values as execeise 5.1, so both cahrts end up the same size
    const margin = {top: 60, right: 30, bottom: 25, left: 50};
    const width = 600; 
    const height = 350;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //create the svg container and inner chart 
    //add the svg conatainer for the chart
    
    const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `-10, 0, ${width}, ${height}`)
    .style("border", "1px solid black"); 

    //create inner chart grp and apply margins
    const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //create scale
    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .range([innerHeight, 0]);

    //set up axes
    const bottomAxis = d3. axisBottom(xScale)
        .tickFormat(d3.format("d")); // force integers e.g. 2020

    const leftAxis = d3.axisLeft(yScale);

    innerChart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(bottomAxis);

    innerChart
    .append("g")
    .attr("class", "y-axis")
    .call(leftAxis);

    //y-axis
    innerChart
    .append("text")
    .attr("class", "axis-axis")
    .text("Average Price ($)")
    .attr("x", -margin.left)
    .attr("y", -25)
    .attr("text-anchor", "start");

    //draw scatter plot of data points first
    innerChart
    .selectAll(".point")
    .data(data)
    .join("circle")
    .attr("class", "point")
    .attr("r", 3)
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice))
    .attr("fill", "green");

    //draw line 
    //the line generator turn the data array into single path "d" string using the same scale as points above
    const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

    innerChart
    .append("path")
    .attr("class", "line-path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", "green");
};

//load data 
d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year, 
        averagePrice: +d["Average Price (notTas-Snowy)"]
    }
}).then(data => {
    console.log(data); // confirm strings/ numbers loaded correctly

    drawLineChart(data);
});
