
//average energy consumption vby screen type, for 55 inch tvs

const drawBarChart = data => {
    //set up inner chart margin and dimention

    const margin = {top: 60, right: 30, bottom: 25, left: 50};
    const width = 600; 
    const height = 350;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //add the svg conatainer for the chart
    const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`)
    .style("border", "1px solid black"); 

    //create inner chart grp and apply margins
    const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //create scale
    const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.1);

    const yScale =  d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0]);

    //calculate the axis
    const bottomAxis = d3.axisBottom(xScale)
    .tickSize(0) //remove tick mark
    .tickFormat (d => d.toUpperCase());
    const leftAxis = d3.axisLeft(yScale)
    .ticks(6)
    .tickSize(0);


    //add axes
    innerChart
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(bottomAxis);

    innerChart
    .append("g")
    .call(leftAxis);

    innerChart
    .append("text")
    .text("Energy Consumption (kWh)")
    .attr("x", -margin.left)
    .attr("y", -25)
    .attr("text-anchor", "start");

    //draw bars
    innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", d => yScale(d.Energy_Consumption))
    .attr("fill", "green");

    //value labels above each bar
    innerChart
    .selectAll(".bar-label")
    .data(data)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.Energy_Consumption) - 8)
    .attr("text-anchor", "middle")
    .text(d => `${Math.round(d.Energy_Consumption)} kWh`);
};


//load data 
d3.csv("data/Data_exercise 5.1.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech, 
        Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"] 
    }
}).then(data => {
    console.log(data); // confirm strings/ numbers loaded correctly

    //sort so bars display in  a meaning order (largest consumption first)
    data.sort((a,b) => b.Energy_Consumption - a.Energy_Consumption);
    console.log(data);

    drawBarChart(data);
});
