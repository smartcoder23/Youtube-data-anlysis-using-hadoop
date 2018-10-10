#!/bin/bash

cd /home/shubham/YouTube-Data-Analysis-master15/hadoopjars;

/usr/local/hadoop/bin/hadoop fs -rm -r hdfs:/data.csv

/usr/local/hadoop/bin/hadoop fs -put '/home/shubham/YouTube-Data-Analysis-master15/WebContent/data.csv' hdfs:/ 


/usr/local/hadoop/bin/hadoop fs -rm -r /outuploaders;


/usr/local/hadoop/bin/hadoop jar youtubeuploader.jar /data.csv /outuploaders;


cd /home/shubham/YouTube-Data-Analysis-master15/output;

rm outuploaders.tsv;
rm outuploader.tsv;

cd /usr/local/hadoop/bin;

hadoop fs -copyToLocal /outuploaders/part-r-00000 '/home/shubham/YouTube-Data-Analysis-master15/output/outuploaders.tsv';

cd /home/shubham/YouTube-Data-Analysis-master15/output;

sort -t$'\t' -n -k2 -r outuploaders.tsv | head -n 10 > outuploader.tsv;



