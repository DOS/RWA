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
import "@erc3643/factory/TREXFactory.sol";

/// @title DeployTREX — Deploy T-REX (ERC-3643) infrastructure on DOS Chain
/// @notice One-time deployment of shared infrastructure: ONCHAINID + T-REX implementations + Factory
/// @dev Usage:
///   DEPLOYER_PK=$(cat ~/.avalanche-cli/key/9999.pk) forge script script/DeployTREX.s.sol:DeployTREX \
///     --rpc-url https://test.doschain.com --broadcast -vvv
contract DeployTREX is Script {
    function run() external {
        uint256 deployerPk = vm.envUint("DEPLOYER_PK");
        address deployer = vm.addr(deployerPk);

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
        // These are logic/implementation contracts used behind proxies.
        // They are upgradeable contracts — no constructor args needed.

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
        // Phase 3: T-REX Infrastructure
        // =============================================

        // 3a. Deploy TREXImplementationAuthority (reference = true, trexFactory = 0, iaFactory = 0)
        //     trexFactory and iaFactory are set post-deployment
        TREXImplementationAuthority trexIA = new TREXImplementationAuthority(
            true,           // referenceStatus = true (this is the main/reference IA)
            address(0),     // trexFactory — set after TREXFactory is deployed
            address(0)      // iaFactory — set after IAFactory is deployed
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

        // 3c. Deploy TREXFactory (takes trexIA + idFactory)
        TREXFactory trexFactory = new TREXFactory(address(trexIA), address(idFactory));
        console.log("TREXFactory:", address(trexFactory));

        // 3d. Deploy IAFactory (takes trexFactory)
        IAFactory iaFactory = new IAFactory(address(trexFactory));
        console.log("IAFactory:", address(iaFactory));

        // =============================================
        // Phase 4: Wire Permissions
        // =============================================

        // 4a. Set TREXFactory on the ImplementationAuthority
        trexIA.setTREXFactory(address(trexFactory));
        console.log("TREXFactory set on TREXImplementationAuthority");

        // 4b. Set IAFactory on the ImplementationAuthority
        trexIA.setIAFactory(address(iaFactory));
        console.log("IAFactory set on TREXImplementationAuthority");

        // 4c. Grant TREXFactory permission to use IdFactory for token identity creation
        idFactory.addTokenFactory(address(trexFactory));
        console.log("TREXFactory added as token factory on IdFactory");

        vm.stopBroadcast();

        // =============================================
        // Summary
        // =============================================
        console.log("\n========== T-REX Infrastructure Deployed ==========");
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
        console.log("  TREXFactory:                    ", address(trexFactory));
        console.log("  IAFactory:                      ", address(iaFactory));
        console.log("====================================================");
    }
}
