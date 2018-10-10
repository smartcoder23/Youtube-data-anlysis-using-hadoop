#!/bin/bash

cd /home/shubham/YouTube-Data-Analysis-master15/hadoopjars;
/usr/local/hadoop/bin/hadoop fs -rm -r hdfs:/data.csv

/usr/local/hadoop/bin/hadoop fs -put '/home/shubham/YouTube-Data-Analysis-master15/WebContent/data.csv' hdfs:/ 


/usr/local/hadoop/bin/hadoop fs -rm -r /outcategory;


/usr/local/hadoop/bin/hadoop jar youtubecategory.jar /data.csv /outcategory;


cd /home/shubham/YouTube-Data-Analysis-master15/output;

rm outcategory.tsv;

cd /usr/local/hadoop/bin;

hadoop fs -copyToLocal /outcategory/part-r-00000 '/home/shubham/YouTube-Data-Analysis-master15/output/outcat.tsv';

cd /home/shubham/YouTube-Data-Analysis-master15/output;

sort -t$'\t' -n -k2 -r outcat.tsv | head -n 10 > outcategory.tsv;



