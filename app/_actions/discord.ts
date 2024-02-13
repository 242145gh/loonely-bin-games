"use server"

export const sendDiscordMessage = async (message: any) => {
  try {
    // A fetch request to send data through the discord
    // webhook, and display it as a message in your
    // discord channel
    await fetch('https://discord.com/api/webhooks/1206300278060482641/Hhh7_3H32lq9u3ci4-QAAAHg9kYlEOhKiKMIjjAFiP-r1k6aiwx8tLoY6oSjCSmNE-Sz', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    })
  } catch (err: any) {
    // Just in case :)
    console.log(err.message)
  }
}


export const searchDiscordMessage = async (search: string) => {
  try {
    // A fetch request to send data through the discord
    // webhook, and display it as a message in your
    // discord channel
    await fetch('https://discord.com/api/webhooks/1206300278060482641/Hhh7_3H32lq9u3ci4-QAAAHg9kYlEOhKiKMIjjAFiP-r1k6aiwx8tLoY6oSjCSmNE-Sz', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: search,
      }),
    })
  } catch (err: any) {
    // Just in case :)
    console.log(err.message)
  }
}