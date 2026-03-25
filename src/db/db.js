import mongoose from 'mongoose';
import dns from 'dns';

// Lo dejo asi porque a veces me daba problemas de resolucion al conectar.
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB conectado en ${connection.connection.host}`);
    } catch (error) {
        // Si no conecta la BD, prefiero parar la aplicacion.
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}
