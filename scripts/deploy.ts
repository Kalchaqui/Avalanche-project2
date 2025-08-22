import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Desplegando contrato con la cuenta:", deployer.address);

  // Desplegar el contrato único SaluData.
  // Como el constructor no tiene argumentos, no necesitamos pasarle nada.
  const saluData = await ethers.deployContract("SaluData");

  await saluData.waitForDeployment();

  const saluDataAddress = await saluData.getAddress();
  
  console.log("\n--- ¡Despliegue Completo! ---");
  console.log("Copia esta dirección en tu archivo .env.local del frontend:\n");
  console.log(`NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS="${saluDataAddress}"`);
  console.log("\n---------------------------------");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
