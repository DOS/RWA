// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "forge-std/Script.sol";
import "@onchain-id/solidity/contracts/ClaimIssuer.sol";
import "@onchain-id/solidity/contracts/interface/IIdentity.sol";
import "@onchain-id/solidity/contracts/interface/IClaimIssuer.sol";
import "@onchain-id/solidity/contracts/factory/IdFactory.sol";
import "@erc3643/registry/interface/IIdentityRegistry.sol";
import "@erc3643/registry/interface/ITrustedIssuersRegistry.sol";

/// @title SetupInvestor — Deploy ClaimIssuer, create investor ONCHAINID, register & add KYC claim
/// @notice Sets up a test investor on DOS Chain testnet with full T-REX compliance
/// @dev Usage:
///   DEPLOYER_PK=0x$(cat ~/.avalanche-cli/key/9999.pk) \
///   forge script script/SetupInvestor.s.sol:SetupInvestor \
///     --rpc-url https://test.doschain.com --broadcast -vvv
contract SetupInvestor is Script {
    // KYC claim topic (same as in DeploySecurityToken)
    uint256 constant CLAIM_TOPIC_KYC = 1;

    // Test investor address (derived deterministically)
    address constant INVESTOR = 0x1234567890AbcdEF1234567890aBcdef12345678;

    function run() external {
        uint256 deployerPk = vm.envUint("DEPLOYER_PK");
        address ID_FACTORY = vm.envAddress("ID_FACTORY");
        address IDENTITY_REGISTRY = vm.envAddress("IDENTITY_REGISTRY");
        address TRUSTED_ISSUERS_REGISTRY = vm.envAddress("TRUSTED_ISSUERS_REGISTRY");
        address deployer = vm.addr(deployerPk);

        console.log("=== SetupInvestor ===");
        console.log("Deployer:", deployer);
        console.log("Investor wallet:", INVESTOR);

        vm.startBroadcast(deployerPk);

        // ================================================================
        // Step 1: Deploy ClaimIssuer (Shinhan as KYC provider)
        // ================================================================
        // ClaimIssuer constructor: Identity(initialManagementKey, false)
        // The deployer address becomes the management key
        ClaimIssuer claimIssuer = new ClaimIssuer(deployer);
        console.log("\n[1] ClaimIssuer deployed:", address(claimIssuer));

        // Add deployer as CLAIM signer key (purpose 3) on the ClaimIssuer
        // so it can sign claims that validate via isClaimValid
        bytes32 deployerKeyHash = keccak256(abi.encode(deployer));
        claimIssuer.addKey(deployerKeyHash, 3, 1); // purpose=3 (CLAIM), type=1 (ECDSA)
        console.log("  Deployer added as CLAIM key on ClaimIssuer");

        // ================================================================
        // Step 2: Create investor ONCHAINID via IdFactory
        // ================================================================
        bytes32[] memory managementKeys = new bytes32[](1);
        managementKeys[0] = keccak256(abi.encode(deployer));

        address investorIdentity = IdFactory(ID_FACTORY).createIdentityWithManagementKeys(
            INVESTOR,
            "investor-test-001",
            managementKeys
        );
        console.log("\n[2] Investor ONCHAINID created:", investorIdentity);

        // ================================================================
        // Step 3: Add ClaimIssuer as trusted issuer in TrustedIssuersRegistry
        // ================================================================
        uint256[] memory claimTopics = new uint256[](1);
        claimTopics[0] = CLAIM_TOPIC_KYC;

        ITrustedIssuersRegistry(TRUSTED_ISSUERS_REGISTRY).addTrustedIssuer(
            IClaimIssuer(address(claimIssuer)),
            claimTopics
        );
        console.log("\n[3] ClaimIssuer added as trusted issuer for KYC topic");

        // ================================================================
        // Step 4: Add KYC claim to investor's ONCHAINID
        // ================================================================
        // The claim data — in production this would be actual KYC attestation data
        bytes memory claimData = abi.encode(INVESTOR, "KYC_VERIFIED", block.timestamp);

        // Sign the claim: keccak256(abi.encode(identity, topic, data))
        // Then prefix with "\x19Ethereum Signed Message:\n32"
        bytes32 dataHash = keccak256(abi.encode(investorIdentity, CLAIM_TOPIC_KYC, claimData));
        bytes32 prefixedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", dataHash)
        );

        // We need to stop broadcast to use vm.sign, then restart
        vm.stopBroadcast();
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(deployerPk, prefixedHash);
        bytes memory signature = abi.encodePacked(r, s, v);
        vm.startBroadcast(deployerPk);

        // Add CLAIM key (purpose 3) for deployer on the investor identity
        // so deployer can call addClaim on the identity
        IIdentity(investorIdentity).addKey(deployerKeyHash, 3, 1);
        console.log("  Deployer added as CLAIM key on investor identity");

        // Add the claim to the investor's identity
        IIdentity(investorIdentity).addClaim(
            CLAIM_TOPIC_KYC,    // topic
            1,                  // scheme (ECDSA)
            address(claimIssuer), // issuer
            signature,          // signature
            claimData,          // data
            ""                  // uri
        );
        console.log("\n[4] KYC claim added to investor identity");

        // ================================================================
        // Step 5: Register investor in IdentityRegistry
        // ================================================================
        IIdentityRegistry(IDENTITY_REGISTRY).registerIdentity(
            INVESTOR,
            IIdentity(investorIdentity),
            410 // country code: South Korea (ISO 3166-1 numeric)
        );
        console.log("\n[5] Investor registered in IdentityRegistry");

        // ================================================================
        // Verify
        // ================================================================
        bool isVerified = IIdentityRegistry(IDENTITY_REGISTRY).isVerified(INVESTOR);
        console.log("\n=== Verification ===");
        console.log("  Investor isVerified:", isVerified);

        vm.stopBroadcast();

        console.log("\n========== SetupInvestor Complete ==========");
        console.log("  ClaimIssuer (Shinhan KYC):", address(claimIssuer));
        console.log("  Investor ONCHAINID:", investorIdentity);
        console.log("  Investor wallet:", INVESTOR);
        console.log("  IdentityRegistry:", IDENTITY_REGISTRY);
        console.log("============================================");
    }
}
