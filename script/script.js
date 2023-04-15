const submitBtn = document.querySelector(".submit-btn")
const listWrapper = document.querySelector(".list-wrapper")
const createInp = document.querySelector("#main-create__inp")




submitBtn.addEventListener("click", addTasks)

// delete
listWrapper.addEventListener("click", deleteTask)

//edit
listWrapper.addEventListener("click", editTasks)

//done
listWrapper.addEventListener("click", doneTasks)


function addTasks() {

    // создание главной обертки

    const listItem = document.createElement("div")
    listItem.classList.add("footer-listItem__div")
    listWrapper.insertAdjacentElement("afterbegin", listItem)

    // создание элемента для радиокнопки

    const radioDiv = document.createElement("div")
    radioDiv.classList.add("radio-div")
    listItem.insertAdjacentElement("afterbegin", radioDiv)

    // проверка какой из радиокнопок 

    const selected = document.querySelector('input[name="category"]:checked').value;
    if (selected === "bus") {
        const radioBusiness = `
        <label>
        <input type="radio"  class="real-radio" id="radio-business" value="bus" data-action="done">
        <span class="custom-radio-business" id="business"></span>
        </label>
        `
        radioDiv.insertAdjacentHTML("afterbegin", radioBusiness)
    }
    else if (selected === "pers") {
        const radioPers = `
        <label>
        <input type="radio" id="radio-personal" class="real-radio"  value="pers" data-action="done">
        <span class="custom-radio-personal" id="personal"></span>
        </label>
        `
        radioDiv.insertAdjacentHTML("afterbegin", radioPers)
    }

    // создание текста

    const listItemtext = document.createElement("p")
    listItemtext.classList.add("footer-listItem__p")
    listItemtext.textContent = createInp.value
    radioDiv.insertAdjacentElement("afterend", listItemtext)

    // создание кнопок исправления и удаления

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-btn")
    editBtn.textContent = "edit"
    editBtn.setAttribute("data-action", "edit")
    listItemtext.insertAdjacentElement("afterend", editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete-btn")
    deleteBtn.textContent = "delete"
    deleteBtn.setAttribute("data-action", "delete")
    editBtn.insertAdjacentElement("afterend", deleteBtn)

    createInp.value = ""
    createInp.focus()
}

function deleteTask(event) {
    if (event.target.dataset.action === "delete") {
        const parentNode = event.target.closest(".footer-listItem__div")
        parentNode.remove()
    }
}

function doneTasks(event) {
    if (event.target.dataset.action === "done") {
        const parentNode = event.target.closest(".footer-listItem__div")
        const taskText = parentNode.querySelector(".footer-listItem__p")
        const ediInp = parentNode.querySelector("edit-inp")
        taskText.classList.toggle("footer-listItem__i")
    }
}

function editTasks(event) {
    if (event.target.dataset.action === "edit") {
        const parentNode = event.target.closest(".footer-listItem__div")
        const taskText = parentNode.querySelector(".footer-listItem__p")
        const editInp = document.createElement("input")
        editInp.classList.add("edit-inp")
        editInp.setAttribute("value", `${taskText.textContent}`)
        editInp.setAttribute("type", `text`)
        taskText.insertAdjacentElement("afterend", editInp)
        taskText.classList.add("footer-listItem-hide")
        taskText.classList.remove("footer-listItem__p")


        const editBtnSubmit = document.createElement("button")
        editBtnSubmit.setAttribute("type", "submit")
        editBtnSubmit.textContent = "Ok"
        editBtnSubmit.classList.add("edit-submit")
        editInp.insertAdjacentElement("afterend", editBtnSubmit)
        editBtnSubmit.addEventListener("click", () => {
            taskText.textContent = editInp.value
            editInp.style.display = "none"
            taskText.classList.add("footer-listItem__p")
            taskText.classList.remove("footer-listItem-hide")
            editBtnSubmit.style.display ="none"
        })
    }
}
