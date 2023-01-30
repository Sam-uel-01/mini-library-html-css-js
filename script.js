// *******************************************************************
// ************DARK AND LIGHT MODE **********************************

const darkToggler = document.querySelector(".fa-moon")
const main = document.querySelector("#main")
const darkModeTogglerContainer = document.querySelector(
  ".darkModeTogglerContainer"
)
const headingOne = document.querySelector("#headingOne")
const thead = document.querySelector("thead")
const tbodyMode = document.querySelector("tbody")

const modeStatus = JSON.parse(localStorage.getItem("darkMode"))
if (modeStatus == "dark") {
  main.classList.add("darkMode")
  darkModeTogglerContainer.classList.add("activeTogglerContainer")
  thead.classList.add("activeHeadingOne")
  darkToggler.classList.add("activeMoon")
  headingOne.classList.add("activeHeadingOne")
  tbodyMode.classList.add("activeHeadingOne")
}

darkToggler.addEventListener("click", () => {
  // toggle
  main.classList.toggle("darkMode")
  darkModeTogglerContainer.classList.toggle("activeTogglerContainer")
  darkToggler.classList.toggle("activeMoon")
  headingOne.classList.toggle("activeHeadingOne")
  thead.classList.toggle("activeHeadingOne")
  tbodyMode.classList.toggle("activeHeadingOne")

  if (main.classList.contains("darkMode")) {
    localStorage.setItem("darkMode", JSON.stringify("dark"))
  } else {
    localStorage.setItem("darkMode", JSON.stringify("light"))
  }
})

// ********************************************************************************************
// *****************FORM VALIDATION AND COLLECTING FORM DATA***********************************
// ********************************************************************************************
const form = document.querySelector("form")
const submitButton = document.querySelector("#submitBtn")
submitButton.addEventListener("click", collectData)

let newAuthor = []

function collectData(e) {
  //   const decision = confirm("Are you sure you want to submit?")
  const parent = e.target.parentElement
  const title = parent.children[0].children[0].value
  const author = parent.children[1].children[0].value
  const isbn = parent.children[2].children[0].value

  const authorInfo = {
    title: title,
    author: author,
    isbn: isbn,
  }

  if (title == "" || author == "") {
    form.classList.add("was-validated")
  } else if (isbn == "") {
    form.classList.add("was-validated")
  } else {
    form.addEventListener("submit", dataSubmission(authorInfo))
  }
}

function dataSubmission(author) {
  newAuthor.push(author)

  setTimeout(() => {
    location.reload()
    localStorageUpdate()

    alert("Successful")
  }, 1000)
}

// ************************************************************************************
// ***************** LOCAL STORAGE UPDATE and DISPLAY *********************************************
// ************************************************************************************

function localStorageUpdate() {
  //check if a key exist in local storage
  const existingAuthors = JSON.parse(localStorage.getItem("Authors"))
  if (existingAuthors === null) {
    localStorage.setItem("Authors", JSON.stringify(newAuthor))
    return
  }

  newAuthor = [...newAuthor, ...existingAuthors]
  localStorage.setItem("Authors", JSON.stringify(newAuthor))
}
renderDOM()
function renderDOM() {
  const allAuthors = JSON.parse(localStorage.getItem("Authors"))
  // const allAuthors = localStorage.getItem("Authors") ? JSON.parse(localStorage.getItem("Authors")) : []

  // Rendering LocalStorage Data on the DOM
  const tbody = document.querySelector("tbody")
  // const tr = document.createElement("tr")
  // let trContents = ""

  allAuthors.map((authorInfo, idx) => {
    const { title, author, isbn } = authorInfo
    const tr = document.createElement("tr")
    let trContents = `
          <td>${idx}</td>
          <td>${title}</td>
          <td>${author}</td>
          <td>${isbn}</td>
          <td>
            <div class='btn-group'>

              <button type="button" class="btn btn-success viewAuthor" data-bs-toggle="modal" data-bs-target="#author">
               View
              </button>
              <button class="btn btn-danger">X</button>


            </div>
          </td>
        `
    tr.innerHTML = trContents
    tbody.appendChild(tr)
  })
}

// *****************************************************************************************
// ********************* REMOVE A BOOK FROM THE LIST  ***************************************
// *****************************************************************************************

const deleteBtn = document.getElementsByClassName("btn-danger")
for (let delBtn of deleteBtn) {
  delBtn.addEventListener("click", deleteFunc)
}
function deleteFunc(e) {
  let Authors = JSON.parse(localStorage.getItem("Authors"))
  const idx =
    e.target.parentElement.parentElement.parentElement.children[0].textContent

  const confirmDelete = confirm("Are you sure you want to delete?")

  if (confirmDelete) {
    Authors = Authors.filter((author) => {
      return Authors.indexOf(author) != idx
    })
  }
  localStorage.setItem("Authors", JSON.stringify(Authors))

  setTimeout(() => {
    location.reload()
  }, 1000)
}

// ***************************************************************************************
// ************************** MODAL FOR EACH ITEM     ************************************
// ***************************************************************************************
const modalTitle = document.querySelector("#modalTitle")
const modalAuthor = document.querySelector("#modalAuthor")
const modalISBN = document.querySelector("#modalISBN")
const view = document.querySelectorAll(".viewAuthor")

for (let viewBtn of view) {
  viewBtn.addEventListener("click", modalFunc)
}

function modalFunc(e) {
  let Authors = JSON.parse(localStorage.getItem("Authors"))

  const idx =
    e.target.parentElement.parentElement.parentElement.children[0].textContent

  Authors = Authors.filter((author) => {
    return Authors.indexOf(author) == idx
  })

  const { title, author, isbn } = Authors[0]
  modalTitle.textContent = title
  modalAuthor.textContent = author
  modalISBN.textContent = isbn
}
