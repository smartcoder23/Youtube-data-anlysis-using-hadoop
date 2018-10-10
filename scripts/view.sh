#!/bin/bash

cd /home/shubham/YouTube-Data-Analysis-master15/hadoopjars;

/usr/local/hadoop/bin/hadoop fs -rm -r hdfs:/data.csv

/usr/local/hadoop/bin/hadoop fs -put '/home/shubham/YouTube-Data-Analysis-master15/WebContent/data.csv' hdfs:/ 


/usr/local/hadoop/bin/hadoop fs -rm -r /outcategory;


/usr/local/hadoop/bin/hadoop jar youtubeview.jar /data.csv /outview;

cd /home/shubham/YouTube-Data-Analysis-master15/output;

rm outview.tsv;
rm outviews.tsv

cd /usr/local/hadoop/bin;

hadoop fs -copyToLocal /outview/part-r-00000 '/home/shubham/YouTube-Data-Analysis-master15/output/outviews.tsv';

cd /home/shubham/YouTube-Data-Analysis-master15/output;

sort -t$'\t' -n -k2 -r outviews.tsv | head -n 10 > outview.tsv;



