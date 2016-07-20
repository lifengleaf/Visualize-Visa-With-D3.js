// set the margins
var margin = 21,
    width = 1000 - margin,
    height = 750 - margin;

  // create a title  
  d3.select("body")
  .append("h2")
  .text("H-1B Visa Holders: Where Are They From");

var svg = dimple.newSvg("body", width, height + margin);

d3.csv("../P6/data/FY-all.csv", function (data) {

  var myChart = new dimple.chart(svg, data);
  myChart.setBounds(margin*3, margin*3, width/1.4, height/1.3);

  // x axis with no title
  var x = myChart.addCategoryAxis("x", 'country');
  x.addOrderRule('count', true);
  x.title = "";

  // hide y axis on the left
  var y1 = myChart.addMeasureAxis("y", "count");
  y1.hidden = true;

  // set the title of y axis on the right
  var y2 = myChart.addMeasureAxis("y", "count");
  y2.showGridlines = true;
  y2.title = "H-1B Visa Count";

  var z = myChart.addMeasureAxis('z', "radius");
  var s = myChart.addSeries("year", dimple.plot.bubble);

  var myLegend = myChart.addLegend(880, 200, 80, 600, "right");

  // order legend label value
  myLegend._getEntries = function() {
    var orderedValues = ["1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"];
    var entries = [];
    orderedValues.forEach(function(v) {
        entries.push({
            key : v,
            fill : myChart.getColor(v).fill,
            stroke : myChart.getColor(v).stroke,
            opacity : myChart.getColor(v).opacity,
            series : [s],
            aggField : [v]
        });
    }, this);
    return entries;
};

  //myChart.data = dimple.filterData(data, "year", "2015");    
  myChart.draw();
  myChart.axes[0].shapes
      .call(d3.svg.axis()
        .orient("bottom")
        .scale(myChart.axes[0]._scale))
      .selectAll("text")
      .style("text-anchor", "end")
      .style('font-size', "1.2em")
      .attr("dx", "0.5em")
      .attr("dy", "1.5em")
      .attr("transform", "rotate(-30)")

  myChart.legends = [];

  svg.selectAll("title_text")
    .data(["Click to Show/Hide"])
    .enter()
    .append("text")
    .attr("x", 850)
    .attr("y", 180)
    .text(function (d) { return d; });

  // get a unique list of years
  var filterValues = dimple.getUniqueValues(data, "year");
  myLegend.shapes.selectAll("rect")
      // add a click event to each rectangle in legend
      .on("click", function (e) {

        // This indicates whether the item is already visible or not
        var hide = false;
        var newFilters = [];
        // If the filters contain the clicked shape hide it
        filterValues.forEach(function (f) {
          if (f === e.aggField.slice(-1)[0]) {
            hide = true;
          } else {
            newFilters.push(f);
          }
        });
        // hide the shape or show it
        if (hide) {
          d3.select(this).style("opacity", 0.2);
        } else {
          newFilters.push(e.aggField.slice(-1)[0]);
          d3.select(this).style("opacity", 1);
        }
        filterValues = newFilters;
        // filter the data
        myChart.data = dimple.filterData(data, "year", filterValues);
        
        // add animation
        myChart.draw(800);
        myChart.axes[0].shapes
          .call(d3.svg.axis()
          .orient("bottom")
          .scale(myChart.axes[0]._scale))
          .selectAll("text")
          .style("text-anchor", "end")
          .style('font-size', "1.2em")
          .attr("dx", "0.5em")
          .attr("dy", "1.5em")
          .attr("transform", "rotate(-30)");
      });

});