const { Events } = require('discord.js');
const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
	name: Events.SearchMessages,
	
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const keyword = interaction.options.getString('keyword');
		const channel =  interaction.channel;

		try {
			const messages = await channel.messages.fetch({ limit: 100 });
			const filteredMessages = messages.filter(message => message.content.includes(keyword));
			const messageContents = filteredMessages.map(message => message.content);
			console.log(messageContents)

			if (filteredMessages.size === 0) {
				await interaction.reply({ content: 'No messages found containing the specified keyword.', ephemeral: true });
			} else {
				const embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`Messages containing "${keyword}"`);

				filteredMessages.each(message => {
					embed.addField(`${message.author.username} - ${message.createdAt}`, message.content);
				});

				await interaction.reply({ embeds: [embed], ephemeral: true });
			}
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

	},
};