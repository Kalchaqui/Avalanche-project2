// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importamos las librerías de OpenZeppelin que necesitamos.
// Asegúrate de tener @openzeppelin/contracts instalado en tu proyecto.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// El contrato ahora hereda de ERC721. Cada token que se cree será un "Recibo de Consentimiento".
contract SaluData is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Un contador para generar IDs de token únicos y secuenciales.

    // --- ESTRUCTURAS Y ESTADOS ---

    // Define los posibles estados de un permiso de acceso.
    enum AccessStatus { Inactive, Active, Revoked }

    // Estructura para almacenar la información de un estudio médico.
    struct MedicalRecord {
        bytes32 recordId;
        address owner;
        string cid;      // El CID (identificador único) del archivo cifrado en IPFS.
        string metaHash;  // Un hash de los metadatos (ej. nombre del archivo, tipo, etc.).
    }

    // Estructura para almacenar la información de un permiso de acceso (consentimiento).
    // Ahora está directamente vinculada a un tokenId.
    struct AccessGrant {
        bytes32 recordId;
        address patient;
        address doctor;
        AccessStatus status;
        string encryptedDEKForDoctor; // La clave de encriptación del archivo, cifrada para el médico.
        uint256 expiresAt;            // Marca de tiempo de cuándo expira el permiso.
    }

    // --- MAPPINGS ---

    // Mapeo desde un ID de estudio a su información.
    mapping(bytes32 => MedicalRecord) public records;
    // Mapeo desde el ID del token de consentimiento hacia el permiso detallado que representa.
    mapping(uint256 => AccessGrant) public consentGrants;
    // Mapeo para que cada usuario pueda registrar su clave pública de cifrado.
    mapping(address => string) public publicEncryptionKeys;

    // --- EVENTOS ---

    event RecordRegistered(bytes32 indexed recordId, address indexed owner);
    event ConsentGranted(bytes32 indexed recordId, address indexed doctor, uint256 indexed consentTokenId);
    event AccessRevoked(uint256 indexed consentTokenId);
    event PublicKeyRegistered(address indexed user, string publicKey);

    // El constructor inicializa el token ERC721 con su nombre y símbolo.
    constructor() ERC721("SaluData Consent Receipt", "SDCR") {}

    // --- FUNCIONES PRINCIPALES ---

    /**
     * @notice Permite a cualquier usuario registrar su clave pública de cifrado.
     * @param publicKey La clave pública del usuario en formato string.
     */
    function registerPublicKey(string calldata publicKey) public {
        publicEncryptionKeys[msg.sender] = publicKey;
        emit PublicKeyRegistered(msg.sender, publicKey);
    }

    /**
     * @notice Permite a un paciente registrar un nuevo estudio médico.
     * @param recordId Un ID único para el estudio.
     * @param cid El CID del archivo cifrado en IPFS.
     * @param metaHash Un hash de los metadatos.
     */
    function registerRecord(bytes32 recordId, string calldata cid, string calldata metaHash) public {
        require(records[recordId].owner == address(0), "Record ID already exists");
        records[recordId] = MedicalRecord(recordId, msg.sender, cid, metaHash);
        emit RecordRegistered(recordId, msg.sender);
    }
    
    /**
     * @notice El paciente concede consentimiento, lo que crea un token/recibo para el médico.
     * @param recordId El ID del estudio al que se da acceso.
     * @param doctor La dirección del médico que recibirá el acceso.
     * @param encryptedDEKForDoctor La clave del archivo, ya cifrada con la clave pública del médico.
     * @param durationSeconds Por cuántos segundos será válido el permiso.
     */
    function grantConsent(bytes32 recordId, address doctor, string calldata encryptedDEKForDoctor, uint256 durationSeconds) public {
        require(records[recordId].owner == msg.sender, "Only owner can grant consent");
        require(bytes(publicEncryptionKeys[doctor]).length > 0, "Doctor has no public key registered");
        
        _tokenIds.increment();
        uint256 newConsentTokenId = _tokenIds.current();

        // Se crea (mintea) el token de consentimiento y se asigna al médico.
        _safeMint(doctor, newConsentTokenId);
        
        // Se guarda la información del permiso, vinculada al ID del token recién creado.
        consentGrants[newConsentTokenId] = AccessGrant({
            recordId: recordId,
            patient: msg.sender,
            doctor: doctor,
            status: AccessStatus.Active,
            encryptedDEKForDoctor: encryptedDEKForDoctor,
            expiresAt: block.timestamp + durationSeconds
        });

        emit ConsentGranted(recordId, doctor, newConsentTokenId);
    }

    /**
     * @notice El médico usa su token de consentimiento para obtener la clave de descifrado.
     * @param consentTokenId El ID del token que recibió como prueba de consentimiento.
     * @return La clave de encriptación del archivo, cifrada para el médico.
     */
    function getAccessKey(uint256 consentTokenId) public view returns (string memory) {
        // Verifica que quien llama a la función es el dueño del token.
        require(_ownerOf(consentTokenId) == msg.sender, "Caller does not own this consent token");
        
        AccessGrant memory grant = consentGrants[consentTokenId];
        
        require(grant.doctor == msg.sender, "Not authorized");
        require(grant.status == AccessStatus.Active, "Consent is not active");
        require(block.timestamp < grant.expiresAt, "Consent has expired");

        return grant.encryptedDEKForDoctor;
    }

    /**
     * @notice El paciente revoca el consentimiento invalidando el permiso asociado al token.
     * @param consentTokenId El ID del token de consentimiento a revocar.
     */
    function revokeConsent(uint256 consentTokenId) public {
        AccessGrant storage grant = consentGrants[consentTokenId];
        require(grant.patient == msg.sender, "Only the patient can revoke consent");
        
        grant.status = AccessStatus.Revoked;
        emit AccessRevoked(consentTokenId);
    }
}
