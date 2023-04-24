'use strict'

// Робимо меню бургур.

function burger() {
    let butgerBtn = document.querySelector('.header__burger')
    let closeBtn= document.querySelector('.nav__close')
    let nav = document.querySelector('.nav')

    if(butgerBtn) {
        butgerBtn.addEventListener("click", function() {
            if(nav) {
                nav.classList.add('active')
            }
        })
    }

    if(closeBtn) {
        closeBtn.addEventListener("click", function() {
            if(nav) {
                nav.classList.remove('active')
            }
        })
    }
}

burger()

// Робимо клік на кнопку 'подробнее'.
function scrollGo() {
    let btnGo = document.querySelectorAll('.btns-scroll')
    let header = document.querySelector('.header')

    if(btnGo) {
        btnGo.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault()

                let id = this.dataset.id
                let section = document.querySelector(`#${id}`)

                if(section) {
                    let scrollTop = section.getBoundingClientRect().top - (header ? header.clientHeight : 0)

                    window.scrollBy({
                        top: scrollTop,
                        behavior: 'smooth'
                    })
                }
            })
        })
    }
}

scrollGo()

// Через атребут value додаємо фон для варіантів.
function addColors() {
    let items = document.querySelectorAll('.question-colors__item')

    if(items.length) {
        items.forEach(item => {
            let inputColor = item.querySelector('input').value 

            if(inputColor) {
                let label = item.querySelector('label')

                label.style.background = inputColor
            }
        })
    }
}

addColors()

// Робимо клік на кнопку і переходимо до наступного питання.

function goNextQuestion() {
    let bntGo = document.querySelector(".box-form__btn")
    let count = 1

    if(bntGo) {
        let questionActive = document.querySelector(".question.active")
        let questions = document.querySelectorAll(".question")
        let form = document.querySelector(".box-form")
        let preloader = document.querySelector(".box-preloader")

            if(questionActive.classList.contains("active")) {
                bntGo.classList.add('_btn-not-active')
                let inputs = questionActive.querySelectorAll('input')

                if(inputs) {
                    inputs.forEach(input => {
                        input.addEventListener('change', function() {
                            if(input.checked) {
                                bntGo.classList.remove('_btn-not-active')
                                bntGo.classList.add('_btn-active')

                                if(bntGo.classList.contains('_btn-active')) {
                                    bntGo.addEventListener('click', function(e) {
                                        if(count >= questions.length) {
                                            e.preventDefault()
                                            bntGo.classList.remove('_btn-not-active')
                                            bntGo.classList.add('_btn-active')
                                            bntGo.type = 'submit'
                                            goNextQuestion()

                                            form.style.display = "none"
                                            preloader.classList.add('active')
                                            ready()
                                        } else {
                                            if(questionActive.nextElementSibling.classList.contains('question')) {
                                                questionActive.nextElementSibling.classList.add('active')
                                                questionActive.classList.remove('active')
                                            }
                                            
                                            
                                            count++
                                            goNextQuestion()
                                        }
                                    })
                                }
                            }
                        })
                    })
                }
            }

            function ready() {
                window.setTimeout(() => {
                    preloader.classList.remove('active')
                    window.location = form.action
                }, 2000)
            }
    }
}
goNextQuestion()

// Робимо запрос на сервер і получаємо дані.
function getData() {
    const url = "https://swapi.dev/api/people/1/"
    let btnPhone = document.querySelector('.call__phone')
    let modal = document.querySelector('.modal-response')
    

    if(btnPhone) {
        
        btnPhone.addEventListener('click', function(e) {
            e.preventDefault()
            fetch(url)
            .then(respons => respons.json())
            .then(data => {
                createResponse(data)
            })
        })
    }

    function createResponse(data) {
        let content = modal.querySelector('.modal-response__inner')
        modal.classList.add("active")
        console.log(data)
        content.innerHTML = `<ul>
            <li class="name">Name: ${data.name}</li>
            <li class="height">Height: ${data.height}</li>
            <li class="Mass">Mass: ${data.mass}</li>
            <li class="eye_color">Eye color: ${data.eye_color}</li>
            <li class="skin_color">Skin color: ${data.skin_color}</li>
            <li class="gender">Gender: ${data.gender}</li>
            <li class="hair_color">Hair color: ${data.hair_color}</li>
        </ul>
        `
    }
}
getData()

// Закриваємо попап.
function closePopap() {
    let modal = document.querySelector('.modal-response')
    

    if(modal) {
        let wrapper = modal.querySelector('.modal-response__wrapper')
        let close = modal.querySelector('.close')

        if(close) {
            close.addEventListener('click', function() {
                modal.classList.remove('active')
            })
        }

        if(wrapper) {
            modal.addEventListener('click', function() {
                modal.classList.remove('active')
            })
        }

        wrapper.addEventListener('click', function(e) {
            e.stopPropagation()
        })
    }

}
closePopap()


// Робимо таймер
function timer() {
    let span = document.querySelector('.call__label .inner')
    let btnPhone = document.querySelector('.call__phone')

    if(span) {
        let timeString = span.textContent;


        let [minutes, seconds] = timeString.split(':');
    
            let totalMilliseconds = (parseInt(minutes, 10) * 60 + parseInt(seconds, 10)) * 1000;
    
            const timer = setInterval(() => {
            totalMilliseconds -= 1000;
            
            minutes = Math.floor((totalMilliseconds / 1000) / 60);
            seconds = Math.floor((totalMilliseconds / 1000) % 60);
            
            timeString = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
            
            span.textContent = timeString;
            
            if (totalMilliseconds <= 0) {
                clearInterval(timer);
                
                btnPhone.classList.add('time-up')
            }
            }, 1000);
    }
}

timer()