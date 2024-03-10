// for globally handling stores data
let storiesData = [];
let knowledgePoint = { everything: 1, "almost-everything": 2, something: 3, "almost-nothing": 5, nothing: 8, unknown: 13 };
let dependencies = { none: 1, "almost-none": 2, some: 3, few: 5, "more-than-few": 8, unknown: 13 };
let effort = { minimal: 1, low: 2, moderate: 3, high: 5, "very-high": 8, unknown: 13 };

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

    storiesData.forEach((story) => {
        let max = Math.max(knowledgePoint[story.knowledge], dependencies[story.dependencies], effort[story.effort]);
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <p>Task Knowledge: <span>${story.knowledge}</span></p>
        <p>Dependencies: <span>${story.dependencies}</span></p>
        <p>Work Effort: <span>${story.effort}</span></p>
        <p class="point">Result: <span>${max}</span></p>
        `;
        resultGrid.appendChild(cardDiv);
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
