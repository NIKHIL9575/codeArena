
const Problem = require("../Models/problems");

async function getProblems(req, res) {
  console.log("🔥 getProblems controller called!");
  try {

    if (req.user) {

    } else {
      const allProblems = await Problem.find(
        {},
        {
          title: 1,
          difficulty: 1,
          topics: 1,
        }
      );

      const [easy, medium, hard] = await Promise.all([
        Problem.countDocuments({ difficulty: "EASY" }),
        Problem.countDocuments({ difficulty: "MEDIUM" }),
        Problem.countDocuments({ difficulty: "HARD" })
      ]);

      const problemsWithStatus = allProblems.map((problem, index) => ({
        _id: problem._id,
        title: problem.title,
        difficulty: problem.difficulty,
        tags: problem.topics,
        status: "",
        easy,
        medium,
        hard,
        total: easy + hard + medium,
        index: index + 1
      }));

      console.log("data sent");
      return res.status(200).json(problemsWithStatus);
    }


  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }


}

async function currentProblem(req, res) {

  try {
    const { id } = req.params;
    console.log("Requested ID:", req.params.id);
    console.log("Connected DB:", Problem.db.name);
    const problem = await Problem.findById(id).select("-wrapperCode -hiddenTestCases");
    console.log("Found problem id:", problem.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    return res.status(200).json(problem);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }

}

module.exports = { getProblems, currentProblem };
