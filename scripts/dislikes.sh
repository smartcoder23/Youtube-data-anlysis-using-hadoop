#!/bin/bash
echo running dislike scripts;

cd /home/shubham/YouTube-Data-Analysis-master15/youtubedislike;

/usr/local/hadoop/bin/hadoop fs -rm -r hdfs:/data.csv

/usr/local/hadoop/bin/hadoop fs -put '/home/shubham/YouTube-Data-Analysis-master15/WebContent/data.csv' hdfs:/ 


/usr/local/hadoop/bin/hadoop fs -rm -r /dislikes;


/usr/local/hadoop/bin/hadoop jar youtubedislikes.jar TopDislikes /data.csv /dislikes;


cd /home/shubham/YouTube-Data-Analysis-master15/output;

rm dislikes.tsv;
rm dislike.tsv;
 cd /usr/local/hadoop/bin

 hadoop fs -copyToLocal /dislikes/part-r-00000 '/home/shubham/YouTube-Data-Analysis-master15/output/dislike.tsv';

cd /home/shubham/YouTube-Data-Analysis-master15/output;

sort -t$'\t' -n -k2 -r dislike.tsv | head -n 10 > dislikes.tsv;
