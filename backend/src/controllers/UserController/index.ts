import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs';
import * as Yup from 'yup'

import AuthControler from '../../auth/auth'
import User from '../../models/User'

class UserController {
    async index (req:Request,res:Response){
        const userRepository = getRepository(User)
        
        const users = await userRepository.find({})

        return res.json(users)
    }

    async show (req:Request,res:Response){

        try {
            const { email, password } = req.body;
        
            const userRepository = getRepository(User)
        
            const [user] = await userRepository.find({ email })
        
            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }
            console.log(user.password)
            if (!(await AuthControler.compareHash(password, user.password))) {
                return res.status(400).json({ error: "Invalid password" });
            }
            return res.json({
                user: {email},
                token: await AuthControler.generateToken(email)
            });
        } catch (err) {
            return res.status(400).json({ error: "User authentication failed" });
        }
    }

    async create (req:Request,res:Response){
        
        const { email, password } = req.body

        const userRepository = getRepository(User)

        const [user] = await userRepository.find({ email })

        if(!user){

            const schema = Yup.object().shape({
                email: Yup.string().required(),
                password: Yup.string().required()
            })
    
            await schema.validate({
                email,
                password
            },{ abortEarly:false })
    
            const newPassword = await bcrypt.hash(password, 10);
    
            const data = {email, password: newPassword}
    
            const user = userRepository.create(data)
            
            try{
                await userRepository.save(user)
            }
            catch(error){
                console.error(error)
            }
    
            return res.status(201).json(user)
        }
        else{
            return res.status(400).json({error:"User has exist"})
        }
    }
    
    async delete (req:Request,res:Response){
        const { id } = req.params

        return res.send({
            description: "delete any"
        })
    }
}

export default new UserController()
    