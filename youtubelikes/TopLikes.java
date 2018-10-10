//package youtubecomment;
import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.fs.Path;

public class TopLikes {
	public static class Map extends Mapper<LongWritable,Text,Text,IntWritable>{
		//private Text comment = new Text();
                 private Text video_name = new Text();
                private  IntWritable Likes = new IntWritable();
		
	public void map(LongWritable key, Text value,
				Context context) throws IOException,InterruptedException {
	
			String record = value.toString();
		         String str[] = record.split(",");
			if(str.length >= 9){
	                video_name.set(str[0]);
	                str[8]=str[8].replace("\"", "");
	                if(str[8].matches("\\d+")){ 
	                	int temp=Integer.parseInt(str[8]); 
	                	Likes.set(temp);
	                }
	          }

	      context.write(video_name,Likes);
	      }

	    }
	public static class Reduce extends Reducer<Text, IntWritable,
	Text, IntWritable> {

		    public void reduce(Text key, Iterable<IntWritable> values, Context context)
		      throws IOException, InterruptedException {
		        int sum = 0;
		        for (IntWritable val : values) {
		            sum += val.get();
		        }
		        context.write(key, new IntWritable(sum));
		    }
	 }


	@SuppressWarnings("deprecation")
	public static void main(String[] args) throws Exception {
	
		Configuration conf4= new Configuration();
		

		 Job job = new Job(conf4, "videolikes");
		    job.setJarByClass(TopLikes.class);
		    job.setMapOutputKeyClass(Text.class);
		    job.setMapOutputValueClass(IntWritable.class);
		    job.setOutputKeyClass(Text.class);
		    job.setOutputValueClass(IntWritable.class);
		    job.setMapperClass(Map.class);
		    job.setReducerClass(Reduce.class);
		    job.setInputFormatClass(TextInputFormat.class);
		    job.setOutputFormatClass(TextOutputFormat.class);
		    FileInputFormat.addInputPath(job, new Path(args[0]));
		    FileOutputFormat.setOutputPath(job, new Path(args[1]));
		    job.waitForCompletion(true);
	}
}
