module.exports = (client, message) => {
    if(!message.channel) return;
    if(message.author.bot) return;
    if(!message.content.startsWith('ua! ')) return;

    const args = message.content.slice('ua! '.length).trim()
        .split(/ +/g)
    const command = args.shift().toLowerCase()

    const cmd = client.commands.get(command)

    if(!cmd) return;

    cmd.run(client, message, args)
}