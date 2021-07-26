
const job = require('node-schedule')
const CustomerSupportSchema = require('../models/user.models')
const moment = require('moment')

module.exports ={
    jobQueue: () =>{
        job.scheduleJob('* * * * *', async ()=>{//este cron se ejecuta cada 1 minuto
            //consulta cola 1 para actualizar el estado de atendido
            const firstQueue = await CustomerSupportSchema.updateMany({
                queueNumber: 1,
                supportTimestamp: { $lt:  moment() - (1000*60*1) //query para saber cuando el cliente fue atendido
            }}, {attended: true}) //actualizando el estado
            
            const secondQueue = await CustomerSupportSchema.updateMany({
                queueNumber: 2,
                supportTimestamp: { $lt:  moment() - (1000*60*2) 
            }},{attended: true})
            
            
        })
    }
}