import "dotenv/config";
import mongoose from "mongoose";

async function connectToDatabase() {
    const uri = process.env.MONGOURI;
    const database=process.env.MONGODBNAME;



  if (!uri) {
    throw new Error("Missing MONGOURI environment variable");
  }

  await mongoose.connect(uri+database);
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  director: { type: String, required: true },
  genre: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", movieSchema);

async function getOneMovie() {
  try {
    const movies = await Movie.findOne({});
    console.log("A movie", movies);
  } catch (err) {
    console.error("Error fetching movies:", err.message);
  }
}

const e2a =async () => {
    try{
        const movies= await Movie.find({ year:{$gt:2000} })
        .limit(20)// to remove the limit of please remove the statement
        .select("title year");
        console.log("Movies after 2000")
        console.log(movies);
    }
    catch(err){
        console.log(err);
    }
 
};

const e2b = async () => {
try{
  const languages=await Movie.distinct("languages");
  console.log("all the languages in movies")
  console.log(languages);
}
catch(err){
    console.log(err);
}
  };
  const e2c=async()=>{
    try{
          const movies = await Movie.find({
            cast: "Ryan Gosling",
            rated: "PG-13"
          }).sort({ released: 1 });
          console.log("All the movies of the Ryan Gosling and PG-13");
          console.log(movies);
    }
    catch(err){
        console.log(err);
    }
  }
  const e2d=async()=>{
try{
    const result = await Movie.aggregate([
        { $unwind: "$genres" },
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
      ])
      console.log("all the genres");
console.log(result);
}
catch(err){
    console.log(err);
}
  }
  
const e2e= async ()=> {
   
    const movie = new Movie({
      title: "hs",
      year: 2000,
      director: "harpreet",
      genre: "horror"
    });
  
    try {
   
      const savedMovie = await movie.save();
      console.log("Movie added:", savedMovie);
    } catch (err) {
      console.error("Error adding movie:", err.message);
    }
  }
  const e2f= async ()=> {
   
    const movie = new Movie({
     
      year: "whatever",
      director: "harpreet"
    });
  
    try {
   
      const savedMovie = await movie.save();
      console.log("Movie added:", savedMovie);
    } catch (err) {
      console.error("Error adding movie:", err.message);
    }
  }


async function main() {
  try {
    await connectToDatabase();
    await e2a();
    await e2b();
    await e2c();
    await e2d();
    await e2e();
    await e2f();
  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

main();

//for e2f function here is the link to the screenshot- https://drive.google.com/file/d/1Cjmc5F9ukBiCw1A11trhdijCry3YtM4C/view?usp=drive_link
// got this error because the year because the year is in Number so String can't be allowed and also few required parameters are missing so would still cause an error after ward

//for e2g function here is the link of the screenshot- https://drive.google.com/file/d/1g6BAdCahhQPwOoQYz1NhscDtmzvCFiid/view?usp=drive_link
// now the value added before in e2e is also showing erroe as the value is not matching



