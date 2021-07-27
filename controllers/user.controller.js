const CustomerSupportSchema = require('../models/user.models')
const moment = require('moment')

addCustomer  = async (req, res)=> {
   
    try {
        const user = CustomerSupportSchema();
       
        //destructuring del body
        const {userId, userName} = req.body
       
        user.userId = userId;
        user.userName = userName;
        user.attended = false;
        // const userIdValidate = await CustomerSupportSchema.find()
        //Validamos las colas 
        //aqui contamos los que estan en la cola 1
        const countFirstQueue = await CustomerSupportSchema.countDocuments({attended: false, queueNumber: 1})

        //aqui contamos a los que estan en la cola
        const countSecondQueue = await CustomerSupportSchema.countDocuments({attended:false, queueNumber: 2}); 
     
        if(!countFirstQueue){ //si la primera cola esta vacia el usuario entra aqui
            user.queueNumber = 1
            //Obtenemos la fecha y la hora actual
            let now = moment(); // fecha y hora actual
            now.set('second',0); // eliminamos los segundos
            now.set('minute', now.get('minute')); // seteamos los min
            user.supportTimestamp = now.get()
        
        }else if(!countSecondQueue){ // y si la primera cola tiene 1 y la segunda esta vacia, entra aqui
            user.queueNumber = 2
            //Obtenemos la fecha y la hora actual
            let now = moment(); // fecha y hora actual
            now.set('second',0); // eliminamos los segundos
            now.set('minute', now.get('minute')); // seteamos los min
            user.supportTimestamp = now.get()

        }else if(countFirstQueue *120 > countSecondQueue *180){
            const lastCustomer = await CustomerSupportSchema.findOne({queueNumber: 2},{},{ sort: { 'supportTimestamp' : -1 }})
            user.supportTimestamp = lastCustomer.supportTimestamp + (1000*60*3)
            user.queueNumber = 2

        }else{
            const lastCustomer = await CustomerSupportSchema.findOne({queueNumber: 1},{},{sort: { 'supportTimestamp' : -1 }})
            user.supportTimestamp = lastCustomer.supportTimestamp + (1000*60*2)
            user.queueNumber = 1
        } 

       let saveUser = await user.save();
       res.send({user: saveUser})
    
    } catch (error) {

        res.status(500).send(error);
        throw error
    }
    
   

}

getCustomers = async (req, res) => {
  
    try {
        const customers = await CustomerSupportSchema.find()
        res.status(200).send({ data: customers})
       
    } catch (error) {


        console.log(error);
        res.status(500).send(error)
        throw error
    }
}



module.exports = {
    addCustomer,
    getCustomers,
   
  };