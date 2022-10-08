const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');

const execute = async (interaction, options) => {
  if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
    let role = interaction.guild.roles.cache.find(role => role === options.getRole('role'));
    if (!role) {
      await interaction.reply({ ephemeral: true, content: 'This role does not exist.' }).catch(e => console.log(e));
      return;
    }

    const momentId = options.getNumber('momentid');
    verifyMomentButton(interaction, momentId, role.id);
  }
}

const verifyMomentButton = async (interaction, momentId, roleId) => {
  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`verifyMoment-${momentId}-${roleId}`)
        .setLabel('Verify')
        .setStyle('SUCCESS'),
      new MessageButton()
        .setURL('https://id.ecdao.org/')
        .setLabel('Manage EmeraldID')
        .setStyle('LINK')
    );

  const embed = new MessageEmbed()
    .setColor('#5bc595')
    .setTitle(`Verify you own the moment with ID #${momentId}`)
    .setAuthor('Emerald City', 'https://i.imgur.com/YbmTuuW.png', 'https://discord.gg/emeraldcity')
    .setDescription('Click the `Verify` button below to get the ' + `<@&${roleId}>` + ' role with your EmeraldID.')
    .setThumbnail('https://i.imgur.com/DPmasa5.jpg');

  await interaction.reply({ embeds: [embed], components: [row] }).catch(e => console.log(e));
}

module.exports = {
  name: 'nbatopshot-verifymoment',
  description: 'setup a role verification with emeraldid to verify a specific moment',
  execute,
}