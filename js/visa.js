
d3.csv("data/FY-all.csv", function (data) {

  var svg = dimple.newSvg("#chartContainer", height = 1000, width = 800);
  // give svg an id, to make it possible to remove later
  d3.select('svg').attr('id', 'init');

  var myChart = new dimple.chart(svg, data);
  myChart.setBounds("20%", "5%", "60%", "60%");

  // x axis
  var x = myChart.addCategoryAxis("x", 'country');
  x.title = "Top 10 Countries";

  // y axis
  var y = myChart.addMeasureAxis("y", "count");
  y.showGridlines = true;
  y.title = "H-1B Visa Count in 2015";

  // draw bar plot
  var mySeries = myChart.addSeries("year", dimple.plot.bar);

  // add legend on the right
  var myLegend = myChart.addLegend(800, 200, 80, 600, "right");

  // by default show newest data
  myChart.data = dimple.filterData(data, "year", "2015");    
  myChart.draw();

  // format axis label
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

});

// this function updates the visa count by year when clicking button
function updateYear(){

  // remove the default chart
  d3.select('#option').remove();
  d3.select('#init').remove();

  d3.csv("data/FY-all.csv", function (data) {

    var svg = dimple.newSvg("#chartContainer", height = 1000, width = 800);
    d3.select('svg').attr('id', 'years');

    var myChart = new dimple.chart(svg, data);
    myChart.setBounds("20%", "5%", "60%", "60%");

    // x axis
    var x = myChart.addCategoryAxis("x", 'country');
    x.title = "Top 10 Countries";

    // y axis
    var y = myChart.addMeasureAxis("y", "count");
    y.showGridlines = true;
    y.title = "H-1B Visa Count in 1997 - 2015"
    
    // draw bar plot
    var mySeries = myChart.addSeries("year", dimple.plot.bar);

    // add legend on the right
    var myLegend = myChart.addLegend(800, 200, 80, 600, "right");

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
          series : [mySeries],
          aggField : [v]
        });
      }, this);
      return entries;
    };
       
    myChart.draw();

    // format axis label
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

    // get a constant legend
    myChart.legends = [];

    svg.selectAll("title_text")
    .data(["Click to Filter"])
    .enter()
    .append("text")
    .attr("x", 800)
    .attr("y", 180)
    .text(function (d) { return d; });

  // get a unique list of years
  var filterValues = dimple.getUniqueValues(data, "year");
  myLegend.shapes.selectAll("rect")
      // add a click event to each rectangle in legend
      .on("click", function (e) {

        // default opacity of all rectangles
        myLegend.shapes.selectAll("rect")
                .style('opacity', 0.2)

        // flag to show or hide rectangles
        var show = false;
        var newFilters = [];
         
        filterValues.forEach(function (f) {
          // click to select, others hidden
          if (f !== e.aggField.slice(-1)[0]) {
            show = true;
          }
        });
        
        // change opacity depending on selection
        if (show) {
          d3.select(this).style("opacity", 1);
          newFilters.push(e.aggField.slice(-1)[0]);
        } else { 
          d3.select(this).style("opacity", 0.2);
        }

        filterValues = newFilters;
        y.title = "H-1B Visa Count in " + filterValues;
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
}


// this function normalize the number of visas by each country's
// total population when clicking the corresponding button
function updateRatio(){
  d3.select('#option').remove();
  d3.select('#init').remove();
  d3.select('#option1').remove();
  d3.select('#years').remove();

  d3.csv("data/FY-all.csv", function (data) {
    var svg = dimple.newSvg("#chartContainer", height = 1000, width = 800);

    var myChart = new dimple.chart(svg, data);
    myChart.setBounds("20%", "5%", "60%", "60%");

    // x axis
    var x = myChart.addCategoryAxis("x", 'country');
    x.title = "Country";

    // y axis
    var y = myChart.addMeasureAxis("y", "ratio");
    y.showGridlines = true;
    y.title = "H-1B Visa Count Per Capita (*1000000)";

    // draw bar plot
    var mySeries = myChart.addSeries("year", dimple.plot.bar);

    // add legend on the right
    var myLegend = myChart.addLegend(800, 200, 80, 600, "right");

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
          series : [mySeries],
          aggField : [v]
        });
      }, this);
      return entries;
    };

    myChart.draw();

    // format axis label
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

    // get a constant legend
    myChart.legends = [];

    svg.selectAll("title_text")
    .data(["Click to Filter"])
    .enter()
    .append("text")
    .attr("x", 800)
    .attr("y", 180)
    .text(function (d) { return d; });

   // get a unique list of years
  var filterValues = dimple.getUniqueValues(data, "year");
  myLegend.shapes.selectAll("rect")
      // add a click event to each rectangle in legend
      .on("click", function (e) {

        // default opacity of all rectangles
        myLegend.shapes.selectAll("rect")
                .style('opacity', 0.2)

        // flag to show or hide rectangles        
        var show = false;


        var newFilters = [];
        filterValues.forEach(function (f) {
          // click to select, others hidden
          if (f !== e.aggField.slice(-1)[0]) {
            show = true;
          }
        });
        
        // add clicked item to filtered list and show it
        if (show) {
          d3.select(this).style("opacity", 1);
          newFilters.push(e.aggField.slice(-1)[0]);
        } else { 
          d3.select(this).style("opacity", 0.2);
        }

        filterValues = newFilters;
        console.log(filterValues);
        y.title = "H-1B Visa Count Per Capita in " + filterValues + "(*1000000)";
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
}

