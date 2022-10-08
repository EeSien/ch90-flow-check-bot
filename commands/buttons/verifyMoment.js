const { verifyMoment } = require('../../flow/scripts/nbatopshot.js');

const execute = async (interaction, options, emeraldIds) => {
    const momentId = options[0];
    const roleId = options[1];

    const owns = await verifyMoment(emeraldIds["dapper"], momentId);
    if (owns === true) {
        interaction.member.roles.add(roleId).catch((e) => console.log(e));
        await interaction.editReply({ content: "You have been given the " + `<@&${roleId}>` + " role.", ephemeral: true });
    } else {
        await interaction.editReply({ content: owns.message, ephemeral: true });
    }
}


module.exports = {
    name: 'button-verifyMoment',
    description: 'verifies if a user has a specific nbatopshot moment',
    execute,
}