const sections = document.querySelectorAll('section');
const sectionNames = [...sections].map(section => section.id);
let lastSeen = 0;   //index of last seen section
const observer = new IntersectionObserver(handleIntersection,{threshold : [0.1 , 0.8]});
sections.forEach(section=>{
    observer.observe(section);
})

/* HEADER */

const header = document.querySelector('header');

function handleIntersection(entries)
{
    entries.filter((entry) => entry.isIntersecting).forEach(entry=>{
            const indexCurrent = sectionNames.findIndex(element => element ===  entry.target.id);
            if(indexCurrent > lastSeen) //scrolling down        min 0.8 threshold to change
            {
                if(entry.intersectionRatio >= 0.8)
                {
                    lastSeen = indexCurrent;
                    updateNavStyle(entry.target);
                }
            }
            else if(indexCurrent < lastSeen)//scrolling up       min 0.1 threshold
            {
                if(entry.intersectionRatio >= 0.1)
                {
                    lastSeen = indexCurrent;
                    updateNavStyle(entry.target);
                }
            }
    })
}


function updateNavStyle(section)
{
    //0,2 == white
    //1,3 == black
    if(lastSeen % 2)    //every odd section is black -> needs inverse header
    {
        header.classList.add('header-inverse');
    }
    else    //every even section is white
    {
        //if(...contains()) = > remove
        header.classList.remove('header-inverse');
    }
    toggleNavFocus(sectionNames[lastSeen]);
}

function toggleNavFocus(sectionName)
{
    document.querySelector('.li-focused').classList.remove('li-focused');
    document.querySelector(`#${sectionName}-li`).classList.add('li-focused');
}