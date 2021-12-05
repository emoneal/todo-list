//GETS TODOS FROM DATABASE

function getData() {
    axios.get("https://api.vschool.io/emioneal/todo")
        .then(res => listData(res.data))
        .catch(err => console.log(err))
}
        
// LISTS TODOS ON THE PAGE

function listData(data) {
    clearList()

    for (let i = 0; i < data.length; i++) {
        
        const checkbox = document.createElement('input')
        checkbox.setAttribute("type", "checkbox")

        if (data[i].completed === true) {
            checkbox.checked = "checked"
            checkbox.addEventListener("change", function() {
                axios.put("https://api.vschool.io/emioneal/todo/" + data[i]._id, {completed: false})
                .then (res => getData())
                .catch (err => console.log(err))
            })
        } else {
            checkbox.addEventListener("change", function() {
                axios.put("https://api.vschool.io/emioneal/todo/" + data[i]._id, {completed: true})
                .then (res => getData())
                .catch (err => console.log(err))
            })
        }

        const img = document.createElement('img')
        img.src = data[i].imgUrl    
        const h2 = document.createElement('h2')
        h2.textContent = data[i].title

        const h4 = document.createElement('h4')
        h4.textContent = data[i].description


        const priceText = document.createElement('h4')
        priceText.textContent = data[i].price

        if (data[i].completed === true) {
            h2.style.setProperty("text-decoration", "line-through")
            h4.style.setProperty("text-decoration", "line-through")
            priceText.style.setProperty("text-decoration", "line-through")
            h2.style.setProperty("color", "darkgray")
            h4.style.setProperty("color", "darkgray")
            priceText.style.setProperty("color", "darkgray")
        }

        const hr = document.createElement('hr')

        const delButton = document.createElement('button')
        delButton.textContent = "X"
        delButton.setAttribute("id", "deleteButton")

        delButton.addEventListener("click", function () {
            axios.delete("https://api.vschool.io/emioneal/todo/" + data[i]._id)
            .then (res => getData())
            .catch (err => console.log (err))
        })
        
        
        document.getElementById('todo-list').appendChild(checkbox)
        document.getElementById('todo-list').appendChild(img)
        document.getElementById('todo-list').appendChild(h2)
        document.getElementById('todo-list').appendChild(priceText)
        document.getElementById('todo-list').appendChild(h4)
        document.getElementById('todo-list').appendChild(delButton)
        document.getElementById('todo-list').appendChild(hr)
        

    }
}

function clearList() {
    const el = document.getElementById('todo-list')
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

getData()

//POST DATA to DATABASE

const todoForm = document.todoForm

todoForm.addEventListener("submit", function(e) {
    e.preventDefault()

    const newTodo = {
        title: todoForm.title.value,
        description: todoForm.desc.value,
        price: todoForm.price.value,
        imgUrl: todoForm.imgURL.value
    }

    todoForm.title.value = ""
    todoForm.desc.value = ""
    todoForm.price.value = ""
    todoForm.imgURL.value = ""

    axios.post("https://api.vschool.io/emioneal/todo", newTodo)
        .then(res => getData())
        .catch(err => console.log(err))
    
})