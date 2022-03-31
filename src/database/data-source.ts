import { DataSource } from "typeorm";
import config from "../configs/config";
import { User } from "./entity/User";

const myDataSource = new DataSource({
    type:"mysql",
    host: config.host,
    port:3306,
    username:'root',
    password:config.password,
    database:config.database,
    entities:[User],
    synchronize:true
});

myDataSource.initialize().then(()=>console.log('Conectado'))

export default myDataSource;