const sections = document.querySelectorAll('section');
const sectionNames = [];
sections.forEach(section=>sectionNames.push(section.id));

let lastSeen = 0;   //index of last seen section

const options = {
    threshold : [0.1 , 0.8]
}


const observer = new IntersectionObserver(headerHandler,options);

sections.forEach(section=>{
    observer.observe(section);
})

/* HEADER */

const header = document.querySelector('header');

function headerHandler(entries)
{
    entries.filter((entry) => entry.isIntersecting).forEach(entry=>{

        if(entry.isIntersecting)
        {
            const sectionNameCurrent = entry.target.id;
            const indexCurrent = sectionNames.findIndex(element => element === sectionNameCurrent);
            if(indexCurrent > lastSeen) //scrolling down        min 0.8 threshold to change
            {
                if(entry.intersectionRatio >= 0.8)
                {
                    lastSeen = indexCurrent;
                    changeHeaderStyle(entry.target);
                }
            }
            else if(indexCurrent < lastSeen)//scrolling up       min 0.1 threshold
            {
                if(entry.intersectionRatio >= 0.1)
                {
                    lastSeen = indexCurrent;
                    changeHeaderStyle(entry.target);
                }
            }

        }
    })
}


function changeHeaderStyle(section)
{
    console.log(lastSeen);
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
    toggleHeaderFocus(sectionNames[lastSeen]);
}

function toggleHeaderFocus(sectionName)
{
    document.querySelector('.li-focused').classList.remove('li-focused');
    document.querySelector(`#${sectionName}-li`).classList.add('li-focused');
}