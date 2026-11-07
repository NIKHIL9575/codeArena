from datasets import load_dataset
import json
import ast
import random

# =========================
# SETTINGS
# =========================

TARGETS = {
    "EASY": 100,
    "MEDIUM": 150,
    "HARD": 50
}

TOTAL_TARGET = sum(TARGETS.values())

# Minimum number of problems we want from each major topic
TOPIC_MINIMUM = {
    "Array": 15,
    "String": 15,
    "Hashing": 10,
    "Sorting": 10,
    "Binary Search": 10,
    "Two Pointers": 8,
    "Sliding Window": 8,
    "Linked List": 8,
    "Stack": 8,
    "Queue": 6,
    "Recursion": 8,
    "Backtracking": 8,
    "Tree": 12,
    "BST": 6,
    "Heap": 8,
    "Graph": 15,
    "Greedy": 12,
    "Dynamic Programming": 15,
    "Bit Manipulation": 6,
    "Math": 10,
    "Trie": 4
}


# =========================
# TACO TAG → OUR TOPIC
# =========================

TOPIC_MAP = {

    "array": "Array",
    "arrays": "Array",

    "string": "String",
    "strings": "String",

    "hash table": "Hashing",
    "hashing": "Hashing",
    "hash table": "Hashing",
    "hashing": "Hashing",

    "sorting": "Sorting",

    "binary search": "Binary Search",

    "two pointers": "Two Pointers",

    "sliding window": "Sliding Window",

    "linked list": "Linked List",

    "stack": "Stack",

    "queue": "Queue",

    "recursion": "Recursion",

    "backtracking": "Backtracking",

    "tree": "Tree",
    "trees": "Tree",

    "binary tree": "Tree",

    "binary search tree": "BST",
    "bst": "BST",

    "heap": "Heap",
    "priority queue": "Heap",

    "graph": "Graph",
    "graphs": "Graph",

    "greedy": "Greedy",
    "greedy algorithms": "Greedy",

    "dynamic programming": "Dynamic Programming",
    "dp": "Dynamic Programming",

    "bit manipulation": "Bit Manipulation",
    "bitwise": "Bit Manipulation",

    "math": "Math",
    "mathematics": "Math",
    "number theory": "Math",

    "trie": "Trie"
}


# =========================
# HELPERS
# =========================

def parse_list(value):

    if not value:
        return []

    if isinstance(value, list):
        return value

    try:
        return ast.literal_eval(value)
    except:
        return []


def get_topics(row):

    raw_tags = parse_list(row.get("raw_tags"))
    tags = parse_list(row.get("tags"))
    skill_types = parse_list(row.get("skill_types"))

    all_tags = raw_tags + tags + skill_types

    topics = set()

    for tag in all_tags:

        tag = str(tag).strip().lower()

        for key, topic in TOPIC_MAP.items():

            if key in tag:
                topics.add(topic)

    return list(topics)


def normalize_difficulty(difficulty):

    if difficulty == "EASY":
        return "EASY"

    if difficulty == "MEDIUM":
        return "MEDIUM"

    if difficulty in ["MEDIUM_HARD", "HARD", "VERY_HARD"]:
        return "HARD"

    return None


# =========================
# LOAD DATASET
# =========================

print("Connecting to TACO...")

ds = load_dataset(
    "BEE-spoke-data/TACO-hf",
    split="train",
    streaming=True
)

print("Connected!\n")
print("Scanning problems...")


# =========================
# STORE CANDIDATES
# =========================

candidates = {
    "EASY": [],
    "MEDIUM": [],
    "HARD": []
}

topic_counts = {}

scanned = 0


for row in ds:

    scanned += 1

    difficulty = normalize_difficulty(
        row.get("difficulty")
    )

    if difficulty is None:
        continue

    topics = get_topics(row)

    # Ignore problems without identifiable topics
    if not topics:
        continue

    problem = {
        "title": row.get("name"),
        "description": row.get("question"),
        "difficulty": difficulty,
        "topics": topics,
        "testCases": row.get("input_output"),
        "starterCode": row.get("starter_code"),
        "solutions": row.get("solutions"),
        "timeLimit": row.get("time_limit"),
        "memoryLimit": row.get("memory_limit"),
        "source": row.get("source"),
        "url": row.get("url")
    }

    candidates[difficulty].append(problem)

    if scanned % 1000 == 0:
        print(f"Scanned {scanned} problems...")


print("\nFinished scanning!")
print(f"Total scanned: {scanned}")

print("\nCandidates:")

for difficulty in candidates:
    print(
        difficulty,
        ":",
        len(candidates[difficulty])
    )


# =========================
# RANDOMIZE
# =========================

for difficulty in candidates:
    random.shuffle(candidates[difficulty])


# =========================
# SELECT PROBLEMS
# =========================

selected = []

selected_ids = set()

difficulty_counts = {
    "EASY": 0,
    "MEDIUM": 0,
    "HARD": 0
}

topic_counts = {
    topic: 0
    for topic in TOPIC_MINIMUM
}


# --------------------------------
# PHASE 1
# Satisfy topic minimums
# --------------------------------

print("\nSelecting topic coverage...")

for topic, minimum in TOPIC_MINIMUM.items():

    while topic_counts[topic] < minimum:

        found = False

        # Prefer the difficulty that still needs problems
        difficulties = ["EASY", "MEDIUM", "HARD"]

        for difficulty in difficulties:

            if difficulty_counts[difficulty] >= TARGETS[difficulty]:
                continue

            for problem in candidates[difficulty]:

                problem_id = problem["url"]

                if problem_id in selected_ids:
                    continue

                if topic not in problem["topics"]:
                    continue

                selected.append(problem)

                selected_ids.add(problem_id)

                difficulty_counts[difficulty] += 1

                for t in problem["topics"]:
                    if t in topic_counts:
                        topic_counts[t] += 1

                found = True
                break

            if found:
                break

        if not found:
            print(
                f"Could not reach minimum for topic: {topic}"
            )
            break


# --------------------------------
# PHASE 2
# Fill remaining slots
# --------------------------------

print("\nFilling remaining slots...")

for difficulty in ["EASY", "MEDIUM", "HARD"]:

    target = TARGETS[difficulty]

    for problem in candidates[difficulty]:

        if difficulty_counts[difficulty] >= target:
            break

        problem_id = problem["url"]

        if problem_id in selected_ids:
            continue

        selected.append(problem)

        selected_ids.add(problem_id)

        difficulty_counts[difficulty] += 1

        for topic in problem["topics"]:
            if topic in topic_counts:
                topic_counts[topic] += 1


# =========================
# SAVE
# =========================

with open(
    "selected_problems.json",
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        selected,
        file,
        indent=2,
        ensure_ascii=False
    )


# =========================
# REPORT
# =========================

print("\n==============================")
print("SELECTION COMPLETE")
print("==============================")

print("\nDifficulty:")

for difficulty, count in difficulty_counts.items():

    print(
        f"{difficulty}: {count}/{TARGETS[difficulty]}"
    )


print("\nTopics:")

for topic, count in topic_counts.items():

    print(
        f"{topic}: {count}"
    )


print("\nTotal selected:", len(selected))

print("\nSaved as:")
print("selected_problems.json")