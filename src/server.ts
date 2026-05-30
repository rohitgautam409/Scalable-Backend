import app from './app.js';
import {env} from './config/env.js'


app.listen(env.PORT, ()=>{
    console.log(`Auth service is running on port ${env.PORT}`);
})