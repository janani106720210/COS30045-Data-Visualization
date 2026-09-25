//donut chart: count of tv by screen size category

const drawDonutChart = data => {

    //set up chart dimension 
    const width = 1000;
    const height = 500; 
    const radius = Math.min(width, height) / 2 - 20; // leave some padding

    //create colour scale
    //ordinal scale: maps a discrete category to a colour, no numeric position involved
    const colour = d3.scaleOrdinal()
    .domain(data.map(d => d.Screensize_Category)) // map screen size categories
    .range(d3.schemeSet2); //use D3's category colour scheme

    //calculate angle for each slice using d3.pie
    const pie = d3.pie()
    .value(d => d.Count)
    .sort(null); // disable sorting to keep orginal data order

    //set up the arcs
    const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6) // inner radius = 60% of available radius (donut Hole)
    .outerRadius(radius * 1) // outer radius = 100% of available radius

    //create svg container
    const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`)
    .style("border", "1px solid black"); 

    //create inner chart grp and apply margins
    const innerChart = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

    //draw arcs
    //bind data and create donut chart
    innerChart
    .selectAll("path")
    .data(pie(data))
    .join("path")
    .attr("d", arcGenerator)
    .attr("fill", d => colour(d.data.Screensize_Category)) // use category for colour
    .attr("stroke", "white")
    .attr("stroke-width", 2);

    //add label
    innerChart
    .selectAll("text")
    .data(pie(data))
    .join("text")
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`) 
    .attr("text-anchor", "middle")
    .style("font-size", "13px")
    .text(d => d.data.Screensize_Category);
};

//load data 
d3.csv("data/Data_exercise 5.3.csv", d => {
    return {
        Screensize_Category: d.Screensize_Category, 
        Count: +d.Count
    };
}).then(data => {
    console.log(data); // confirm strings/ numbers loaded correctly

    drawDonutChart(data);
});