const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search")

//Async funtion(arrow funtion)
const getUser = async(username) => {
    const responce = await fetch(APIURL + username);  // ham yaha wait kare ge jab responce vaps aye ga API se esliye wait ka use kar rahe hai
    const data = await responce.json();//now ab hame responce ka data nikalna 
    console.log(data);
    const createdAt = new Date(data.created_at);
    const formattedDate = createdAt.toISOString().split('T')[0];
    const card =`

    <div class="card">
        <div class = "date-avatar">
            <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            <p>Joined At ${formattedDate}</p>
        </div>
        <div class="user-info">
            <h2>${data.name}</h2>
            ${data.bio ? `<p>${data.bio}</p>` : ' NOt FOUND'}


            <ul class="info">
                <li>${data.followers}<strong>Followers</strong></li>
                <li>${data.following}<strong>Following</strong></li>
                <li>${data.public_repos}<strong>Repositories</strong></li>
            </ul>

            <div id="repos">
                
            </div>
        </div>
    </div>
    `

    main.innerHTML = card;
    getrepos(username);
}


getUser("RamSujanRajak")

const getrepos = async(username) => {
    const repos = document.querySelector("#repos");
    const responce =  await fetch(APIURL + username + "/repos");
    const data = await responce.json();
    data.forEach(
         (item) => {
            console.log(item)
            const elem = document.createElement("a");
            elem.classList.add("repo")
            elem.href = item.html_url // yaha per item ek ek repo ke url le kar <a> anchor tage me dal de raha hai 
            elem.innerText = item.name
            elem.target = "_block"
            repos.appendChild(elem)
    });
    console.log(data);
}

const formSubmit = () => {
    // const searchBox = document.querySelector("$search")
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value = ""
    }
    return false;  //false esliye kiya hai jisse form submit hone per form submit na ho 
}


    searchBox.addEventListener(
        "focusout",
        function() {
            formSubmit()
        }
    )

{/* <a class="repo" href="#" target="_blank">Repo 1</a>
    <a class="repo" href="#" target="_blank">Repo 2</a>
    <a class="repo" href="#" target="_blank">Repo 3</a> */}