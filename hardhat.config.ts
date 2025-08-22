import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"; // Asegúrate de que dotenv esté importado

// Lee las variables de entorno
const FUJI_RPC_URL = process.env.FUJI_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.20", // O la versión que estés usando
  networks: {
    // Aquí definimos la red 'fuji'
    fuji: {
      url: FUJI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 43113,
    },
  },
};

export default config;