// store story estimation data
let storiesData = [];
console.log(storyData);

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

console.log(storyData);

// get story estimation
document.getElementById("addStoryPointBtn").addEventListener("click", (event) => {
    const knowledge = document.getElementById("knowledge").value;
    const dependencies = document.getElementById("dependencies").value;
    const effort = document.getElementById("effort").value;

    // event.stopImmediatePropagation();
    if (knowledge && dependencies && effort) {
        event.preventDefault();
        addStory(knowledge, dependencies, effort);
    }
});
