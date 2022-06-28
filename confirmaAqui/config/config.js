const env = process.env.NODE_ENV || 'mongo';

const config = () =>{
    switch(env){

        case 'mongo':
            return{
                db_string:'mongodb://localhost:27017',
                db_name: 'confirma',
                jwt_senha:'#ma00',
                jwt_expires_in:'7d'
            }

             case 'hml':
                  return{
                    bd_string:'mongodb+srv://usuario_admin:billjunior75@cluster0-wefug.mongodb.net/test?retryWrites=true&w=majority',
                    jwt_senha:'#ma0000',
                    jwt_expires_in:'10d'
            }

              case 'prod':
                     return{
                        bd_string:'mongodb+srv://usuario_admin:billjunior75@cluster0-wefug.mongodb.net/test?retryWrites=true&w=majority',
                        jwt_senha:'#ma0011',
                        jwt_expires_in:'8d'
                }
    }
}

console.log(`iniciando API em ambiente ${env.toUpperCase()}`);

module.exports = config();