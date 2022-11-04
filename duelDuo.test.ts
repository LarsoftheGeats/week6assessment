
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    
    expect(displayed).toBe(true)
})

test('Draw button displays robots', async() => {
    const drawButton = await driver.findElement(By.id("draw")).click()
    driver.sleep(2000)
    const choices = await driver.findElement(By.id('choices'))
    const displayed = await choices.isDisplayed()
    expect(displayed).toBe(true)
})

test('Choosing a robot displays player-duo', async() => {
    const chooseButton = await driver.findElement(By.className("bot-btn")).click()
    driver.sleep(2000)
    const duo = await driver.findElement(By.id('player-duo'))
    const displayed = await duo.isDisplayed()  
    expect(displayed).toBe(true)
})