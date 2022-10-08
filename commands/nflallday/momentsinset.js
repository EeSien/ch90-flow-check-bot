const { getMomentsInSet } = require('../../flow/scripts/nflallday.js');

const execute = async (interaction, options) => {
  await interaction.deferReply();
  let allday = await getMomentsInSet(options.getString('address'), options.getString('setname'));
  if (allday.error) {
    await interaction.editReply({ content: allday.message }).catch(e => console.log(e));
    return;
  }
  postAllDay(interaction, allday);
}

const postAllDay = async (interaction, allday) => {
  let fields = [
    {
      name: "Moments owned",
      value: `${allday.moments.length}/${Object.keys(allday.setData.setPlaysInEditions).length}`,
      inline: true
    },
    {
      name: 'Set Id',
      value: String(allday.setData.id),
      inline: true
    }
  ];
  allday.moments.forEach(moment => {
    fields.push([
      {
        name: `${moment.player ? moment.player : moment.team}, Serial #${moment.serialNumber}`,
        value: `Type: ${moment.playType} | Team: ${moment.team}`,
        inline: false
      }
    ])
  })
  let embed = {
    color: '#5bc595',
    title: allday.setData.name,
    url: `https://nflallday.com/`,
    author: {
      name: 'Emerald City',
      url: 'https://discord.gg/emeraldcity',
      iconURL: 'https://i.imgur.com/YbmTuuW.png'
    },
    description: 'Moments owned by ' + allday.owner + ' in ' + allday.setData.name,
    thumbnail: {
      url: 'https://i.imgur.com/TgnW2hd.png',
    },
    fields,
  };

  await interaction.editReply({ embeds: [embed] }).catch(e => console.log(e));
}

module.exports = {
  name: 'nflallday-momentsinset',
  description: 'display all the moments a user has from a ufc strike set',
  execute,
}