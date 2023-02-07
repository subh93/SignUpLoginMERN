const mongoose = require('mongoose');

const path = "mongodb+srv://subhashisdatavisualization:ZgWJYE4LFl8NbV87@datavisualization-sampl.g554buy.mongodb.net/datavisualization";

const connectiondone = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(path,{useNewUrlParser: true}).then(data => {
        console.log("Connection Establish")
        const fetch_data = mongoose.connection.db.collection("allrecords");
        fetch_data.find().toArray(function(err,data){
            if(err) console.log(err);
            else console.log(`Total entries are ${data.length}`);
        })
    }).catch(error => console.log(error));
}

module.exports = connectiondone;