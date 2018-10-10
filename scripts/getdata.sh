#!/bin/bash

echo Running script to copy data from localfile to hadoop
 
#/usr/local/hadoop/bin/hadoop fs -rm hdfs:/data.csv


# /usr/local/hadoop/bin/ hadoop fs -put '/home/shubham/YouTube-Data-Analysis-master15/WebContent/data.csv' hdfs:/ 







echo Running script to copy data from localfile to HDFS;

#/usr/local/hadoop/bin/hadoop fs -rm hdfs:/user/shubhamsethi/data.csv;

/usr/local/hadoop/bin/hadoop fs -put /home/shubham/YouTube-Data-Analysis-master15/WebContent/data.csv /user/shubham
