const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'hug',
    aliases: [],
    description: 'Hug someone!',
    emoji: ':people_hugging:',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first();
        if (!user) return message.reply('Please mention a user!');
        if (user == message.author.id) return message.reply(`No, U can't hug yourself.`);
        if (user == client.user.id) return message.reply(`No, U can't hug me.`);
        if (user == message.author.bot) return message.reply(`No, U can't hug bots.`);
        fetch('https://api.waifu.pics/sfw/hug')
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(`${message.author.username} hugged ${user.username}`)
                    .setImage(body.url)
                    .setColor('#FFC0CB')
                    .setFooter({
                        text: `${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({ dynamic: true }),
                    })
                    .setTimestamp();

                message.channel.send({ embeds: [embed] });
            });
    },
};
