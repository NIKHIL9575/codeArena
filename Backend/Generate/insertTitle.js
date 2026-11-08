const mongoose = require("mongoose");
const Problem = require("../Models/problems");
const { Mongodb } = require("../connect");

const problems = require("../Data/updated_problems.json");
const titles = require("../Data/generated_titles.json");

async function Insert() {
    try {
        await Mongodb(process.env.MONGO_URI);

        // Prevent accidental duplicate insertion
        const count = await Problem.countDocuments();

        if (count > 0) {
            console.log("Problems already exist. Insertion skipped.");
            return;
        }

        // Prepare problem data
        for (let i = 0; i < problems.length; i++) {
            problems[i].title = titles[i];

            // const testData = JSON.parse(problems[i].testCases);

            // problems[i].testCases = testData.inputs.map((input, index) => ({
            //     input,
            //     expectedOutput: testData.outputs[index]
            // }));
        }

        await Problem.insertMany(problems);

        console.log("Problems inserted successfully");
    } catch (err) {
        console.error("Insertion failed:", err);
    } finally {
        await mongoose.disconnect();
    }
}

Insert();