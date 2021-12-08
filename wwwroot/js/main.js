
const container = document.querySelector("main");
const mode = container.querySelector("#mode");
const searchBtn = container.querySelector("#search");
const searchInput = container.querySelector("#searchInput");
const gitName = container.querySelector("#gitName");
const gitTag = container.querySelector("#gitTag");
const gitBio = container.querySelector("#gitBio");
const gitJoined = container.querySelector("#gitJoined");
const gitRepos = container.querySelector("#gitRepos");
const gitFollowers = container.querySelector("#gitFollowers");
const gitFollowing = container.querySelector("#gitFollowing");
const gitLocation = container.querySelector("#gitLocation");
const gitTwitter = container.querySelector("#gitTwitter");
const gitWebsite = container.querySelector("#gitWebsite");
const gitCompany = container.querySelector("#gitCompany");
const gitImage = container.querySelector("#gitImage");
const errorMessage = container.querySelector("#error");
const modeType = container.querySelector("#modeType");

const fetchUser = async user => {
    await fetch(`https://api.github.com/users/${user}`).then(r => r.json()).then(d => {
        if(d.message){
            errorMessage.style.display="block";
        }else{
            errorMessage.style.display="none";           
            gitName.innerHTML = d.name ? d.name : "No name found";
            gitTag.innerHTML = "@"+d.login;
            gitBio.innerHTML = d.bio ? d.bio : "This profile has no bio"; 
            gitRepos.innerHTML = d.public_repos;
            gitFollowers.innerHTML = d.followers;
            gitFollowing.innerHTML = d.following;
            gitLocation.innerHTML = d.location ? d.location : "Not available";
            gitTwitter.innerHTML = d.twitter_username ? d.twitter_username : "Not available";
            gitWebsite.innerHTML = d.blog ? d.blog : "Not available";
            gitCompany.innerHTML = d.company ? d.company : "Not available";
            gitImage.src = d.avatar_url;

            //concat dates - credit to Astragenius: https://www.frontendmentor.io/profile/astragenius
            const newDate = new Date(d.created_at);
            const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate);
            const month = new Intl.DateTimeFormat('en', {month: 'short' }).format(newDate);
            const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(newDate);
            gitJoined.innerHTML = `Joined ${day} ${month} ${year}`;
        }
    });
}

searchBtn.addEventListener("click", () => {
    searchInput.value && fetchUser(searchInput.value);
})

mode.addEventListener("click", () => {
    container.classList.toggle("dark");
    container.classList.contains("dark") ? modeType.innerHTML = "LIGHT" : modeType.innerHTML = "DARK";
});


