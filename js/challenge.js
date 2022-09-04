
const counter = document.querySelector("#counter")
const pauseBtn = document.getElementById("pause")
const addBtn = document.getElementById("plus")
const subtractBtn = document.getElementById("minus")
const likeBtn = document.getElementById("heart")
const buttons = document.querySelectorAll("button")
const commentForm = document.getElementById("comment-form")

let likes = 1
let valArr = []

pauseBtn.addEventListener("click", pauseCounter);
addBtn.addEventListener("click", addtCounter);
subtractBtn.addEventListener("click", lessCounter)
likeBtn.addEventListener("click", likeCounter)
commentForm.addEventListener("submit", addComment)

var isCounting = true

function createElementsArray(elems) {
    if (Array.isArray(elems)) {
        for (let i = 0; i < elems.length; i++) {
            let c = Array(elems.length)
            c[i] = elems[i]
            return c;
        }
    }
    return Array.from(elems)
}

function startCounter() {
    return setInterval(function () {
        let initial = parseInt(counter.innerText)
        counter.innerText = initial + 1
    }, 1000)

}
let intervalId = startCounter();

function pauseCounter() {
    isCounting ?
        ((isCounting = false),
            clearInterval(intervalId),
            this.innerText = "resume",
            buttons.forEach(button => {
                button.disabled = true;
            }),
            this.disabled = false) :
        ((isCounting = true),
            clearInterval(intervalId),
            intervalId = startCounter(),
            buttons.forEach(button => {
                button.disabled = false;
            }),
            this.innerText = "pause")
}

function addtCounter() {
    let countVal = parseInt(counter.innerText) + 1
    counter.innerText = countVal
}

function lessCounter() {
    let countVal = parseInt(counter.innerText) - 1
    counter.innerText = countVal
}

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

function likeCounter() {
    const countVal = parseInt(counter.innerText)
    const likesContainer = document.querySelector("ul.likes")

    let clicksArray = ([].concat(createElementsArray(likesContainer.children).map(arr => parseInt(arr.innerText))));


    if (clicksArray.includes(countVal)) {
        let likeContainer = document.querySelector(`[num="${countVal}"]`)
        const likeCount = getOccurrence(clicksArray, countVal)
        console.log(likeCount)
        likeContainer.innerHTML = `${countVal} has been liked ${likeCount + 1} times`
    }
    else {
        const like = document.createElement("li")
        like.setAttribute("num", countVal)
        like.innerHTML = `${countVal} has been liked 1 time`
        likesContainer.appendChild(like)
    }

}

function addComment(event) {
    event.preventDefault();
    const comment = document.getElementById("comment-input").value
    const commentPar = document.createElement("p")
    commentPar.innerText = comment
    document.querySelector("#list").appendChild(commentPar)
    commentForm.reset()
}