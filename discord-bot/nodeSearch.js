const { Client, SlashCommandBuilder, Collection, GatewayIntentBits, Intents } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const keyword = "hello"; // replace "hello" with the keyword you want to search for

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const channelId = "1206282037842018386"; // replace with the ID of the channel you want to search
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.error(`Could not find channel with ID ${channelId}`);
    return;
  }

  channel.send({
    content: '/search',
    nonce: 'interaction',
    applicationId: client.user.id,
  }).then(message => {
    message.fetch().then(message => {
      const interaction = new Collection();
      interaction.set('commandName', 'search');
      interaction.set('options', { keyword });

      const event = new Client(client.options).emit('interactionCreate', message);
      event.interaction = interaction;

      interaction.execute();
    });
  }).catch(error => {
    console.error(`Error sending search request: ${error}`);
  });
});

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return;

  const keyword = interaction.options.getString('keyword');

  const channel = interaction.channel;

  try {
    const messages = channel.messages.fetch({ limit: 100 });

    const filteredMessages = messages.filter(message => message.content.includes(keyword));
    const messageContents = filteredMessages.map(message => message.content);

    console.log(messageContents)
    if (filteredMessages.size === 0) {
      interaction.reply({ content: `No messages found containing the keyword "${keyword}".`, ephemeral: true });
    } else {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`Messages containing "${keyword}"`)
        .setFooter({ text: 'Created by Looney Bot.' });
      const fields = filteredMessages.map(message => {
        return {
          name: `${message.author.username} - ${message.createdAt}`,
          value: message.content,
        };
      });
      embed.addFields(fields);

      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  } catch (error) {
    console.error(error);
    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login('MTIwNjg3NzMyOTEwNDU3NjU3Mg.Gte5XY.hSvpATfMQjytMkx_CETAwRWtGe2l1zDJbanwa4'); // replace with your bot token