const postsURL = "https://jsonplaceholder.typicode.com/posts"
const usersURL = "https://jsonplaceholder.typicode.com/users"
const schmoesURL = "//joeschmoe.io/api/v1/"
const app = document.getElementById("app")

const helpers = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    resolve(myJson)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

const postsApi = {
    getPosts: () => helpers.get(postsURL)
}

const usersApi = {
    getUsers: () => helpers.get(usersURL)
}

async function drawUsers() {
    const postsPromise = postsApi.getPosts()
    const usersPromise = usersApi.getUsers()

    let [posts, users] = await Promise.all([postsPromise, usersPromise])

    posts.map(post => {
        const user = users.find(user => user.id === post.userId)

        let divPost = document.createElement("div")
        divPost.innerHTML += `<img src="${schmoesURL + user.id}" />`
        divPost.innerHTML += `<h3>${user.name}</h3>`
        divPost.innerHTML += `<p>${post.body}</p>`

        app.appendChild(divPost)
    })
}

drawUsers()
