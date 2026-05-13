const body = document.querySelector("body");
const footer = document.createElement("footer")
body.appendChild(footer);
const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement("p");
copyright.innerHTML = "&copy; Nehemiah Logan " + thisYear;
footer.appendChild(copyright);

const skills = ["Data Structs", "Algorithms", "Object Oriented Programming", "Technical Documentation"];
const skillsSection = document.getElementById("Skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++){
    const skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}