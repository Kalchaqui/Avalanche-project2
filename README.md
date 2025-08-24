<img width="825" height="811" alt="image" src="https://github.com/user-attachments/assets/09dba68b-5937-4c42-af7d-c006822a19dd" />

# SaluData - Interoperable Digital Health Record MVP

## 🎯 General Objective

This project aims to build a Minimum Viable Product (MVP) of an interoperable digital health record on the **Avalanche** network. The goal is to empower patients by giving them full control over their medical data through a health wallet, smart contracts for permission management, and the integration of an **eERC-20 (EncryptedERC)** token to ensure secure information processing.

## 🗺️ Video Demo

https://www.youtube.com/watch?v=F0k-zdCk0hI

---

## 🛠️ Deploy Contrat 

https://testnet.snowtrace.io/address/0x953bE4C9AA04052a97dD039eFA6E45D23Cd30b63

---

## 🛠️ Key Technologies

- **Blockchain:** Avalanche (Fuji Testnet, Higia L1)
- **Smart Contracts:** Solidity
- **Tokens:** ERC-20 (`HealthToken - HLT`), eERC-20 (`EncryptedERC`)
- **Development:** Remix / Hardhat / Foundry
- **Wallets:** Core | Metamask
- **Decentralized Storage:** IPFS
- **Frontend:** Node.js, Web3.js / Ethers.js, Privy

---

## 🗺️ Growth Roadmap – 2 Weeks

### 🗓️ Week 1 – Fundamentals and Technical Foundation

#### **Milestone 1: Technical Setup (Day 1-2)**

* **Environment Configuration:**
    * Set up Remix / Hardhat / Foundry.
    * Connect Core | Metamask wallets to the Avalanche Fuji Testnet.
* **Creation of the eERC-20 `HealthToken (HLT)`:**
    * Fixed initial supply for the demo.
    * The token will be used to "pay for" and record data access.
* **Architecture Design:**
    * **Patient:** Owner of the medical record (identified by their public key).
    * **Medical Record:** A JSON file stored on IPFS, linked from the smart contract.
    * **Institutions:** Registered addresses in the contract (labs, clinics).
    * **Higia:** L1 configuration for the private solution development.

#### **Milestone 2: Digital Medical Record (Day 3-4)**

* **Smart Contract Development (Solidity):**
    * Function for patient registration.
    * Function for assigning medical records (storing the IPFS hash).
    * Logic for medical data encryption.
* **Minimal Interface (Backend/Frontend):**
    * Develop a basic DApp with `Node.js` and `Web3.js/Ethers.js` or `Privy`.
    * Implement wallet connection with Core | Metamask.
    * Create a flow to upload a medical exam: the file is uploaded to IPFS, and the hash is registered on the blockchain.
    * Panel for visualizing the record history.

---

### 🗓️ Week 2 – Permissions, Token, and Demo

#### **Milestone 3: Permissions and Access (Day 5-7)**

* **Smart Contract for Permissions:**
    * `requestAccess(entity, patientID)`: Function for an institution to request access.
    * `grantAccess(entity, recordID)`: Function for the patient to approve a request.
    * `revokeAccess(entity, recordID)`: Function for the patient to revoke access.
* **MVP Flow:**
    * A laboratory uploads an exam (registers on IPFS and the contract).
    * A clinic requests access to the exam.
    * The patient receives a notification in the DApp and can approve or reject the request.
* **eERC-20 Token Integration:**
    * Use the token for patient data encryption and security.

#### **Milestone 4: Interoperability and Final Demo (Day 8-10)**

* **Simulated APIs:**
    * **Laboratory:** A `POST` endpoint to simulate uploading an exam to IPFS and the contract.
    * **Clinic:** A `GET` endpoint to validate access through the permissions contract.
* **Unified Web Interface:**
    * **Patient Panel:** To approve access and view their history.
    * **Institution Panel:** To request access and read data once approved.

---

## ✅ Final Deliverables (Day 11-14)

1.  **eERC-20 Contract** deployed on the Avalanche Higia L1 Testnet for SaluData.
2.  **Medical Record and Permissions Contract** in Solidity, functional and deployed.
3.  **Web DApp (Proof of Concept):**
    * Core | Metamask connection.
    * Record management (upload).
    * Access management (approval/revocation).
4.  **End-to-End Functional Demo:**
    * Complete flow: Patient registers → Lab uploads exam → Clinic requests access → Patient approves.
5.  **Pitch Deck and Technical Report:**
    * A document detailing the architecture, the functional demo, and the next steps for the project.

---

## ✅ Dapp images

<img width="1280" height="587" alt="image" src="https://github.com/user-attachments/assets/5d325c98-fa38-41e0-8405-9cefa4f8486b" />
<img width="1280" height="552" alt="image" src="https://github.com/user-attachments/assets/ea466733-500b-4c0c-9d8e-81a8a1cb234e" />
<img width="1280" height="578" alt="image" src="https://github.com/user-attachments/assets/9ab19571-ea5d-46fa-b99f-72f716b58892" />
<img width="1280" height="564" alt="image" src="https://github.com/user-attachments/assets/5b9aec33-4f9e-4430-a092-75df67dcdfd9" />
<img width="1280" height="550" alt="image" src="https://github.com/user-attachments/assets/d7e06d36-4c11-47ff-abc5-356f63f8c358" />


