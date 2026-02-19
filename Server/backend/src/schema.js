const propertySchema = new mongoose.Schema({
    title : String,
    description : String,
    image : String,
    contact : Number,
    reviews : [
        {
            user : String,
            rating : Number,
            comment : String,
        },
    ],
});
const Property = mongoose.model('Property' , propertySchema);