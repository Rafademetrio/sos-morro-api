import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import config from "./configurations/config"
import auth from "./middlaware/auth"
import cors = require('cors')


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    let corsOptions = { 
        origin : '*',
     } 
    
    app.use(
        // cors(corsOptions)
        function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
        
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', "true");
        
            // Pass to next layer of middleware
            next();
        }
    )     

    

    // app.use(auth);

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, cors(corsOptions) , (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.listen(config.port, '0.0.0.0', () =>{
        console.log(`Api initilize in port ${config.port}`)
    })
    

}).catch(error => console.log(error))
