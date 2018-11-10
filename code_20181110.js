let runtime = 0
let offswitch = false
let minutes = 0
let x = 0
let y = 0
let counter = 0
let tenminutes = 0
tenminutes = 0
counter = 0
y = 0
x = 0
minutes = 10
runtime = 2000
offswitch = false

led.enable(true)
led.setBrightness(255)
basic.showString("Time")

input.onButtonPressed(Button.A, function () {
    led.enable(true)
    led.setBrightness(255)
    if (tenminutes < 25) {
        tenminutes += 1
        y = Math.idiv(tenminutes - 1, 5)
        x = (tenminutes - 1) % 5
        led.toggle(x, y)
    } else {
        basic.showLeds(`
            # # # # #
            # # . # #
            # . # . #
            # # . # #
            # # # # #
            `)
    }
})
input.onButtonPressed(Button.AB, function () {
    led.enable(true)
    led.setBrightness(255)
    tenminutes = 0
    counter = 0
    y = 0
    x = 0
    basic.showString("10 Min / LED")
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    if (tenminutes > 0) {
        led.setBrightness(50)
        while (counter < 60000 * tenminutes * minutes) {
            basic.showIcon(IconNames.Heart)
            basic.pause(200)
            basic.clearScreen()
            basic.pause(4800)
            counter += 5000
        }
        if (offswitch == true) {
            while (pins.digitalReadPin(DigitalPin.P1) == 0) {
                led.setBrightness(255)
                basic.showIcon(IconNames.Yes)
                pins.digitalWritePin(DigitalPin.P12, 1)
                pins.digitalWritePin(DigitalPin.P8, 0)
            }
            pins.digitalWritePin(DigitalPin.P12, 1)
            pins.digitalWritePin(DigitalPin.P8, 1)
            basic.pause(50)
            pins.digitalWritePin(DigitalPin.P12, 0)
            pins.digitalWritePin(DigitalPin.P8, 0)
            basic.clearScreen()
            led.enable(false)
        } else {
            basic.showIcon(IconNames.Yes)
            led.setBrightness(255)
            pins.digitalWritePin(DigitalPin.P12, 1)
            pins.digitalWritePin(DigitalPin.P8, 0)
            basic.pause(runtime)
            pins.digitalWritePin(DigitalPin.P12, 1)
            pins.digitalWritePin(DigitalPin.P8, 1)
            basic.pause(50)
            pins.digitalWritePin(DigitalPin.P12, 0)
            pins.digitalWritePin(DigitalPin.P8, 0)
            basic.clearScreen()
            led.enable(false)
        }
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        basic.pause(2000)
        basic.clearScreen()
        led.enable(false)
    }
})

