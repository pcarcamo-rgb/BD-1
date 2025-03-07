import mongoose from "mongoose";

class MongoConnection {
  private static instance: MongoConnection;

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(): Promise<void> {
    // Obtén la URL de la base de datos desde una variable de entorno
    const dbUri = process.env.MONGO_URI;

    if (!dbUri) {
      console.error("La variable de entorno MONGO_URI no está definida");
      process.exit(1);
    }

    try {
      await mongoose.connect(dbUri);
      console.log("Conexión exitosa a la base de datos MongoDB");
    } catch (error) {
      console.error("Error al conectar a la base de datos MongoDB:", error);
      process.exit(1);
    }
  }
}

export default MongoConnection;
