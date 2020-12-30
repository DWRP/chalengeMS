import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

import { resolve } from 'path' 
import { readFile, writeFile } from 'fs'
import { promisify } from 'util'

const readAsync = promisify(readFile)
const writeAsync = promisify(writeFile)

interface ValidationErrors{
    [key: string]: string[] 
}

const errorHandler: ErrorRequestHandler = async (err, req, res, next) =>{
    if (err instanceof ValidationError){
        let errors: ValidationErrors = {}

        err.inner.forEach(erro=>{
            errors[err.path?err.path:0] = erro.errors
        })

        return res.status(400).json({
            error: 400,
            type: 'Validation',
            message: 'Validation Fail Errors',
            errors
        })
    }
    try{
        const file = await readAsync(resolve(__dirname,'log.json'),'utf8')
        const jsonFile = JSON.parse(file.toString())

        const newData = [
                ...jsonFile,
                {
                    date: Date.now(),
                    error: err
                }
            ]
        await writeAsync(resolve(__dirname,'log.json'),JSON.stringify(newData))

    }catch(error){
        console.error(err)
        console.error(error)
    }

    return res.status(500).json({
        error: 500,
        type: 'Server',
        message: 'Internal Server Error'
    })
}

export default errorHandler