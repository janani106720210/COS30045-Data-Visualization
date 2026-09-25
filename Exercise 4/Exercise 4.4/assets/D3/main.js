//create an svg object 
const svg= d3.select(".responsive-svg-container")
.append("svg")
.attr("viewBox", "0 0 1200 1600")
.style("border", "1px solid black")

//add test svg rectangle
svg
.append("rect")
.attr("x", 10)
.attr("y", 10)
.attr("width", 414)
.attr("height", 16)
.attr("fill", "blue")

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
