<img width="825" height="811" alt="image" src="https://github.com/user-attachments/assets/09dba68b-5937-4c42-af7d-c006822a19dd" />

# SaluData - MVP de Historia Clínica Digital Interoperable

## 🎯 Objetivo General

Este proyecto busca construir un MVP (Producto Mínimo Viable) de una historia clínica digital interoperable sobre la red **Avalanche**. El objetivo es empoderar a los pacientes dándoles control total sobre sus datos médicos a través de una billetera de salud, contratos inteligentes para la gestión de permisos, y la integración de un token **eERC-20 (EncryptedERC)** para garantizar el procesamiento seguro de la información.

---

## 🛠️ Contrato desplegado

https://testnet.snowtrace.io/address/0x953bE4C9AA04052a97dD039eFA6E45D23Cd30b63

---

## 🛠️ Tecnologías

- **Blockchain:** Avalanche (Fuji Testnet, Higia L1)
- **Contratos Inteligentes:** Solidity
- **Tokens:** ERC-20 (`HealthToken - HLT`), eERC-20 (`EncryptedERC`)
- **Desarrollo:** Remix / Hardhat / Foundry
- **Billeteras:** Core | Metamask
- **Almacenamiento Descentralizado:** IPFS
- **Frontend:** Node.js, Web3.js / Ethers.js, Privy

---

## 🗺️ Roadmap de Crecimiento – 2 Semanas

### 🗓️ Semana 1 – Fundamentos y Base Técnica

#### **Milestone 1: Configuración Técnica (Día 1-2)**

* **Configuración del Entorno:**
    * Preparar Remix / Hardhat / Foundry.
    * Conectar billeteras Core | Metamask a la red de pruebas Avalanche Fuji.
* **Creación del Token eERC-20 `HealthToken (HLT)`:**
    * Suministro inicial fijo para la demostración.
    * El token se usará para "pagar" y registrar el acceso a los datos.
* **Diseño de la Arquitectura:**
    * **Paciente:** Propietario del registro médico (identificado por su clave pública).
    * **Registro Médico:** Un archivo JSON almacenado en IPFS, vinculado desde el contrato inteligente.
    * **Instituciones:** Direcciones registradas en el contrato (laboratorios, clínicas).
    * **Higia:** Configuración de la L1 para el desarrollo de la solución privada.

#### **Milestone 2: Historia Clínica Digital (Día 3-4)**

* **Desarrollo del Contrato en Solidity:**
    * Función para el registro de pacientes.
    * Función para la asignación de registros médicos (almacenando el hash de IPFS).
    * Lógica para la encriptación de los datos médicos.
* **Interfaz Mínima (Backend/Frontend):**
    * Desarrollar una DApp básica con `Node.js` y `Web3.js/Ethers.js` o `Privy`.
    * Implementar la conexión con billeteras Core | Metamask.
    * Crear flujo para subir un examen médico: el archivo se sube a IPFS y el hash se registra en la blockchain.
    * Panel para la visualización del historial de registros.

---

### 🗓️ Semana 2 – Permisos, Token y Demostración

#### **Milestone 3: Permisos y Acceso (Día 5-7)**

* **Contrato Inteligente para Permisos:**
    * `requestAccess(entity, patientID)`: Función para que una institución solicite acceso.
    * `grantAccess(entity, recordID)`: Función para que el paciente apruebe una solicitud.
    * `revokeAccess(entity, recordID)`: Función para que el paciente revoque un acceso.
* **Flujo del MVP:**
    * Un laboratorio sube un examen (registra en IPFS y en el contrato).
    * Una clínica solicita acceso al examen.
    * El paciente recibe una notificación en la DApp y puede aprobar o rechazar la solicitud.
* **Integración del Token eERC-20:**
    * Utilizar el token para la encriptación y seguridad de los datos del paciente.

#### **Milestone 4: Interoperabilidad y Demo Final (Día 8-10)**

* **APIs Simuladas:**
    * **Laboratorio:** Endpoint `POST` que simula la subida de un examen a IPFS y al contrato.
    * **Clínica:** Endpoint `GET` que valida el acceso a través del contrato de permisos.
* **Interfaz Web Unificada:**
    * **Panel del Paciente:** Para aprobar accesos y visualizar su historial.
    * **Panel de la Institución:** Para solicitar acceso y leer los datos una vez aprobado.

---

## ✅ Entregables Finales (Día 11-14)

1.  **Contrato eERC-20** desplegado en la Testnet L1 de Avalanche (Higia) para SaluData.
2.  **Contrato de Registros Médicos y Permisos** en Solidity, funcional y desplegado.
3.  **Web DApp (Prueba de Concepto):**
    * Conexión con Core | Metamask.
    * Gestión de registros (subida).
    * Gestión de accesos (aprobación/revocación).
4.  **Demostración Funcional de Extremo a Extremo (End-to-End):**
    * Flujo completo: Paciente se registra → Laboratorio sube examen → Clínica solicita acceso → Paciente aprueba.
5.  **Pitch Deck y Reporte Técnico:**
    * Documento que detalla la arquitectura, la demo funcional y los próximos pasos del proyecto.

      
<img width="1280" height="587" alt="image" src="https://github.com/user-attachments/assets/5d325c98-fa38-41e0-8405-9cefa4f8486b" />
<img width="1280" height="552" alt="image" src="https://github.com/user-attachments/assets/ea466733-500b-4c0c-9d8e-81a8a1cb234e" />
<img width="1280" height="578" alt="image" src="https://github.com/user-attachments/assets/9ab19571-ea5d-46fa-b99f-72f716b58892" />
<img width="1280" height="564" alt="image" src="https://github.com/user-attachments/assets/5b9aec33-4f9e-4430-a092-75df67dcdfd9" />
<img width="1280" height="550" alt="image" src="https://github.com/user-attachments/assets/d7e06d36-4c11-47ff-abc5-356f63f8c358" />


