const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
    .setName('search')
	.setDescription('Search for messages containing a specific keyword')
	.addStringOption(option =>
		option.setName('keyword')
			.setDescription('The keyword to search for')
			.setRequired(true)),
	async execute(interaction) {

        if (!interaction.isCommand()) return;

        const commandName = interaction.commandName;
    
        if (commandName === 'search') {
            const keyword = interaction.options.getString('keyword');
            const channel = interaction.channel;
    
            try {
                const messages = await channel.messages.fetch({ limit: 100 });
                
                const filteredMessages = messages.filter(message => message.content.includes(keyword));
                const messageContents = filteredMessages.map(message => message.content);

                console.log(messageContents)
                if (filteredMessages.size === 0) {
                    await interaction.reply({ content: 'No messages found containing the specified keyword.', ephemeral: true });
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
                          })
                          
                          
                          embed.addFields(fields);

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }

	},
};





