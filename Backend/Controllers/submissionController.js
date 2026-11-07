const Problem = require("../Models/problems");
const axios = require("axios");
const Submission = require("../models/submission");
const Profile=require("../Models/Profile");
const Leaderboard = require("../Models/Leaderboard");

const languageIds = {
    c: 50,
    cpp: 54,
    java: 62,
    javascript: 63,
    python: 71
};




const submitCode = async (req, res) => {
    try {
        const { problemId, code, language } = req.body;

        // 1. Find problem
        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        // 2. Get hidden test cases
        const testCases = problem.hiddenTestCases;
        const wrapper = problem.wrapperCode[language];
        const languageId = languageIds[language];

        if (!testCases || testCases.length === 0) {
            return res.status(400).json({
                message: "No hidden test cases found"
            });
        }

        const totalTestCases = testCases.length;
        const sourceCode = code + "\n" + wrapper;

        let passedTestCases = 0;
        let totalRuntime = 0;
        let maxMemory = 0;

        let submissionStatus = "Accepted";
        let failedTestCase = null;
        let error = null;

        // 3. Execute test cases one by one
        for (let i = 0; i < testCases.length; i++) {

            const response = await axios.post(
                `${process.env.JUDGE0_URL}/submissions`,
                {
                    source_code: sourceCode,
                    language_id: languageId,
                    stdin: testCases[i].stdin
                },
                {
                    params: {
                        base64_encoded: "false",
                        wait: "true"
                    },
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 30000
                }
            );

            const result = response.data;

            // 4. Track runtime and memory
            totalRuntime += Number(result.time || 0);

            maxMemory = Math.max(
                maxMemory,
                Number(result.memory || 0)
            );

            // 5. Check execution status
            if (result.status.id !== 3) {
                submissionStatus = result.status.description;
                failedTestCase = i + 1;
                error = result.compile_output || result.stderr;
                break;
            }

            // 6. Compare output
            const actualOutput = result.stdout
                ? result.stdout.trim()
                : "";

            const expectedOutput = testCases[i].expectedOutput.trim();

            if (actualOutput !== expectedOutput) {
                submissionStatus = "Wrong Answer";
                failedTestCase = i + 1;
                break;
            }

            passedTestCases++;
        }

        let alreadySolved = false;

        if (submissionStatus === "Accepted") {
            alreadySolved = await Submission.findOne({
                userId: req.userId,
                problemId,
                status: "Accepted"
            });
        }

        // 2. Save submission
        await Submission.create({
            userId: req.userId,
            problemId,
            title: problem.title, 
            language,
            code,
            status: submissionStatus,
            executionTime: totalRuntime,
            memoryUsed: maxMemory,
            passedTestCases,
            totalTestCases
        });

        // 3. Find user profile
        const profile = await Profile.findOne({
            userId: req.userId
        });

        if (profile) {

            // 4. Update rating for every submission
            if (submissionStatus === "Accepted") {
                profile.rating += 4;
            } else {
                profile.rating = Math.max(0, profile.rating - 2);
            }

            // 5. Update solved statistics only for first successful solve
            if (submissionStatus === "Accepted" && !alreadySolved) {

                // Update difficulty count
                if (problem.difficulty === "Easy") {
                    profile.solvedProblems.easy += 1;
                } else if (problem.difficulty === "Medium") {
                    profile.solvedProblems.medium += 1;
                } else if (problem.difficulty === "Hard") {
                    profile.solvedProblems.hard += 1;
                }

                const totalSolved =
                    profile.solvedProblems.easy +
                    profile.solvedProblems.medium +
                    profile.solvedProblems.hard;

                // Update badge
                if (totalSolved >= 500) {
                    profile.badge = "Legendary";
                } else if (totalSolved >= 350) {
                    profile.badge = "Grandmaster";
                } else if (totalSolved >= 200) {
                    profile.badge = "Master";
                } else if (totalSolved >= 100) {
                    profile.badge = "Expert";
                } else if (totalSolved >= 50) {
                    profile.badge = "Specialist";
                } else if (totalSolved >= 10) {
                    profile.badge = "Pupil";
                } else {
                    profile.badge = "Newbie";
                }

                // Update topic mastery
                const topicData = profile.topicsMastery.find(
                    (item) => item.topic === problem.topic
                );

                if (topicData) {
                    topicData.solved += 1;
                }

                // Update languages used
                const languageData = profile.languagesUsed.find(
                    (item) => item.language === language
                );

                if (languageData) {
                    languageData.count += 1;
                } else {
                    profile.languagesUsed.push({
                        language,
                        count: 1
                    });
                }

                // Update activity date
                const today = new Date().toISOString().split("T")[0];

                if (!profile.activityDates.includes(today)) {
                    profile.activityDates.push(today);
                }
            }

            // 6. Save profile changes
            await profile.save();

            // 7. Create or update leaderboard document
            await Leaderboard.findOneAndUpdate(
                { userId: req.userId },

                {
                    $set: {
                        ratings: profile.rating,

                        problemsSolved:
                            profile.solvedProblems.easy +
                            profile.solvedProblems.medium +
                            profile.solvedProblems.hard,
                            Badge: profile.badge
                    },

                    // Avatar is added only when creating a new document
                    $setOnInsert: {
                        avatar: profile.avatar,
                        username: profile.username,
                        displayName: profile.displayName
                    }
                },

                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }
            );

            // 8. Calculate user's rank
            const usersAbove = await Leaderboard.countDocuments({
                ratings: { $gt: profile.rating }
            });

            const userRank = usersAbove + 1;

            // 9. Save rank in profile
            profile.rank = userRank;

            await profile.save();
        }



        // 8. Send result to frontend
        return res.status(200).json({
            status: submissionStatus,
            totalTestCases,
            passedTestCases,
            failedTestCase,
            language,
            runtime: `${(totalRuntime * 1000).toFixed(2)} ms`,
            memory: `${(maxMemory / 1024).toFixed(2)} MB`,
            timeComplexity: problem.timeComplexity,
            spaceComplexity: problem.spaceComplexity,
            error
        });

    } catch (error) {
        console.log("Submit code error:", error);

        return res.status(500).json({
            message: "Submission failed"
        });
    }
};

const userSubmissions=async (req,res)=>{
    try {
       
        const userId=req.userId;
        const submissions = await Submission.find({ userId})
            .sort({ submittedAt: -1 });

            

        const result = submissions.map((item) => ({
            ...item._doc,
            executionTime: `${(item.executionTime * 1000).toFixed(0)}`,
            memoryUsed: `${(item.memoryUsed / 1024).toFixed(2)}`
        }));

         return  res.status(200).json({ result });

    } catch (error) {
        
        return res.status(500).json({ message: error.message });
    }
}

const runCode = async (req, res) => {
    try {
        const { problemId, code, language } = req.body;

        if (!problemId || !code || !language) {
            return res.status(400).json({
                message: "Problem ID, code and language are required"
            });
        }

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        const testCases = problem.testCases;
        const wrapper = problem.wrapperCode[language];
        const languageId = languageIds[language];

        if (!languageId) {
            return res.status(400).json({
                message: "Unsupported programming language"
            });
        }

        const finalCode = `${code}${wrapper}`;

        const submissions = testCases.map((testCase) => ({
            source_code: finalCode,
            language_id: languageId,
            stdin: testCase.stdin
        }));

        // Send code to Judge0
        const response = await axios.post(
            `${process.env.JUDGE0_URL}/submissions/batch`,
            { submissions },
            {
                params: { base64_encoded: "false" },
                headers: { "Content-Type": "application/json" },
                timeout: 30000
            }
        );

        const tokens = response.data.map((item) => item.token);

        // Get execution results
        let results;

        while (true) {

            const response = await axios.get(
                `${process.env.JUDGE0_URL}/submissions/batch`,
                {
                    params: {
                        tokens: tokens.join(","),
                        base64_encoded: "true"
                    }
                }
            );

            results = response.data.submissions.map(result => ({
                ...result,
                stdout: result.stdout
                    ? Buffer.from(result.stdout, "base64").toString("utf8")
                    : null,
                stderr: result.stderr
                    ? Buffer.from(result.stderr, "base64").toString("utf8")
                    : null,
                compile_output: result.compile_output
                    ? Buffer.from(result.compile_output, "base64").toString("utf8")
                    : null
            }));

            if (!results.some(r => r.status.id === 1 || r.status.id === 2)) {
                break;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Compare and prepare final results
        const finalResults = results.map((result, index) => {

            let status = result.status.description;

            if (result.status.id === 3) {
                const actual = (result.stdout || "").trim();
                const expected = testCases[index].expectedOutput.trim();

                status = actual === expected ? "Accepted" : "Wrong Answer";
            }

            return {
                testCase: index + 1,
                status: status,
                actualOutput: result.stdout,
                expectedOutput: testCases[index].expectedOutput,
                error: result.compile_output || result.stderr,
                time: result.time,
                memory: result.memory
            };
        });

        // Send results to frontend
        return res.status(200).json({
            results: finalResults
        });

    } catch (error) {
        console.error("Run code error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};




module.exports={submitCode,userSubmissions,runCode};