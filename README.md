# Visualize H-1B Visa by Nationality Using D3.js

This is the Project 6 for the Data Analyst Nanodegree on Udacity, connected to the course *Data Visualization and D3.js*.

## SUMMARY 

Based on the Nonimmigrant Visa Issuances by Visa Class and by Nationality dataset obtained from the [U.S. Department of State, Bureau of Consular Affairs](https://travel.state.gov/content/visas/en/law-and-policy/statistics/non-immigrant-visas.html), this visualization shows the top 10 countries with the most H-1B requests from 1997 to 2015.

To investigate further the data, I normalized the count by the population of each country, and got a different story from what we got just looking at absolute counts. Uses could click the buttons on the default page to select the type of data to explore, and click the interactive legend to filter by year.


## DESIGN
### Iteration 1

The original design was two bubble charts with country on the x-axis, visa count (the other is per capita count) on the y-axis and its square root coded as bubble radius. 

I spent a long time on the interactive legend. The example code on [dimplejs.org](http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends) renders a legend which by default shows all items, and users must click one by one to hide all other items to see a certain one. As feedback 1 suggested, this results in a bad user experience when applied to this project.

I also tried to remove both axes and let the extremely large bubble be surrounded by other small bubbles.

### Iteration 2

After receving feedback 1, I changed bubble charts into bar charts, while the axes stayed the same.

As for the interactive legend, I set it to show the clicked item and hide all others on every click. 

On the default page, only the newest data (in 2015) was shown. I added two buttons on the home page, for users to select which kind of data they want to explore: the absolute count or per capita count.

### Iteration 3

Following feedback 2, I changed the bar chart on the default page into a line chart, to show an overview of trend over time. Since the line for India is high, and all other lines stack up compactly on the lower part of the chart. To avoid overlapping, I decided to show only the top three coutries. 

Feedback 3 questioned the way I dealt with per capita count, multiplying by 1,000,000 to make it larger. So I went back to data wrangling, and changed the ratio into count per thousand.

## FEEDBACK 

### Feedback 1

1. I can see a bar chart working well since country is a categorical variable and count is a numerical variable. For example, country on the x-axis, count on the y-axis, and color for continent might show something interesting.

2. Clicking on the legend works although it doesn't necessarily enhance understanding of the data. It was helpful for me to remove a few years so that there was less over plotting. 

3. I found it a little bit confusing because the order of the countries on the x-axis will change depending on what years are present. It made it harder for me to interpret the chart in this particular design.

### Feedback 2

1. I suggest using a line chart, which shows the tread versus time. In the current design, it's hard for users to get the trend.

2. The colors seem random, and there are repetitive or very similar colors in the legend.

3. I can see people from several contries/regions are quite competitive to get h1b visa, while others not.

4. In some years, it seems no people from centain countries got H1b visa. Is it definitely zero or undetectably few?

### Feedback 3

1. I love the animations when clicking a different year. Would it be even better if we also have animation for countries moving their positions along the horizontal axis (like India moves from 3rd position to 2nd position when changing from year 2011 to 2012)?

2. In 'Per capita' view, why ratio is '0.1k' in the hover text? Ratio should be a fraction.

3. In 'Click to Filter', there should be an options for users to return to 'All Countries'. I have to reload the page to go back.

4. In 'All Countries' view, the blocks for each country should be stacked in chronological order.

## RESOURCES

1. [U.S. Department of State, Bureau of Consular Affairs](https://travel.state.gov/content/visas/en/law-and-policy/statistics/non-immigrant-visas.html)

2. [the World Bank](http://databank.worldbank.org/data/reports.aspx?source=2&series=SP.POP.TOTL&country=#)

3. [Ministry of the Interior, Taiwan](http://statis.moi.gov.tw/micst/stmain.jsp?sys=100)

4. [National Statistics, Taiwan](http://eng.stat.gov.tw/public/data/dgbas03/bs2/yearbook_eng/y008.csv)

5. [Dimplejs interactive legend example](http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends)

6. [Udacity Discussion Forum](https://discussions.udacity.com/t/no-full-chart-when-filtering-data/178303)

7. [http://www.w3schools.com/css/default.asp](http://www.w3schools.com/css/default.asp)

8. [Interactive Journalism Course](http://jrue.github.io/coding/2014/lesson06/)

