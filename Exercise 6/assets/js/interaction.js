const populateFilters = (data) => {
   
    //update the histogram using both filter (tech + size)
    const updateHistogram = () => {
        const techId = filters_screen.find(f => f.isActive).id;
        const sizeId = filters_size.find(f => f.isActive).id;

        //filter the data
        const updateData = data.filter(tv =>
        (techId === "all" || tv.screenTech === techId) && (sizeId === "all" || tv.screenSize === sizeId)
        );

        //re-bin the filtered data with the shared bin generator
        const updateBins = binGenerator(updateData);

        //update the bars with a transition
        d3
        .selectAll("#histogram rect")
        .data(updateBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
    };

    //build one set of toggle buttons 
    const buildButtons = (containerId, filters) => {
        d3.select(containerId)
        .selectAll(".filter")
        .data(filters)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter data:", d);

            //if the clicked filter is not already active, update the active state
            if(!d.isActive){
                filters.forEach(filter => {
                    filter.isActive = d.id === filter.id;
                });

                //update button sytles for this group only 
                d3.selectAll(`${containerId} .filter`)
                .classed("active", filter => filter.id === d.id);

                updateHistogram();
            }
        }) ;
    };

    buildButtons("#filters_screen", filters_screen);
    buildButtons("#filters_size", filters_size);
};

//tooltip for the scatterplot
const createToolTip = () => {

    //append the tooltip group to the scatterplot's innerchart (hidden at first)
    const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("pointer-events", "none");   // so the tooltip never blocks the mouse

    //background rectangle
    tooltip
    .append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColour)
    .attr("fill-opacity", 1);

    //tooltip text
    tooltip
    .append("text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("fill", "white")
    .style("font-weight", 1000)
};

//react to mouse events on the scatterplot circle 
const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e,d) => {
            console.log("Mouse entered circle", d);

            //update the tooltip text with the screen size
            d3.select(".tooltip text")
            .text(d.screenSize);

            //get the circle's centre from the event target
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            //position the tooltip above the circle and fade it in 
            d3.select(".tooltip")
            .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
            .transition()
            .duration(200)
            .style("opacity", 1);
        }).on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d)

            //hide the tooltip and move it out of the way
            d3.select(".tooltip")
            .style("opacity", 0)
            .attr("transform", `translate(0, 500)`);
        });
};