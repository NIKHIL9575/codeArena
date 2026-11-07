require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const problems = require("../Data/selected_problems.json");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const descriptions = problems.map(problem => problem.description);

const outputFile = "./data/generated_titles.json";


// Wait function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Read already generated titles
let allTitles = [];

if (fs.existsSync(outputFile)) {
    allTitles = JSON.parse(fs.readFileSync(outputFile, "utf8"));

    console.log(`Already generated: ${allTitles.length} titles`);
}


// Main function
async function generateTitles() {

    for (let i = allTitles.length; i < descriptions.length; i += 30) {

        const batch = descriptions.slice(i, i + 30);

        const prompt = `
Generate a short title for each programming problem.

Rules:
- Return exactly ${batch.length} titles.
- Keep the same order.
- Each title should be short and clear.
- Return ONLY a JSON array of strings.

Problems:

${batch.map((description, index) => `
Problem ${index + 1}:
${description}
`).join("\n")}
        `;


        let titles = null;


        // Keep trying until this batch succeeds
        while (titles === null) {

            try {

                console.log(
                    `Requesting problems ${i + 1} to ${i + batch.length}...`
                );


                const response = await ai.models.generateContent({
                    model: "gemini-3.6-flash",
                    contents: prompt
                });


                titles = JSON.parse(response.text);


                // Make sure Gemini returned correct number
                if (titles.length !== batch.length) {
                    throw new Error(
                        `Expected ${batch.length} titles but received ${titles.length}`
                    );
                }


                // Add titles
                allTitles.push(...titles);


                // Save immediately
                fs.writeFileSync(
                    outputFile,
                    JSON.stringify(allTitles, null, 2)
                );


                console.log(
                    `✅ Generated ${titles.length} titles`
                );

                console.log(
                    `📦 Total completed: ${allTitles.length}/${descriptions.length}`
                );


            } catch (error) {

                console.log(
                    `❌ Request failed: ${error.message}`
                );

                console.log(
                    "⏳ Waiting 30 seconds before retry..."
                );

                await sleep(30000);
            }
        }
    }


    console.log("🎉 All titles generated!");
}


generateTitles();