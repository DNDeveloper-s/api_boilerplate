const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('./models/User');

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.use(function(socket, next) {
        if(socket.handshake.query && socket.handshake.query.token) {
            let decodedToken;
            try {
                decodedToken = jwt.verify(socket.handshake.query.token, 'imissananyasomuch');
                socket.decodedToken = decodedToken;
            } catch(e) {
                return next(createError(500, 'Something went wrong!'));
            }
            if(!decodedToken) {
                return next(createError(401, 'Not authorized!'));
            }
            next();
        }
    })
    .on('connection', async (socket) => {

        const connectedUserId = socket.decodedToken.userId;

        const connectedUser = await User.findById(connectedUserId);

        if(connectedUser.status !== 'online') {
            connectedUser.status = 'online';
            connectedUser.activity = {
                status: 'online',
                lastOnline: Date.now()
            }
            connectedUser.socketId = socket.id;

            await connectedUser.save();
        }
        
        io.to(socket.id).emit('logged_in', {
            _id: connectedUser._id,
            fullName: connectedUser.fullName,
            email: connectedUser.email,
            image: connectedUser.image,
            notifications: {
                entities: {},
                results: connectedUser.notifications
            },
            conversations: {
                entities: {},
                results: connectedUser.conversations
            },
            friends: {
                entities: {},
                results: connectedUser.friends
            }
        });

        socket.on('disconnect', async (socket) => {
            const connectedUser = await User.findById(connectedUserId);


            if(connectedUser.status !== 'offline') {
                connectedUser.status = 'offline';
                connectedUser.activity = {
                    status: 'offline',
                    lastOnline: Date.now()
                }
                connectedUser.socketId = undefined;
    
                await connectedUser.save();
            }
        })

    })

    return io;
}