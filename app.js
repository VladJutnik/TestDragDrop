console.log(1111)
const list = document.querySelectorAll('.list'),
    button = document.querySelector('.rgrgrgr')

//добавление задачи
function addTask(){
    //получаем данные со страницы
    const btn = document.querySelector('.add_btn'),
        addBtn = document.querySelector('.add_item-btn'),
        canselBtn = document.querySelector('.canncel_item-btn'),
        textare = document.querySelector('.textarea'),
        form = document.querySelector('.form')

    let value
    //работа с карточкой добавление
    btn.addEventListener('click', ()=>{
        form.style.display = 'block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'
        textare.addEventListener('input', e=>{
            value = e.target.value
            if(value){
                addBtn.style.display = 'block'
            } else {
                addBtn.style.display = 'none'
            }
        })
    })
    canselBtn.addEventListener('click', ()=>{
        textare.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'block'
    })
    addBtn.addEventListener('click', ()=>{
        const newItems = document.createElement('div')
        newItems.classList.add('list_item')
        newItems.draggable = true
        newItems.textContent = value
        list[0].append(newItems)
        textare.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'block'
        dragAndDrop()
    })
}
addTask()
//добавление доски
function addBoard(){
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards_items')
    board.innerHTML = ` 
    <span contenteditable="true" class="title">Название</span>
    <div class="list"></div>`
    boards.append(board)
    changeTitle()
    dragAndDrop()
}
button.addEventListener('click',addBoard)
//добавление доски
function changeTitle(){
    const titles = document.querySelectorAll('.title')
    titles.forEach(title =>{
        title.addEventListener('click', e=> {
            e.target.textContent = ''
        })
    })
}
changeTitle()
//перетаскивание
let dragItem = null //тот элемент который будем перетаскивать
/*let list = null //тот элемент который будем перетаскивать*/
function dragAndDrop(){
    const listItems = document.querySelectorAll('.list_item'),
        lists2 = document.querySelectorAll('.list')
    //перебераем массивы
    for(let i = 0; i < listItems.length; i++){
        const item = listItems[i]
        //начали перемещать элемент
        item.addEventListener('dragstart', ()=>{
            dragItem = item
            setTimeout(()=>{
                //при перетаскивание мы скрываем блок а нужно его удалять!
                item.style.display = 'none'
            }, 0.2)
        })
        //Надо сделать так при перетаскивании не удалять элемент сразу а только после того как он dragend совершил
        //закончили перемещать элемент
        item.addEventListener('dragend', ()=>{
            setTimeout(()=>{
                item.style.display = 'block'
                dragItem = null
            }, 0.2)
        })
        //удаление элемента
        item.addEventListener('dblclick', ()=>{
            item.remove()
        })

        for(let j = 0; j < lists2.length; j++){
            const list555 = lists2[j]
            //перетакивание на новую доску
            list555.addEventListener('dragover', e =>{
                e.preventDefault()
            })
            list555.addEventListener('dragenter', function (e){
                e.preventDefault() //убираем стандартные работы браузера
                this.style.backgroundColor = 'rgba(0,0,0,.3)'
            })
            list555.addEventListener('dragleave', function (e){
                this.style.backgroundColor = 'rgba(0,0,0,0)'
            })
            list555.addEventListener('drop', function (e){
                this.style.backgroundColor = 'rgba(0,0,0,0)'
                this.append(dragItem)
            })
        }
    }
}
dragAndDrop()