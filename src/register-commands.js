const {REST,Routes,ApplicationCommandOptionType}=require('discord.js')
require('dotenv').config()

const commands=[
    {
        name:"hey",
        description:'Replies with hey!',
    },
    {
        name:"embed",
        description:"send embed message"
    },
    {
        name:'ping',
        description:'Returns the bot ping'
    },
    {
        name:'add',
        description:"Add two numbers",
        options:[
            {
                name:'first_number',
                description:"the first number",
                type: ApplicationCommandOptionType.Number,
                choices:[{
                    name:'one',
                    value:1,
                },
            {
                name:'two',
                value:2,
            },
        {
            name:'three',
            value:3
        }],

        required:true,
            },
            {
                name:'second_number',
                description:"the second number",
                type:ApplicationCommandOptionType.Number,
                required:true,
            }
        ]
    }
];
const rest=new REST({version:'10'}).setToken(process.env.token);
(async()=>{
    try{
        console.log("Registering slash Commands.....")
        await rest.put(
            Routes.applicationCommands(
                process.env.client_id,
                process.env.guild_id
            ),{body:commands}
        );
        console.log("registration successfull ....")
    }
    catch(err){
        console.log(`There was an error ${err}\nfailed to register slash commands`)
    }
})();