const loading = document.getElementById("loading")
const containerPosts = document.getElementById("container-posts")
const url = "https://jsonplaceholder.typicode.com/posts" 

async function getAllPosts() {
    const response = await fetch(url)
    console.log(response)

    const data = await response.json()
    console.log(data)

    data.map((post)=>{
        const titulo = document.createElement("h2")
        const texto = document.createElement("p")
        const link = document.createElement("a")
        const divPost = document.createElement("div")

        titulo.innerText = post.title
        texto.innerText = post.body
        link.innerText = "Ler post"
        link.setAttribute("href", `/post.html?id=${post.id}`)

        divPost.appendChild(titulo)
        divPost.appendChild(texto)
        divPost.appendChild(link)

        containerPosts.appendChild(divPost)

    })
}

getAllPosts()