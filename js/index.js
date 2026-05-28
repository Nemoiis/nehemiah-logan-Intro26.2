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
const messages = document.getElementById("messages");

const messageForm = document.querySelector("[name='leave_message']");
messageForm.addEventListener("submit", function(event){
    event.preventDefault();
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName);
    console.log(usersEmail);
    console.log(usersMessage);

    const messageList = messages.querySelector("ul");
    const newMessage = document.createElement("li");
    newMessage.classList.add("message-item");

    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> <span>${usersMessage}</span>`;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.innerText = "Remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function(event){
        const entry = event.target.parentNode;
        entry.remove();
    
        
    if (messageList.children.length < 1){
        messages.style.display = "none";
    }
    else {messages.style.display = "block";}
    
    })

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    if (messageList.children.length < 1){
        messages.style.display = "none";
    }
    else {messages.style.display = "block";}


    messageForm.reset();
});

fetch('https://api.github.com/users/Nemoiis/repos')
.then(function(response){
    return response.json();
})

.then(function(response){
    const repositories = response;
    console.log(repositories);

const projectSection = document.getElementById("Projects");
const projectList = projectSection.querySelector('ul');

for (let i = 0; i < repositories.length; i++){
    const project = document.createElement('li');
    project.classList.add("projects");
    project.innerHTML = `<a href=${repositories[i].html_url}>${repositories[i].name}</a><p>${repositories[i].description}</p>`
    projectList.appendChild(project);
}
})

.catch(function(error){
    console.error("Failed to load repositories:", error);
  });

const toggled = document.getElementById('toggle');
toggled.addEventListener("change", function() {
    if (toggled.checked) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
})

  const audio = document.getElementById('bgMusic');

  window.addEventListener('click', () => {
    audio.play();
  }, { once: true });

