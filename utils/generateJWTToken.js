import Jwt from 'jsonwebtoken';
export function generateToken  (id , username)  {
    const payload = { id, username}
    const token = Jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })
    return token;
}