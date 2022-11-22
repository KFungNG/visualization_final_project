let data = await (d3.csv('./data/Ocean_Warming.csv', function (d) {
    return {
        Year: +d.YEAR,
        WO: +d.WO,
        WOse: +d.WOse,
        NH: +d.NH,
        NHse: +d.NHse,
        SH: +d.SH,
        SHse: +d.SHse
    };
}))
console.log(data)

let margin = {
    top: 100,
    right: 150,
    bottom: 30,
    left: 50
}
let width = 1500 - margin.left - margin.right;
let height = 700 - margin.top - margin.bottom;
let svg = d3.select("#line-chart-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleLinear().range([0, width]);
let xAxis = d3.axisBottom().scale(x).ticks((2019 - 1957) / 5).tickFormat(d3.format("d"));
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis")

let y = d3.scaleLinear().range([height, 0]);
let yAxis = d3.axisLeft().scale(y);

svg.append("g")
    .attr("class", "myYaxis")
x.domain([1957, 2019]);
svg.selectAll(".myXaxis").transition()
    .duration(2000)
    .call(xAxis);

y.domain([d3.min(data, d => +d.WO), d3.max(data, d => d.WO)]);
svg.selectAll(".myYaxis")
    .transition()
    .duration(2000)
    .call(yAxis);

const max = d3.max(data, d => +d.WO);
const min = d3.min(data, d => +d.WO);
var color = d3.scaleSequential(y.domain(), d3.interpolateTurbo)
svg.append("linearGradient")
    .attr("id", "line-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", y(min))
    .attr("x2", 0)
    .attr("y2", y(max))
    .selectAll("stop")
    .data(d3.ticks(0, 1, 10))
    .join("stop")
    .attr("offset", d => d)
    .attr("stop-color", color.interpolator());


var chart = svg.selectAll(".lineTest")
    .data([data], d => d.Year);
chart
    .enter()
    .append("path")
    .attr("class", "lineTest")
    .merge(chart)
    .transition()
    .duration(2000)
    .attr("d", d3.line()
        .x(d => x(d.Year))
        .y(d => y(d.WO)))
    .attr("e", d3.line()
        .x(d => x(d.Year))
        .y(d => y(d.NH)))
    .attr("fill", "none")
    .attr("stroke", "url(#line-gradient)")
    .attr("stroke-width", 3.5)

let mouseover = function () {
    focus.style("opacity", 0.8)
    line1.style("opacity", 0.8)
    line2.style("opacity", 0.8)
    focusText.style("opacity", 0.9)
    text1.style("opacity", 0.9)
    text2.style("opacity", 0.9)
}

let mouseout = function () {
    focus.style("opacity", 0)
    line1.style("opacity", 0)
    line2.style("opacity", 0)
    focusText.style("opacity", 0)
}

let mousemove = function (e) {
    var x0 = x.invert(d3.pointer(e)[0]);
    var bisect = d3.bisector(d => d.Year).left;
    var i = bisect(data, x0, 1); // bisect定义：var bisect = d3.bisector(d => d.year).left;
    let selectedData = data[i]

    focus
        .attr("cx", x(selectedData.Year))
        .attr("cy", y(selectedData.WO))

    line1
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(selectedData.WO))
        .attr("y2", y(selectedData.WO))
    line2
        .attr("x1", x(selectedData.Year))
        .attr("x2", x(selectedData.Year))
        .attr("y1", 0)
        .attr("y2", height)
    focusText
        .attr("cx", x(selectedData.Year) + 20)
        .attr("cy", y(selectedData.WO) - 50)
    text1.text('年份: ' + selectedData.Year)
        .attr("x", x(selectedData.Year) + 20)
        .attr("dy", y(selectedData.WO) - 50)
    text2.text('WO : ' + selectedData.WO)
        .attr("x", x(selectedData.Year) + 15)
        .attr("dy", "1.5em")
}

svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);



focus = svg
    .append('g')
    .append('circle')
    .attr("stroke", "black")
    .attr("fill", "black")
    .attr('r', 4)
    .style("opacity", 0)
let line1 = svg
    .append('line')
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("opacity", 0)
let line2 = svg
    .append('line')
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("opacity", 0)

let focusText = svg
    .append('g')
    .append('text')
let text1 = focusText
    .append('tspan')
    .attr('id', 't1')
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")
let text2 = focusText
    .append('tspan')
    .attr('id', 't2')
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")

