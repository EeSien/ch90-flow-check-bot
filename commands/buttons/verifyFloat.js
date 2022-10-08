const { checkOwnsFloat, asyncCall } = require('../../flow/scripts/float.js');

const execute = async (interaction, options, emeraldIds) => {
    const eventId = options[0];
    const roleId = options[1];
    const ownsFloat = await asyncCall(Object.values(emeraldIds));
 
    if(ownsFloat < 10){
        await interaction.editReply({ content: `Your Float owning is less than 10`, ephemeral: true });
    }else if (ownsFloat >=10 && ownsFloat < 20){
        interaction.member.roles.add('1028123082700894218').catch((e) => console.log(e));
        await interaction.editReply({ content: "You have been given the " + `<@&${'1028123082700894218'}>` + " role.", ephemeral: true });
    }
    else if(ownsFloat >=20 && ownsFloat < 30)
    {
        interaction.member.roles.add('1028123179836776538').catch((e) => console.log(e));
        await interaction.editReply({ content: "You have been given the " + `<@&${'1028123179836776538'}>` + " role.", ephemeral: true });
    }else if (ownsFloat >= 30){
        interaction.member.roles.add('1028123220852883456').catch((e) => console.log(e));
        await interaction.editReply({ content: "You have been given the " + `<@&${'1028123220852883456'}>` + " role.", ephemeral: true });
    } else {
        await interaction.editReply({ content: `You do not own a collection from CH90 poap`, ephemeral: true });
    }
}


module.exports = {
    name: 'button-verifyFloat',
    description: 'verifies if a user has a float from a specific event and gives them the role for it',
    execute,
}