const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/testmongo")
.then( ( ) => console.log("connected succesfully") )
.catch( (err) => console.log(err) );


//schema -> it defines the structure of the document,default values,validation


const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    ctype : String,
    videos : Number,
    author : String,
    active : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
});

// mongoose model is a wrapper on the mongoose schema 
// mongoose schema defines the structure of the document, default values, validators
// whereas mongoose model provides an interface to the databse for creating
// querying updating deleting record etc.

// collection creation
const Playlist = new mongoose.model("Playlist",playlistSchema); // here Playlist is a class


const createDocument = async () => {
    // create or insert document
    try{

        const jsPlaylist = new Playlist({
            name : "Javascript",
            ctype : "Back End",
            videos : 50,
            author : "Aman",
            active : true
        })
        const mongoPlaylist = new Playlist({
            name : "MongoDb",
            ctype : "Database",
            videos : 20,
            author : "Anil",
            active : true
        })
        const mongoosePlaylist = new Playlist({
            name : "mongoose",
            ctype : "Database",
            videos : 5,
            author : "Amar",
            active : true
        })
    
    
        // this save returns a promise. promise is something which olds data and returns that data in future.
        // this works as async that is it waits for sometime and then insert.
        // now as it takes time so we use await to wait till data gets ready and inserted.
    
        // const result = await reactPlaylist.save(); //single insert
        const result = await Playlist.insertMany([mongoPlaylist,mongoosePlaylist,jsPlaylist]); // insert many
        console.log(result);

    }catch(err){
        console.log(err);
    }
    

}

// create document
// createDocument(); 




const getDocument =  async () => {
    try{
        // const result = await Playlist
        // .find({ctype : "Database"})
        // .select({_id: 0 , name : 1});
        // console.log(result);
        const result = await Playlist
        .find({videos : {$lt : 6}})
        .select({_id: 0});
        console.log(result);

    }catch(err){
        console.log(err);
    }
    
}

//get data
getDocument();









