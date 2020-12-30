import { Request, Response } from 'express'

class ServerController {
    async index (req:Request,res:Response){

        return res.json({teste:true})
    }

    async status(req:Request,res:Response){
        try{
            return res.send({runing:true})
        }
        catch(error){
            return res.send({error})
        }
    }
}


export default new ServerController()