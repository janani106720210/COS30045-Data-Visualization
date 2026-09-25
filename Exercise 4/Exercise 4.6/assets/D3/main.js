//create an svg object 
const svg= d3.select(".responsive-svg-container")
.append("svg")
.attr("viewBox", "0 0 1100 900")
.style("border", "1px solid black")

//domain = the range of values in data
//range = the pixel space available in the svg for those values to map 

const xScale = d3.scaleLinear()
.domain([0,1100])
.range([100,500]);

const drawBarChart = data => {
  // band scale for the categories (y-axis) - spaces bars out evenly
  // based on how many categories (brands) there are, with some padding
  // between each band

  const yScale = d3.scaleBand()
  .domain(data.map(d => d.brand))
  .range([0,700])
  .padding(0.1);

//create a grp for each bar and its label
  const barAndLabel = svg 
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    //add rect
    barAndLabel
    .append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("width", d => xScale(d.count) - 100)
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue")
    .attr("x", 100)
    .attr("y", 0);

    //add brand names
    barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", 90)
    .attr("y", 15)
    .attr("text-anchor", "end")
    .style("font-size", "13px");

    //add count values
    barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => xScale(d.count) + 5)
    .attr("y", 15)
    .style("font-size", "13px");
}

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
