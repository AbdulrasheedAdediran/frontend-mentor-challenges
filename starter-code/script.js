const navLinks = document.getElementsByClassName('nav__links')[0]
const navMenu = document.getElementsByClassName('nav__menu')[0]
// const slider = document.querySelector('.slider--container')
const slider = document.getElementById('#slider--container')
const slides = Array.from(document.querySelectorAll('.slide'))

// Finger or mouse touched or clicked down
let isDragging = false, 
//startPos: Wherever you click or put your finger on the screen
startPosition = 0, 
// Current translate
currentTranslate = 0,
// Previous translate 
prevTranslate = 0, 
animationID = 0, 
// Current slide
currentIndex = 0

// 
slides.forEach((slide, index) =>{
// Remove shadow-like effect when dragging image
const slideImage = slide.querySelector('img')
slideImage.addEventListener('dragstart', (e) => e.preventDefault())


// Touch events
slide.addEventListener('touchstart', touchStart(index))
slide.addEventListener('touchend', touchEnd)
slide.addEventListener('touchmove', touchMove)


// Mouse events
slide.addEventListener('mousedown', touchStart(index))
slide.addEventListener('mouseup', touchEnd)
slide.addEventListener('mouseleave', touchEnd)
slide.addEventListener('mousemove', touchMove)

})

// Disable context menu
window.oncontextmenu = function(event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}

function touchStart(index) {
    return function(event) {
        currentIndex = index
        startPosition = getPositionX(event)
        isDragging = true

        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
}

function touchEnd() {
        isDragging = false
        cancelAnimationFrame(animationID)

        const movedBy = currentTranslate - prevTranslate

        if(movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
       
        if(movedBy > 100 && currentIndex > 0) currentIndex -= 1

        setPositionByIndex()

        slider.classList.remove('grabbing')
}

function touchMove(event) {
    if(isDragging) {
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPosition
    }
}

function getPositionX(event) {
    event.type.includes('mouse') 
        ? event.pageX 
        : event.touches[0].clientX
}


function setPositionByIndex(){
    currentTranslate = currentIndex * -window.innerWidth

    prevTranslate = currentTranslate

    setSliderPosition()
}
function animation() {
    setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function toggleMenu() {
    navLinks.classList.toggle('display')
    navMenu.classList.toggle('display')
}

navMenu.addEventListener('click', toggleMenu)