//create an svg object 
const svg= d3.select(".responsive-svg-container")
.append("svg")
.attr("viewBox", "0 0 1200 1600")
.style("border", "1px solid black")

//bar thickness and gap netween bar 
const barHeight = 20;
const barPadding = 5;
const drawBarChart = data => {
    svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => 'bar bar-${d.csvount}')

    //size and colour of bar
    .attr("width", d => d.count) //bar length is driven by the country
    .attr("height", barHeight) //everybar is same as thickness
    .attr("fill", "steelblue")

    //position
    .attr("x", 0) // all the bars start at x=0
    .attr("y", (d, i) => i * (barHeight + barPadding)); //stack down the y-axis
};

//load csv
d3.csv("data/tvBrandCount.csv", d => {
    return{
        brand: d.brand,
        count: +d.count //+ converts string to number
    };
}).then(data => {
    //check data loaded is correct n typed as number
    console.log(data);

    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));

    //sort data so its easier to interpret 
    data.sort((a, b) => b.count - a.count);
    console.log(data); //confirm the sort worked

    //hand the loaded typed, sorted data to buid the chart
    drawBarChart(data);
});
