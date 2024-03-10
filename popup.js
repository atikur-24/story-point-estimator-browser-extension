// for globally handling stores data
let storiesData = [];

// here is the story point matrix
let knowledgeMatrix = { everything: 1, "almost-everything": 2, something: 3, "almost-nothing": 5, nothing: 8, unknown: 13 };
let dependenciesMatrix = { none: 1, "almost-none": 2, some: 3, few: 5, "more-than-few": 8, unknown: 13 };
let effortMatrix = { minimal: 1, low: 2, moderate: 3, high: 5, "very-high": 8, unknown: 13 };

// get all story estimation data and show ui
chrome.storage.local.get({ storiesData: [] }).then((result) => {
    storiesData = result.storiesData;
    displayStoriesData();
});

// story estimation data saved to chrome extension storage
const saveStoresData = () => {
    chrome.storage.local.set({ storiesData }).then(() => {
        // alert("Data Saved Successfully!");
    });
};

// add story estimation handler
const addStory = (knowledge, dependencies, effort) => {
    const stories = {
        knowledge,
        dependencies,
        effort,
    };
    storiesData.push(stories);
    saveStoresData();
    displayStoriesData();
};

// show all story estimation data
function displayStoriesData() {
    const resultGrid = document.getElementById("resultGrid");
    resultGrid.innerHTML = "";
    // replace hyphen to space
    const regex = /-/gi;

    storiesData.forEach((story) => {
        let highestPoint = Math.max(knowledgeMatrix[story.knowledge], dependenciesMatrix[story.dependencies], effortMatrix[story.effort]);

        const storyCard = document.createElement("div");
        storyCard.innerHTML = `
        <p>Task Knowledge: <span>${story.knowledge.replace(regex, " ")}</span></p>
        <p>Dependencies: <span>${story.dependencies.replace(regex, " ")}</span></p>
        <p>Work Effort: <span>${story.effort.replace(regex, " ")}</span></p>
        <p class="point">Result: <span>${highestPoint}</span></p>
        `;

        resultGrid.appendChild(storyCard);
    });
}

// get story estimation data form select option field
document.getElementById("addStoryPointBtn").addEventListener("click", (event) => {
    const knowledge = document.getElementById("knowledge").value;
    const dependencies = document.getElementById("dependencies").value;
    const effort = document.getElementById("effort").value;

    // check validation
    if (knowledge && dependencies && effort) {
        event.preventDefault();
        addStory(knowledge, dependencies, effort);

        // reset selected options
        const selects = document.querySelectorAll("select");
        selects.forEach((select) => {
            select.selectedIndex = 0;
        });
    }
});
