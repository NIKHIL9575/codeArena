const fs = require("fs");
const path = require("path");
const Problem = require("../Models/problems");

// generate_starter.json
const generatedStarters = require("../Data/starter_generated.json");

async function updateStarterCodes() {
    try {
        // IMPORTANT:
        // Use the raw MongoDB collection so old documents whose
        // starterCode is still a STRING are read exactly as they are.
        const documents = await Problem.collection
            .find({})
            .sort({ _id: 1 })
            .toArray();

        console.log(`MongoDB documents found: ${documents.length}`);
        console.log(`Generated starter objects: ${generatedStarters.length}`);

        if (documents.length !== generatedStarters.length) {
            throw new Error(
                `Count mismatch: MongoDB has ${documents.length} documents, ` +
                `but generate_starter.json has ${generatedStarters.length} objects.`
            );
        }

        for (let i = 0; i < documents.length; i++) {

            const document = documents[i];
            const generated = generatedStarters[i];

            console.log(`Processing ${i + 1}/${documents.length}`);

            // -----------------------------------------
            // 1. Validate generated starter object
            // -----------------------------------------

            if (!generated || typeof generated !== "object") {
                throw new Error(
                    `Object ${i + 1}: invalid starter object`
                );
            }

            const hasC = typeof generated.c === "string";
            const hasCpp = typeof generated.cpp === "string";
            const hasJava = typeof generated.java === "string";
            const hasJavascript = typeof generated.javascript === "string";
            const hasPython = typeof generated.python === "string";

            const languageCount =
                [hasC, hasCpp, hasJava, hasJavascript, hasPython]
                    .filter(Boolean)
                    .length;

            // Only 4 or 5 languages are allowed.
            if (languageCount !== 4 && languageCount !== 5) {
                throw new Error(
                    `Object ${i + 1}: expected 4 or 5 languages, found ${languageCount}`
                );
            }

            // -----------------------------------------
            // 2. C, C++, Java and JavaScript MUST exist
            // -----------------------------------------

            if (!hasC || !hasCpp || !hasJava || !hasJavascript) {
                throw new Error(
                    `Object ${i + 1}: missing one of c/cpp/java/javascript`
                );
            }

            // -----------------------------------------
            // 3. Find existing Python starter code
            // -----------------------------------------

            let pythonStarter = null;

            /*
             * Old database format:
             *
             * starterCode: "python code..."
             */
            if (
                typeof document.starterCode === "string" &&
                document.starterCode.trim() !== ""
            ) {
                pythonStarter = document.starterCode;
            }

            /*
             * In case some documents have already been converted:
             *
             * starterCode: {
             *     python: "..."
             * }
             */
            else if (
                document.starterCode &&
                typeof document.starterCode === "object" &&
                typeof document.starterCode.python === "string" &&
                document.starterCode.python.trim() !== ""
            ) {
                pythonStarter = document.starterCode.python;
            }

            // -----------------------------------------
            // 4. If JSON has Python, use generated Python
            // -----------------------------------------

            if (hasPython) {
                pythonStarter = generated.python;
            }

            // -----------------------------------------
            // 5. Python MUST exist at the end
            // -----------------------------------------

            if (
                typeof pythonStarter !== "string" ||
                pythonStarter.trim() === ""
            ) {
                throw new Error(
                    `Object ${i + 1}: Python starter code is missing. ` +
                    `Cannot safely update this document.`
                );
            }

            // -----------------------------------------
            // 6. Create final 5-language object
            // -----------------------------------------

            const finalStarterCode = {
                c: generated.c,
                cpp: generated.cpp,
                java: generated.java,
                javascript: generated.javascript,
                python: pythonStarter
            };

            // -----------------------------------------
            // 7. Update ONLY starterCode
            // -----------------------------------------

            await Problem.collection.updateOne(
                { _id: document._id },
                {
                    $set: {
                        starterCode: finalStarterCode
                    }
                }
            );

            console.log(
                `✅ ${i + 1}: starterCode converted to 5 languages`
            );
        }

        console.log(
            "\n🎉 Successfully converted all starterCode fields!"
        );

    } catch (error) {

        console.error("\n❌ Migration stopped:");
        console.error(error.message);

        process.exit(1);
    }
}

updateStarterCodes();