const postsURL = "https://jsonplaceholder.typicode.com/posts"
const usersURL = "https://jsonplaceholder.typicode.com/users"
const schmoesURL = "//joeschmoe.io/api/v1/"
const app = document.getElementById("app")

const postsApi = {
    getPosts: () => {
        return new Promise((resolve, reject) => {
            fetch(postsURL)
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

const usersApi = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            fetch(usersURL)
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

async function drawUsers() {
    const posts = await postsApi.getPosts()
    const users = await usersApi.getUsers()

    console.log('posts', posts)
    console.log('users', users)

    posts.map(post => {
        const user = users.find(user => user.id === post.userId)

        let divPost = document.createElement("div")
        divPost.innerHTML += `<h3>${user.name}</h3>`
        divPost.innerHTML += `<p>${post.body}</p>`

        app.appendChild(divPost)
    })
}

drawUsers()
