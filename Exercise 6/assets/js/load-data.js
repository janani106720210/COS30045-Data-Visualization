//load the csv file with a row conversion function
d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,  //convert screensize to a number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,  // conbvert energy consumption to a number
    star: +d.star    // convert star to a number 
})).then(data => {
    console.log(data);

    drawHistogram(data);
    drawScatterplot(data);
    populateFilters(data);
    createToolTip();
    handleMouseEvents();
});