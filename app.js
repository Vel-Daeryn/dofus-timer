let startTime
let timerInterval
let fightCount = 0
let startState = false

const btnStart = document.getElementById("start")
const btnCombat = document.getElementById("add-combat")

const timer = document.getElementById("timer")
const totalCombat = document.getElementById("total-combat")
const combatPerMinute = document.getElementById("combat-minute")

btnStart.addEventListener("click", (e) => {
    e.preventDefault()
    if(!startState){
        startSession()
        startState = true
    } else {
        endSession()
        startState = false
    }
})

btnCombat.addEventListener("click", (e) => {
    e.preventDefault()
    addFight()
})

const startSession = () => {
    startTime = Date.now()
    fightCount = 0

    totalCombat.textContent = fightCount
    timer.textContent = timeFormated(0)

    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime

        timer.textContent = timeFormated(elapsedTime)

        fightPerMinute()
    }, 1000)
}

const timeFormated = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)

    return [
        hours,
        minutes,
        seconds
    ]
    .map(value => String(value).padStart(2, "0"))
    .join(":")
}

const addFight = () => {
    fightCount++
    totalCombat.textContent = fightCount

    fightPerMinute()
}

const fightPerMinute = () => {
    const elapsedTime = Date.now() - startTime

    if (elapsedTime < 60000) {
        combatPerMinute.textContent = "-"
        return
    }
    
    const totalMinutes = elapsedTime / 60000
    const fightsPerMinute = fightCount / totalMinutes

    combatPerMinute.textContent = fightsPerMinute.toFixed(1)
}

const endSession = () => {
    clearInterval(timerInterval)
}