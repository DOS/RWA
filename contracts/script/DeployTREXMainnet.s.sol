// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "forge-std/Script.sol";

// ONCHAINID
import "@onchain-id/solidity/contracts/Identity.sol";
import "@onchain-id/solidity/contracts/proxy/ImplementationAuthority.sol";
import "@onchain-id/solidity/contracts/factory/IdFactory.sol";

// T-REX implementations
import "@erc3643/token/Token.sol";
import "@erc3643/registry/implementation/ClaimTopicsRegistry.sol";
import "@erc3643/registry/implementation/TrustedIssuersRegistry.sol";
import "@erc3643/registry/implementation/IdentityRegistryStorage.sol";
import "@erc3643/registry/implementation/IdentityRegistry.sol";
import "@erc3643/compliance/modular/ModularCompliance.sol";

// T-REX infrastructure
import "@erc3643/proxy/authority/TREXImplementationAuthority.sol";
import "@erc3643/proxy/authority/ITREXImplementationAuthority.sol";
import "@erc3643/proxy/authority/IAFactory.sol";

/// @title DeployTREXMainnet — Deploy T-REX (ERC-3643) infrastructure on DOS Chain Mainnet
/// @notice Deploys everything EXCEPT TREXFactory (will be deployed later with vanity address via CREATE2)
/// @dev Usage:
///   DEPLOYER_PK=$(cat ~/.avalanche-cli/key/9999.pk) forge script script/DeployTREXMainnet.s.sol:DeployTREXMainnet \
///     --rpc-url https://main.doschain.com --broadcast -vvv
contract DeployTREXMainnet is Script {
    function run() external {
        uint256 deployerPk = vm.envUint("DEPLOYER_PK");
        address deployer = vm.addr(deployerPk);

        console.log("=== DOS Chain Mainnet T-REX Deployment ===");
        console.log("Chain ID: 7979");
        console.log("Deployer:", deployer);
        console.log("Balance:", deployer.balance);

        vm.startBroadcast(deployerPk);

        // =============================================
        // Phase 1: ONCHAINID Infrastructure
        // =============================================

        // 1a. Deploy Identity implementation (as library — isLibrary = true)
        Identity identityImpl = new Identity(deployer, true);
        console.log("Identity Implementation:", address(identityImpl));

        // 1b. Deploy ONCHAINID ImplementationAuthority (points to Identity impl)
        ImplementationAuthority idImplAuthority = new ImplementationAuthority(address(identityImpl));
        console.log("ONCHAINID ImplementationAuthority:", address(idImplAuthority));

        // 1c. Deploy IdFactory (uses ONCHAINID ImplementationAuthority)
        IdFactory idFactory = new IdFactory(address(idImplAuthority));
        console.log("IdFactory:", address(idFactory));

        // =============================================
        // Phase 2: T-REX Implementation Contracts
        // =============================================

        // 2a. Token implementation
        Token tokenImpl = new Token();
        console.log("Token Implementation:", address(tokenImpl));

        // 2b. ClaimTopicsRegistry implementation
        ClaimTopicsRegistry ctrImpl = new ClaimTopicsRegistry();
        console.log("CTR Implementation:", address(ctrImpl));

        // 2c. TrustedIssuersRegistry implementation
        TrustedIssuersRegistry tirImpl = new TrustedIssuersRegistry();
        console.log("TIR Implementation:", address(tirImpl));

        // 2d. IdentityRegistryStorage implementation
        IdentityRegistryStorage irsImpl = new IdentityRegistryStorage();
        console.log("IRS Implementation:", address(irsImpl));

        // 2e. IdentityRegistry implementation
        IdentityRegistry irImpl = new IdentityRegistry();
        console.log("IR Implementation:", address(irImpl));

        // 2f. ModularCompliance implementation
        ModularCompliance mcImpl = new ModularCompliance();
        console.log("MC Implementation:", address(mcImpl));

        // =============================================
        // Phase 3: T-REX Infrastructure (without TREXFactory)
        // =============================================

        // 3a. Deploy TREXImplementationAuthority
        //     trexFactory and iaFactory are address(0) — will be set after vanity TREXFactory deploy
        TREXImplementationAuthority trexIA = new TREXImplementationAuthority(
            true,           // referenceStatus = true (this is the main/reference IA)
            address(0),     // trexFactory — set after vanity TREXFactory deploy
            address(0)      // iaFactory — set after IAFactory deploy
        );
        console.log("TREXImplementationAuthority:", address(trexIA));

        // 3b. Register T-REX version 4.0.0 and set as current
        ITREXImplementationAuthority.Version memory version = ITREXImplementationAuthority.Version({
            major: 4,
            minor: 0,
            patch: 0
        });

        ITREXImplementationAuthority.TREXContracts memory trexContracts = ITREXImplementationAuthority.TREXContracts({
            tokenImplementation: address(tokenImpl),
            ctrImplementation: address(ctrImpl),
            irImplementation: address(irImpl),
            irsImplementation: address(irsImpl),
            tirImplementation: address(tirImpl),
            mcImplementation: address(mcImpl)
        });

        trexIA.addAndUseTREXVersion(version, trexContracts);
        console.log("T-REX version 4.0.0 registered and activated");

        // 3c. Deploy IAFactory with address(0) for trexFactory — will be updated later
        IAFactory iaFactory = new IAFactory(address(0));
        console.log("IAFactory:", address(iaFactory));

        // NOTE: TREXFactory NOT deployed here — will be deployed with vanity address via CREATE2
        // setIAFactory requires TREXFactory to be set first (it checks _trexFactory.getImplementationAuthority())
        // After vanity TREXFactory deployment, run these in order:
        //   1. trexIA.setTREXFactory(trexFactoryAddress)
        //   2. trexIA.setIAFactory(iaFactoryAddress)
        //   3. idFactory.addTokenFactory(trexFactoryAddress)

        vm.stopBroadcast();

        // =============================================
        // Summary
        // =============================================
        console.log("\n========== T-REX Mainnet Infrastructure Deployed ==========");
        console.log("NOTE: TREXFactory NOT deployed - will use vanity CREATE2");
        console.log("");
        console.log("--- ONCHAINID ---");
        console.log("  Identity Implementation:        ", address(identityImpl));
        console.log("  ONCHAINID ImplAuthority:        ", address(idImplAuthority));
        console.log("  IdFactory:                      ", address(idFactory));
        console.log("--- T-REX Implementations ---");
        console.log("  Token:                          ", address(tokenImpl));
        console.log("  ClaimTopicsRegistry:            ", address(ctrImpl));
        console.log("  TrustedIssuersRegistry:         ", address(tirImpl));
        console.log("  IdentityRegistryStorage:        ", address(irsImpl));
        console.log("  IdentityRegistry:               ", address(irImpl));
        console.log("  ModularCompliance:              ", address(mcImpl));
        console.log("--- T-REX Infrastructure ---");
        console.log("  TREXImplementationAuthority:    ", address(trexIA));
        console.log("  IAFactory:                      ", address(iaFactory));
        console.log("");
        console.log("--- Needed for vanity TREXFactory deploy ---");
        console.log("  IdFactory:                      ", address(idFactory));
        console.log("  TREXImplementationAuthority:    ", address(trexIA));
        console.log("============================================================");
    }
}
