import "dotenv/config.js";
import { MongoClient } from "mongodb";

const uri = process.env.MONGOURI;
const client = new MongoClient(uri);


async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to the MongoDB database");

    const db = client.db(process.env.MONGODBNAME);
    debugger;
    return db;

    // const movies = await db
    //   .collection("movies")
    //   .find({ title: { $regex: "Despicable", $options: "i" } })
    //   .project({ title: 1 })
    //   .toArray();

    // console.log(movies);
   
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } 
  
}

async function mainfunction(){
  const db=await connectToMongo();

const e1a = async () => {
  try{

  const movies = await db
  .collection("movies")
  .find({ year:{$gt:2000} })
  .project({ title: 1 ,year:1})
  .limit(20)// there are lots of movies so to limit them remove it if want to remove the limit
  .toArray();
 console.log(`All movies after year 2000 ----->`);
console.log(movies);
  // return all movies released after the year 2000
  }
  catch(err){
    console.log(err);
  }
};
e1a();

const e1b = async () => {
  try{
  const languages = await db
  .collection("movies")
  .distinct("languages");
   console.log(`All distinct languages in all movies ----->`);
   console.log(languages)
  // all distinct languages in all movies
  }
  catch(err){
    console.log(err);
  }
};
e1b();
const e1c= async()=>{
  try{
  const movies=await db.collection("movies")
  .find({
    cast:"Ryan Gosling",
    rated:"PG-13"
  
  }).sort({released:1}).toArray();
  console.log("All movies with PG-13 and have Ryan Gosling");
  console.log(movies);
}
catch(err){
  console.log(err);
}
}
e1c();
const e1d= async()=>{
  try{
  const result = await db.collection("movies").aggregate([
    {
      $unwind: "$genres" 
    },
    {
      $group: {
        _id: "$genres", 
        count: { $sum: 1 } 
      }
    },
    {
      $project: {
        genre: "$_id", 
        count: 1,
        _id: 0 
      }
    }
  ]).toArray();
  
  
  console.log("Genres");
  console.log(result);
}
catch(err){
  console.log(err);

}
}
e1d();
const e1e= async()=>{
  try{
const result=await db.collection("movies").insertOne({
  title:"harpreet's creation",
  directors:["harpreet"]
})
const f= await db.collection("movies").find(
  {title:"harpreet's creation"}
).toArray();

console.log(f);
  }
  catch(err){
    console.log(err);
  }
}
e1e();

}
mainfunction();