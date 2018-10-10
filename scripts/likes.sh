#!/bin/bash



cd /home/shubham/YouTube-Data-Analysis-master15/youtubelikes;



/usr/local/hadoop/bin/hadoop fs -rm -r hdfs:/data.csv

/usr/local/hadoop/bin/hadoop fs -put '/home/shubham/YouTube-Data-Analysis-master15/WebContent/data.csv' hdfs:/ 

/usr/local/hadoop/bin/hadoop fs -rm -r /likes;


/usr/local/hadoop/bin/hadoop jar youtubelikes.jar TopLikes /data.csv /likes;


cd /home/shubham/YouTube-Data-Analysis-master15/output;

rm likes.tsv;
rm like.tsv;
 cd /usr/local/hadoop/bin

 hadoop fs -copyToLocal /likes/part-r-00000 '/home/shubham/YouTube-Data-Analysis-master15/output/like.tsv';

cd /home/shubham/YouTube-Data-Analysis-master15/output;

sort -t$'\t' -n -k2 -r like.tsv | head -n 10 > likes.tsv;
