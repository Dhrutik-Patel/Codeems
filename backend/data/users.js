import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Dhrutik Patel',
        email: 'dhrutikpatel2017@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
    },
    {
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
    },
];

export default users;
