const CustomerSupportSchema = require('../models/user.models')


addCustomer  = async (req, res)=> {
    try {
        const user = CustomerSupportSchema();

        //destructuring del body
        const {userId, userName, queueNumber} = req.body
        user.userName = userName;
        user.userId = userId;
        const userIdValidate = await CustomerSupportSchema.find()
        //Validamos las colas 
        //aqui contamos los que estan en la cola 1
        const countFirstQueue = await CustomerSupportSchema.countDocuments({queueNumber: 1})

        //aqui contamos a los que estan en la cola
        const countSecondQueue = await CustomerSupportSchema.countDocuments({ queueNumber: 2}); 
    
        if(!countFirstQueue){ //si la primera cola esta vacia el usuario entra aqui
            user.queueNumber = 1
            //Obtenemos la fecha y la hora actual
            let now = new Date(); // fecha y hora actual
            now.setSeconds(0,0); // eliminamos los segundos
            now.setMinutes(now.getMinutes() + 1); // la agregamos 1 min
            user.supportTimestamp = now.getTime()
        
        }else if(!countSecondQueue){ // y si la primera cola tiene 1 y la segunda esta vacia, entra aqui
            user.queueNumber = 2
            //Obtenemos la fecha y la hora actual
            let now = new Date(); // fecha y hora actual
            now.setSeconds(0,0); // eliminamos los segundos
            now.setMinutes(now.getMinutes() + 1); // la agregamos 1 min
            user.supportTimestamp = now.getTime()

        }else if(countFirstQueue *120 > countSecondQueue *180){
            const lastCustomer = await CustomerSupportSchema.findOne({},{},{ sort: { 'userId' : "desc" }})
            user.supportTimestamp = lastCustomer.supportTimestamp + (1000*60*3)
            user.queueNumber = 2

        }else{
            const lastCustomer = await CustomerSupportSchema.findOne({},{},{sort: { 'userId' : "desc" }})
            user.supportTimestamp = lastCustomer.supportTimestamp + (1000*60*2)
            user.queueNumber = 1
        } 

       let saveUser = await user.save();
       res.send({user: saveUser})
        const testDate = new Date(1627020180000)
        // const testDate1 = new Date(1627019880000)
        console.log(testDate);
        //  console.log(testDate1);
    } catch (error) {

        res.status(500).send(error);
       
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
    getCustomers
  };