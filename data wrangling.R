
library(ggplot2)
library(reshape)
library(dplyr)

for (year in 1997:2015) {
      # read annual files split from one whole file
      csvfile<- read.csv(sprintf("data/FY%s-Table 1.csv", year), 
                         header = TRUE, check.names=FALSE)
      
      # only keep two columns: country and H1B counts
      subfile<- csvfile[c(paste('Fiscal Year', year), 'H-1B')]
      
      colnames(subfile)<- c('country', 'count')
      
      # make characterstic count column numeric
      subfile$count<- as.numeric(gsub(",", "", subfile$count))
      subfile<- subfile[order(subfile$count, decreasing = TRUE), ]
      
      # remove continental and grand totals
      subfile<- subfile[!grepl('Totals', subfile$country), ]
      
      # remove empty values
      subfile<- subfile[!is.na(subfile$count), ]
      
      # create a new column to store year
      subfile$year<- year
      
      # make some explorative plots
      qplot(country, H1B, data = subfile) + 
            geom_bar(stat = "identity")
      
      # store to separate data frame
      assign(paste0('df', year), subfile)
      
}

# bind all annual data frame into one single one
fulldf<- rbind(df1997, df1998, df1999,  df2000, df2001, df2002, df2003, 
               df2004, df2005, df2006, df2007, df2008, df2009, df2010, 
               df2011, df2012, df2013, df2014, df2015)

# read the population file obtained from the World Bank databank
# which does not contain entries for 'China - mainland' and 'China - Taiwan' separately
population<- read.csv("data/Data_Extract_From_World_Development_Indicators/0eea5673-5b29-4b44-8ec5-dc422e22c624_Data.csv")

# remove irrelevant rows and columns
population<- population[1:12,]
population<- population[, -c(1,2,4)]
colnames(population)<- c('country', '1997', '1998', '1999', '2000', '2001',
                         '2002', '2003', '2004', '2005', '2006', '2007', 
                         '2008', '2009', '2010', '2011', '2012', '2013', 
                         '2014', '2015')

# reshape data from wide to long format
population<- melt(population, id='country')
colnames(population)<- c('country', 'year', 'population')


# read Taiwan population file
taiwan<- read.csv("data/y008.csv", skip = 8, header = TRUE, row.names = NULL)
taiwan<- taiwan[13:30,1:2]

# add the population data for year 2015
taiwan<- rbind(taiwan, c(2015, 23492074))

# add column to store country value
taiwan$country<- "China - Taiwan"

# change column names
colnames(taiwan)[1:2]<- c("year", "population")

# bind population of Taiwan with that of other countries
population<- rbind(population, taiwan)

# change factor to character
population$country<- as.character(population$country)

unique(fulldf$country)
unique(population$country)
# make country names of population data frame the same with that of fulldf
population[population$country == "United Kingdom", 1]<- "Great Britain and Northern Ireland"
population[population$country == "Korea, Rep.", 1]<- "Korea, South"

# calculate population for other parts of China except Taiwan
subdf<- population[(population$country == "China") | (population$country == "China - Taiwan"), ]
subdf<- cast(subdf, formula = year~country, mean, value = 'population')
subdf$`China - mainland`<- subdf$China - subdf$`China - Taiwan`
subdf<- subdf[, c(1, 4)]

# reshape subset data frame, and bind back to full population data frame
subdf<- melt( as.data.frame(subdf), id='year')
colnames(subdf)[2:3]<- c('country', 'population')
population<- rbind(population, subdf)

# merge the population data frame with fulldf, which contains visa counts
fulldf<- merge(fulldf, population, by = c('country', 'year'))

# create a new column to store ratio:
# number of H-1B visa requests per 1,000 citizens
fulldf<- mutate(fulldf, ratio = (count/population)*1000)

fulldf$ratio<- round(fulldf$ratio, 4)
fulldf<- fulldf[order(as.numeric(fulldf$year)),]

write.csv(fulldf, 'data/FY-all.csv', row.names = FALSE)

