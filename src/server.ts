 import app from "./app.js";
import { prisma } from "./lib/prisma.js";




 const PORT = process.env.PORT || 5000;
//const PORT = config.port;
//const PORT = 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log("Connect to the database successfully.");
        app.listen(PORT, ()=>{
            console.log(`Server is running on the port ${PORT}`);
        })
    } catch (error) {
        console.log("Error starting the server", error);
        await prisma.$disconnect();
        process.exit(1);
        
    }
    
}

// async function main() {
//     try {       
//         app.listen(PORT, ()=>{
//             console.log(`Server is running on the port ${PORT}`);
//         })
//     } catch (error) {
//         console.log("Error starting the server", error);  
//         process.exit(1);              
//     }    
// }

main();