//set up dimensions margins 
const margin={ top: 40, right: 30, bottom: 50, left: 70};
const width = 800;
const height= 400;
const innerWidth= width - margin.left - margin.right;
const innerHeight =  height - margin.top -margin.bottom;

//set up inner chart variable for scatterplot
let innerChartS;

//set up tooltip dimensions
const tooltipWidth = 65;
const tooltipHeight = 32;

//set up colours accesible  
const barColour = "#606464"
const bodyBackgroundColor ="#fffaf0"

//set up the scales (histogram)
const xScaleH = d3.scaleLinear();
const yScaleH = d3.scaleLinear();

//set up the scatterplot scales and colour scale
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

//create a bin generator using d3.bin
const binGenerator = d3.bin().value(d => d.energyConsumption); //accessor for energy consumption

//array of filter option for screen types
const filters_screen = [
    {id: "all", label: "All", isActive: true},
    {id: "LED", label: "LED", isActive: false},
    {id: "LCD", label: "LCD", isActive: false},
    {id: "OLED", label: "OLED", isActive: false},
];

//array filter option for screen size
const filters_size = [
    {id: "all", label: "All Sizes", isActive: true},
    {id: 24, label: '24"', isActive: false},
    {id: 32, label: '32"', isActive: false},
    {id: 55, label: '55"', isActive: false},
    {id: 65, label: '65"', isActive: false},
    {id: 98, label: '98"', isActive: false},
];

