const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for(let card of cards) {

    card.addEventListener("click", function(){
        const ProjectId = card.getAttribute("id");
        //  window.location.href = `/projectsExternal?id=${ProjectId}`
         window.location.href = `/projectsExternal/${(ProjectId)}`  
    })
}
