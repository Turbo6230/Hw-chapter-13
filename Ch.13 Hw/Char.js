
//Width and height
	var w = 500;
    var h = 300;
//Original data
var dataset = [
{ fords: 20, chevi: 30, jeep: 50 },
{ fords: 40, chevi: 25, jeep: 70 },
{ fords: 100, chevi: 35, jeep: 46 },
{ fords: 80, chevi: 55, jeep: 39 },
{ fords: 30, chevi: 45,jeep: 22 }	
];

//Set up stack method
var stack = d3.stack()
	 .keys([ "fords", "chevi", "jeep" ])
	 .order(d3.stackOrderDescending);  // <-- Flipped stacking order

//Data, stacked
var series = stack(dataset);

//Set up scales
var xScale = d3.scaleBand()
	.domain(d3.range(dataset.length))
	.range([0, w])
	.paddingInner(0.05);
		
var yScale = d3.scaleLinear()
	.domain([0,				
	d3.max(dataset, function(d) {
	return d.fords + d.chevi + d.jeep;
	})
])
    .range([h, 0]);  // <-- Flipped vertical scale
				
//Easy colors accessible via a 10-step ordinal scale
var colors = d3.scaleOrdinal(d3.schemeCategory10);
		
//Create SVG element
var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);
	
// Add a group for each row of data
var groups = svg.selectAll("g")
	.data(series)
	.enter()
	.append("g")
	.style("fill", function(d, i) {
		return colors(i);
});
	
// Add a rect for each data value
var rects = groups.selectAll("rect")
	.data(function(d) { return d; })
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
    	return xScale(i);
})
	.attr("y", function(d) {
     	return yScale(d[1]);  // <-- Changed y value
})
	.attr("height", function(d) {
		return yScale(d[0]) - yScale(d[1]);  // <-- Changed height value
})
	.attr("width", xScale.bandwidth());
						
		