#!/bin/bash

cd /home/shubham/YouTube-Data-Analysis-master15/youtubecomment;

/usr/local/hadoop/bin/hadoop fs -rm -r hdfs:/data.csv

/usr/local/hadoop/bin/hadoop fs -put '/home/shubham/YouTube-Data-Analysis-master15/WebContent/data.csv' hdfs:/ 


/usr/local/hadoop/bin/hadoop fs -rm -r /outcomment;


/usr/local/hadoop/bin/hadoop jar youtubecomment.jar Topcomment /data.csv /outcomment;


cd /home/shubham/YouTube-Data-Analysis-master15/output;

rm outcomment.tsv;
rm outcomments.tsv
cd /usr/local/hadoop/bin;

hadoop fs -copyToLocal /outcomment/part-r-00000 '/home/shubham/YouTube-Data-Analysis-master15/output/outcomment.tsv';

cd /home/shubham/YouTube-Data-Analysis-master15/output;

sort -t$'\t' -n -k2 -r outcomment.tsv | head -n 10 > outcomments.tsv;



