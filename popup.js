// store story estimation data
let storiesData = [];

// store stories data from browser DB
const saveStoresData = () => {
    chrome.storage.local.set({ storiesData }).then(() => {
        alert("Data Saved Successfully!");
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
};

// get story estimation data form select option field
document.getElementById("addStoryPointBtn").addEventListener("click", (event) => {
    const knowledge = document.getElementById("knowledge").value;
    const dependencies = document.getElementById("dependencies").value;
    const effort = document.getElementById("effort").value;
    // check validation
    if (knowledge && dependencies && effort) {
        event.preventDefault();
        addStory(knowledge, dependencies, effort);
    }
});
