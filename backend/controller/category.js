//category is defined by admin .
const category = require('../model/category');
const course = require('../model/course');

exports.createcategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            res.status(400).json({
                success: false,
                message: "all indicated required"
            })
        }
        const newcategory = await category.create({ name, description });
        res.status(200).json({
            success: true,
            message: "category created successfully"
        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: `category creation failed ${e.message}`
        })
    }
}

exports.showcategory = async (req, res) => {
    try {
        const allcategory = await category.find({}, { name: true, description: true });
        res.status(200).json({
            success: true,
            message: "all category displayed",
            data: allcategory
        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: `category fetching failed ${e.message}`
        })
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.categorypage = async (req, res) => {
    
   
    try {

        const { categoryid } = req.body;

        // getting courses of selected category
        const selectedcategory = await category.findById(categoryid)
            .populate({
                    path: "course",
                    match:{status:"Published"},
                    populate: [
                        {
                            path: "ratingandreview"
                        },
                        {
                            path: "instructor",
                            select: "firstname lastname"
                        }
                    ]
                })
                .exec();
                
            

        if (!selectedcategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }


        if (selectedcategory.course.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No course found for selected category"
            });
        }


        // get categories except selected category
        const categoriesexceptselected = await category.find({
            _id: { $ne: categoryid }
        });



        let differentcategory = null;

        if (categoriesexceptselected.length > 0) {

            differentcategory = await category.findOne({
                _id: categoriesexceptselected[
                    getRandomInt(categoriesexceptselected.length)
                ]._id
            })
                .populate({
                    path: "course",
                      match: { status: "Published" },
                    populate: [
                        {
                            path: "ratingandreview"
                        },
                        {
                            path: "instructor",
                            select: "firstname lastname"
                        }
                    ]
                })
                .exec();
        }


        // get top selling courses of all categories
        const mostsellingcourse = await course.find({status:"Published"})
            .sort({ totalstudent: -1 })
            .limit(10).populate({
                path:"instructor",
                select:"firstname lastname"
            }).populate({
                path:"ratingandreview",
                select:"rating"
            });

        return res.status(200).json({
            success: true,
            data: {
                selectedcategory,
                differentcategory,
                mostsellingcourse
            }
        });


    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message

        });
    }
};

