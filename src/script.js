const loading = document.getElementById("loading")
const containerPosts = document.getElementById("container-posts")
const url = "https://jsonplaceholder.typicode.com/posts"

async function getAllPosts() {
    const response = await fetch(url)
    console.log(response)

    const data = await response.json()
    console.log(data)

    loading.classList.add("esconder")

    data.map((post) => {
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

//criando obj de busca
const buscarParametro = new URLSearchParams(window.location.search)

//criando variavel que recebe id
const postId = buscarParametro.get("id")

if (!postId) {
    getAllPosts()
} else {
   getOnePost(postId)
}

//criando a função de post individual
const postContainer = document.getElementById("post-container")
const commentsContainer = document.getElementById("comments-container")

async function getOnePost(id) {
    const [conteudoPost, conteudoComentarios] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])

    const dataPost = await conteudoPost.json()
    console.log(dataPost)

    const dataComents = await conteudoComentarios.json()
    console.log(dataComents)

    //removendo o texto "carregando" para "substituir" pelos dados do post

    loading.classList.add("esconder")

    //criando os elementos de titulo e corpo do post
    const titulo = document.createElement("h1")
    const texto = document.createElement("p")

    //preenchendo os conteudos dos elementos com os dados da API
    titulo.innerText = dataPost.title
    texto.innerText = dataPost.body

    //adicionando os elementos ao container de post
    postContainer.appendChild(titulo)
    postContainer.appendChild(texto)

    //mapeamento array de comentarios

    dataComments.map((comentario)=>{
        const autor = document.createElement("h3")
        const conteudoComentario = document.createElement("p")

        autor.innerText = comentario.email
        conteudoComentario.innerText = comentario.body

        commentsContainer.appendChild(autor)
        commentsContainer.appendChild(conteudoComentario)
    })
     
}