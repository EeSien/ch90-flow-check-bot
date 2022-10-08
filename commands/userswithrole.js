const { MessageAttachment, Permissions } = require('discord.js');
const { checkEmeraldIDBatch, checkEmeraldIDBatchSpecific } = require('../flow/scripts/checkEmeraldID');

const execute = async (interaction, options) => {
  if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
    await interaction.deferReply({ ephemeral: true });
    const role = options.getRole('role');
    const walletType = options.getString('wallet');
    if (!role) {
      await interaction.editReply({ ephemeral: true, content: 'This role does not exist.' }).catch(e => console.log(e));
      return;
    }
    sendInfo(interaction, role, walletType);
  }
}

const sendInfo = async (interaction, role, walletType) => {
  await interaction.guild.members.fetch();

  // Maps discordID => discord username
  const usersWithRole = {};
  role.members.forEach(member => {
    usersWithRole[member.user.id] = member.user.tag;
  })

  // Maps discord username => emeraldID
  let fields = {};
  // A list of discordIDs
  const userIDs = Object.keys(usersWithRole);
  // Maps discordID => EmeraldID
  const answer = walletType ? await checkEmeraldIDBatchSpecific(userIDs, walletType) : await checkEmeraldIDBatch(userIDs);
  for (let i = 0; i < userIDs.length; i++) {
    let emeraldID = answer[userIDs[i]];
    let userTag = usersWithRole[userIDs[i]];
    fields[userTag] = emeraldID || 'N/A';
  }
  const csv = csvmaker(fields);

  const userList = new MessageAttachment(Buffer.from(csv), 'users.csv');
  await interaction.editReply({ content: `Users with the <@&${role.id}> role:`, files: [userList] });
}

const csvmaker = function (data) {

  // Empty array for storing the values
  let csvRows = [];

  for (const discordName in data) {
    const row = discordName + ',' + data[discordName];
    csvRows.push(row);
  }

  // Returning the array joining with new line
  return csvRows.join('\n')
}

module.exports = {
  name: 'userswithrole',
  description: 'get discord name and address of someone in a role',
  execute
}