const path = require('path');
const db = require('../models');

//2 get routes 1post and 1 put
//2get workout.find({})

//app.post = db.Workout.create

//app.put = api/workouts/:id = db.Workout.findByIdAndUpdate

//app.get("api/workouts/range")= db.Workout.find({})

//app.get("api/workouts")= db.Workout.find({})

module.exports = function (app) {
    //get workouts
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });
    // add exercise
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $push: { exercises: req.body }
            },
            { new: true }
        ).then(workoutDB => {
            res.json(workoutDB);
        }).catch(err => {
            res.statusCode(400).json(err)
        });
    });

    //create workout
    app.post("/api/workouts", ({ body }, res) => {

        db.Workout.create(body).then((workoutDB => {
            res.json(workoutDB);
        })).catch(err => {
            res.statusCode(400).json(err)
        });
    });

    // get workouts in range
    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).then(workoutDB => {
            res.json(workoutDB);
        }).catch(err => {
            res.statusCode(400).json(err)
        });
    });

}