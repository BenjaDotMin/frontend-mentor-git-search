
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

const fetchUser = async user => {
    await fetch(`https://api.github.com/users/${user}`).then(r => r.json()).then(d => {
        if(d.message){
            errorMessage.style.display="block";
        }else{
            errorMessage.style.display="none";           
            gitName.innerHTML = d.name ? d.name : "This profile has no name!";
            gitTag.innerHTML = "@"+d.login;
            gitBio.innerHTML = d.bio ? d.bio : "This profile has no bio"; 
            gitJoined.innerHTML = "Joined "+d.created_at;
            gitRepos.innerHTML = d.public_repos;
            gitFollowers.innerHTML = d.followers;
            gitFollowing.innerHTML = d.following;
            gitLocation.innerHTML = d.location ? d.location : "Not available";
            gitTwitter.innerHTML = d.twitter_username ? d.twitter_username : "Not available";
            gitWebsite.innerHTML = d.blog ? d.blog : "Not available";
            gitCompany.innerHTML = d.company ? d.company : "Not available";
            gitImage.src = d.avatar_url;
        }
    });
}

searchBtn.addEventListener("click", () => {
    searchInput.value && fetchUser(searchInput.value);
})

mode.addEventListener("click", () => container.classList.toggle("dark"));

//fetchUser("octocat");