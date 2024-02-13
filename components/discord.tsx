import { sendDiscordMessage } from "@/app/_actions/discord"

const discordPage = async () => {
  await sendDiscordMessage("/search keyword: hu")

  return null
}

export default discordPage;