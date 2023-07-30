const DefaultUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&language=pt-BR"
const ImagePath = "https://image.tmdb.org/t/p/w1280"
const SearchAPI = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=pt-BR&query="'

const MainDiv = document.getElementById("main")
const Form = document.getElementById("form")
const Search = document.getElementById("search")

const AtualDate = new Date();
const Year = AtualDate.getFullYear().toString().padStart(4, "0")
const Month = (AtualDate.getMonth() + 1).toString().padStart(2, "0")
const Day = AtualDate.getDate().toString().padStart(2, "0")

const FormattedDate = `${Year}-${Month}-${Day}`

GetMovies(DefaultUrl)

async function GetMovies(Url) {
    const Response = await fetch(Url)
    const Data = await Response.json()

    ShowMovies(Data.results)
}

function ShowMovies(Movies) {
    main.innerHTML = ""

    Movies.forEach((Movie) => {
        const { title, poster_path, vote_average, overview } = Movie

        const MovieElement = document.createElement("div")
        MovieElement.classList.add("movie")

        MovieElement.innerHTML = `
            <img src="${ImagePath + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${GetMovieRate(vote_average)}">Avaliação do filme: ${vote_average.toFixed(2)}</span>
            </div>
            <div class="overview">
          <h3>Descrição</h3>
          ${overview}
        </div>
        `
        MainDiv.appendChild(MovieElement)
    })
}

function GetMovieRate(Vote) {
    if (Vote >= 8) {
        return "green"
    } else if (Vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

function PopularBtnClick() {
    GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&language=pt-BR")
}

function TopRatedBtnClick() {
    GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=2&language=pt-BR")
}

function UpcomingBtnClick() {
    GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_release_type=2|3&release_date.gte=" + FormattedDate + "&release_date.lte=2023-12-31&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&language=pt-BR")
}

function NowPlayingBtnClick() {
    GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_release_type=2|3&release_date.gte=" + FormattedDate + "&release_date.lte=" + FormattedDate + "&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&language=pt-BR")
}


Form.addEventListener("submit", (e) => {
    e.preventDefault()

    const SearchText = Search.value

    if (SearchText && SearchText !== "") {
        GetMovies(SearchAPI + SearchText)

        Search.value = ""
    } else {
        window.location.reload()
    }
})